require('now-env');
const path = require('path');
const withOffline = require('next-offline');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withTM = require('next-transpile-modules');
const withCustomBabelConfigFile = require('next-plugin-custom-babel-config');
const withCSS = require('@zeit/next-css');
module.exports = withCustomBabelConfigFile(
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
          webpack: (config, { isServer, defaultLoaders }) => {
            if (!isServer) {
              // config.node = {
              //   fs: 'empty',
              //   net: 'empty',
              //   tls: 'empty',
              // };
              // config.externals = config.externals || {};
              // confi.externals['bufferutil'] = 'commonjs bufferutil';
              // confi.externals['utf-8-validate'] = 'commonjs utf-8-validate';
              // config.externals['knex'] = 'commonjs knex';
              // config.resolve.alias['@sentry/node'] = '@sentry/browser';
            }

            return config;
          },
          // service worker
          transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
          generateInDevMode: false,
          workboxOpts: {
            swDest: 'static/service-worker.js',
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
);
