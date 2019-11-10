import React from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import { API_URI, WS_URI } from './constants';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { concat, split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';
import cookie from 'js-cookie';

let apolloClient = null;

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */

export function withApollo(PageComponent: any, { ssr = true }: { ssr?: boolean } = {}) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const headers = buildHeaders();
    const client = apolloClient || initApolloClient(apolloState, headers);
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName = PageComponent.displayName || PageComponent.name || 'Component';

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.');
    }

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async ctx => {
      const { AppTree, req } = ctx;

      const builtHeaders = buildHeaders(req ? req.headers : null);
      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProps`.

      const apolloClient = (ctx.apolloClient = initApolloClient({}, builtHeaders));

      if (typeof builtHeaders.headers !== 'undefined') {
        // ensures we dont un-necessarily check currentUser
        ctx.isAuthorization = typeof builtHeaders.headers.authorization !== 'undefined';
      } else {
        ctx.isAuthorization = false;
      }

      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      // Only on the server:
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps;
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import('@apollo/react-ssr');
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
              />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error);
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind();
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState,
      };
    };
  }

  return WithApollo;
}

function initApolloClient(initialState?: any, headers?: any): any {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState, headers);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    // @ts-ignore
    apolloClient = createApolloClient(initialState, headers);
  }

  return apolloClient;
}

function createApolloClient(initialState: any, builtHeaders?: any) {
  const fetchOptions = {};
  // If you are using a https_proxy, add fetchOptions with 'https-proxy-agent' agent instance
  // 'https-proxy-agent' is required here because it's a sever-side only module
  if (typeof window === 'undefined') {
    if (process.env.https_proxy) {
      // @ts-ignore
      fetchOptions.agent = new (require('https-proxy-agent'))(process.env.https_proxy);
    }
  }

  const authLink = setContext((request, { headers }) => {
    return {
      ...builtHeaders,
    };
  });

  let wsLink;

  if (typeof window !== 'undefined') {
    // Create a WebSocket link:
    wsLink = new WebSocketLink(
      new SubscriptionClient(WS_URI, {
        reconnect: true,
        timeout: 30000,
        connectionParams: () => {
          return builtHeaders;
        },
        connectionCallback: err => {
          if (err) {
            wsLink.subscriptionClient.close(false, false);
          }
        },
      })
    );
  }

  const httpLink = new HttpLink({
    uri: API_URI, // Server URL (must be absolute)
    credentials: 'same-origin',
    fetch,
    fetchOptions,
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
    link: concat(
      authLink,
      typeof window !== 'undefined'
        ? split(
            // split based on operation type
            ({ query }) => {
              // @ts-ignore
              const { kind, operation } = getMainDefinition(query);
              return kind === 'OperationDefinition' && operation === 'subscription';
            },
            // @ts-ignore
            wsLink,
            httpLink
          )
        : httpLink
    ),
    cache: new InMemoryCache({
      addTypename: true,
    }).restore(initialState),
  });
}

function parseCookies(headers?: any) {
  const list = {};
  if (headers) {
    const rc = headers.cookie;

    // tslint:disable-next-line: no-unused-expression
    rc &&
      rc.split(';').forEach(cookie => {
        const parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
      });
  }

  return list;
}

const buildHeaders = (headers?: any) => {
  const anonHeaders = {
    headers: {
      'x-hasura-default-role': 'anonymous',
      'x-hasura-user-id': '00000000-0000-0000-0000-000000000000',
    },
    ...headers,
  };
  // Client-Side Header Builder
  if (typeof window !== 'undefined') {
    if (typeof document !== 'undefined' && cookie.get('token')) {
      return {
        headers: {
          authorization: `Bearer ${cookie.get('token')}`,
        },
      };
    } else {
      return anonHeaders;
    }
  } else {
    if (headers && typeof headers.cookie !== 'undefined') {
      // Server-Side Header Builder
      const cooked: any = parseCookies(headers);
      return cooked.token
        ? {
            headers: {
              authorization: `Bearer ${cooked.token}`,
            },
          }
        : anonHeaders;
    } else {
      return anonHeaders;
    }
  }
};
