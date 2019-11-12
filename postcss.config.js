const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./pages/**/*.tsx', './components/**/*.tsx'],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
});

module.exports = {
  plugins: [
    require('postcss-easy-import'),
    require('tailwindcss')('./tailwind.config.js'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
    require('cssnano'),
  ],
};
