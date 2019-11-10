import App from 'next/app';
import React from 'react';

// @ts-ignore
class MyApp extends App {
  constructor(props: any) {
    super(props);
  }

  public render() {
    // @ts-ignore
    const { Component, pageProps, router } = this.props;
    // Any providers etc.
    return <Component {...pageProps} router={router} />;
  }
}

export default MyApp;
