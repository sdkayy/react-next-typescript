import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import AppIcons from '../components/appIcons';
import { IS_PROD } from '../lib/constants';

export default class MyDocument extends Document {
  public static async getInitialProps(ctx: any) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  public loadGoogleAnalytics() {
    return IS_PROD
      ? `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-145834488-1');`
      : ``;
  }

  public render() {
    return (
      <html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="expires" content="10800" />
          <meta name="og:type" content="website" />
          <meta name="og:site_name" content="Boiler" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@Boiler" />
          <meta name="twitter:image:alt" content="Boiler" />
          <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
          {/*
          // @ts-ignore */}
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          {/*
          // @ts-ignore */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Muli:200,300,400,600,700,800,900&display=swap"
            as="fetch"
            crossOrigin="anonymous"
          />
          {AppIcons()}
          {/*
          // @ts-ignore */}
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
