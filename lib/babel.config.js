/* tslint:disable */

module.exports = function(api) {
  api.cache(false);
  return {
    presets: ['next/babel'],
    plugins: ['inline-react-svg', ['styled-components', { ssr: true }]],
  };
};
