import { mergeObjects } from './helpers';

const themeList: any = {};

themeList.extend = (themename, newsetting) => mergeObjects(themeList[themename], newsetting);

// Breakpoints for the application are
// 768px;
// 1280px;

themeList.main = {
  bg: {
    default: '#FFFFFF',
    reverse: '#000000',
    wash: '#FDFDFF',
    border: '#000000',
    inactive: '#707070',
  },
  brand: {
    default: '#000',
    alt: '#000',
    secondary: '#76F0DE',
    wash: '#FFF',
    border: '#D8D8D8',
    dark: '#393D3F',
  },
  generic: {
    default: '#E6ECF7',
  },
  social: {
    facebook: '#3B5998',
    twitter: '#00ACED',
    google: '#ea4335',
    apple: '#000',
    linkedin: '#0077B5',
  },
  success: {
    default: '#27b041',
    alt: '#81EF00',
    dark: '#3B6D00',
    wash: '#D6FFA4',
    border: '#B3F268',
  },
  warning: {
    default: '#FF543B',
    alt: '#FF004D',
    dark: '#AA0034',
    wash: '#FFCBEB',
    border: '#FFAA9D',
  },
  text: {
    default: '#454F63',
    alt: '#78849E',
    special: '#000',
    reverse: '#FFFFFF',
    placeholder: '#78849E',
    secondary: '#ACACAC',
    accent: '#000',
    heavy: '#646464',
  },
};

themeList.inverted = themeList.extend('main', {
  colors: {
    background: '#000000',
    text: '#ffffff',
  },
});

themeList.eightbit = themeList.extend('inverted', {
  colors: {
    main: '#40337f',
    success: '#1bcb01',
    error: '#722640',
    background: '#000000',
    text: '#ffffff',
  },
  font: {
    family: {
      normal: 'Consolas, monaco, monospace',
    },
  },
});

export default themeList;
