/* tslint:disable */

module.exports = function(api) {
  api.cache(false);
  return {
    presets: ['next/babel'],
    plugins: [['styled-components', { ssr: true }]],
  };
};
