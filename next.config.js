require('now-env');
const path = require('path');
const webpack = require('webpack');
const withOffline = require('next-offline');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withTM = require('next-transpile-modules');
const withCustomBabelConfigFile = require('next-plugin-custom-babel-config');
const withCSS = require('@zeit/next-css');
const nextSourceMaps = require('@zeit/next-source-maps')();
const withFonts = require('next-fonts');
const IS_PROD = process.env.NODE_ENV === 'production';

module.exports = nextSourceMaps(
  withCustomBabelConfigFile(
    withFonts(
      withOffline(
        withBundleAnalyzer(
          withCSS(
            withTM({
              analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
              analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
              bundleAnalyzerConfig: {
                server: {
                  analyzerMode: 'static',
                  reportFilename: '../bundles/server.html',
                },
                browser: {
                  analyzerMode: 'static',
                  reportFilename: '../bundles/client.html',
                },
              },
              target: process.env.TEST_DB ? 'server' : 'serverless',
              babelConfigFile: path.resolve('./lib/babel.config.js'),
              env: {
                TEST_DB: process.env.TEST_DB,
                AMPLITUDE_API_KEY: process.env.NODE_ENV === 'production' ? '' : '',
              },
              webpack: (config, { isServer, defaultLoaders, buildId }) => {
                config.plugins.push(
                  new webpack.DefinePlugin({
                    'process.env.SENTRY_RELEASE': JSON.stringify(buildId),
                    'process.env.SENTRY_DSN': JSON.stringify(
                      IS_PROD ? 'sentry prod' : 'sentry dev'
                    ),
                  })
                );

                if (!isServer) {
                  config.resolve.alias['@sentry/node'] = '@sentry/browser';
                }

                return config;
              },
              // service worker
              transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
              // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we
              // turn on the SW in dev mode so that we can actually test it
              generateInDevMode: false,
              workboxOpts: {
                swDest: 'static/service-worker.js',
                maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
                runtimeCaching: [
                  {
                    urlPattern: /^https?.*/,
                    handler: 'NetworkFirst',
                    options: {
                      cacheName: 'https-calls',
                      networkTimeoutSeconds: 15,
                      expiration: {
                        maxEntries: 150,
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
                      },
                      cacheableResponse: {
                        statuses: [0, 200],
                      },
                    },
                  },
                ],
              },
            })
          )
        )
      )
    )
  )
);
