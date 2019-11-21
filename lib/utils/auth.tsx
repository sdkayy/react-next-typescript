import Router from 'next/router';
import { destroyCookie, parseCookies } from 'nookies';
import { Component } from 'react';

const IS_PROD = process.env.NODE_ENV === 'production';

export const logout = (ctx?: any) => {
  destroyCookie(ctx ? ctx : {}, 'token', {
    maxAge: 30 * 24 * 60 * 60,
    domain: IS_PROD ? `hourlylabs.com` : `localhost`,
  });
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('logout', `${Date.now()}`);
  }

  if (ctx.res) {
    ctx.res.writeHead(302, {
      Location: '/login',
    });
    ctx.res.end();
  } else {
    window.location.href = '/login';
  }
};

// Gets the display name of a JSX component for dev tools
const getDisplayName = Component => Component.displayName || Component.name || 'Component';

export const withAuthSync = WrappedComponent =>
  class extends Component {
    public static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;

    public static async getInitialProps(ctx: any) {
      const token = auth(ctx);

      const componentProps =
        WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps, token };
    }

    constructor(props: any) {
      super(props);

      this.syncLogout = this.syncLogout.bind(this);
    }

    public componentDidMount() {
      window.addEventListener('storage', this.syncLogout);
    }

    public componentWillUnmount() {
      window.removeEventListener('storage', this.syncLogout);
      window.localStorage.removeItem('logout');
    }

    public syncLogout(event: any) {
      if (event.key === 'logout') {
        Router.push('/login');
      }
    }

    public render() {
      return <WrappedComponent {...this.props} />;
    }
  };

export const auth = ctx => {
  const { token } = parseCookies(ctx);
  /*
   * This happens on server only, ctx.req is available means it's being
   * rendered on server. If we are on server and token is not available,
   * means user is not logged in.
   */
  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: '/login' });
    ctx.res.end();
    return;
  }

  // We already checked for server. This should only happen on client.
  if (!token) {
    Router.push('/login');
  }

  return token;
};
