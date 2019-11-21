import NextApp from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import React from 'react';
import { AppGlobalStyles } from '../lib/context/AppGlobalStyles';
import { ThemeConsumer, ThemeProvider } from '../lib/context/ThemeContext';
import * as gtag from '../lib/gtag';
import '../styles/tailwind.css';
import '../styles/theme.css';
require('typeface-muli');

// For prod
/*
import * as Sentry from '@sentry/node';
Sentry.init({
  dsn: process.env.SENTRY_DSN,
});
*/
export default class App extends NextApp {
  constructor(props: any) {
    super(props);
    Router.events.on('routeChangeStart', url => {
      NProgress.start();
    });
    Router.events.on('routeChangeComplete', () => NProgress.done());
    Router.events.on('routeChangeComplete', url => gtag.pageview(url));
    Router.events.on('routeChangeError', () => NProgress.done());
  }

  public onLoad() {
    setTimeout(() => {
      window.requestAnimationFrame(() => {
        document.body.className = `${document.body.className} loaded`.trim();
      });
    }, 1000);
  }

  public componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', this.onLoad);
    }
  }

  public componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('load', this.onLoad);
    }
  }

  public render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider>
        <ThemeConsumer>
          {({ theme }) => (
            <div className={theme.isDark ? 'dark-theme' : 'light-theme'}>
              <Component {...pageProps} />
            </div>
          )}
        </ThemeConsumer>
        <AppGlobalStyles />
      </ThemeProvider>
    );
  }
}
