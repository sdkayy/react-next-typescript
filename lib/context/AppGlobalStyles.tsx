import React, { useMemo } from 'react';
import { toKebabCase } from '../helpers';
import { themeColorFields } from '../styles/helpers';
import { Theme } from '../styles/types';
import { useTheme } from './ThemeContext';

function getStyles(params: { theme: Theme }) {
  const { theme: t } = params;

  const invertedTheme = t.invert();

  return `
    body {
      ${themeColorFields.map(field => `--theme-${toKebabCase(field)}:${t[field]};`).join('\n')}
      ${themeColorFields
        .map(field => `--theme-inverted-${toKebabCase(field)}:${invertedTheme[field]};`)
        .join('\n')}
    }
  `;
}

export const AppGlobalStyles = React.memo(() => {
  const { theme } = useTheme();

  const styles = getStyles({ theme });

  return useMemo(() => <style key="app-global-styles-inner">{styles}</style>, [styles]);
});

AppGlobalStyles.displayName = 'AppGlobalStyles';

// --theme-primary-background-color: #841209;
// --theme-primary-foreground-color: #0D2621;
// --theme-background-color: #1f2229;
// --theme-background-color-darker-1: #14161a;
// --theme-background-color-darker-2: #090a0c;
// --theme-background-color-darker-3: #000;
// --theme-background-color-darker-4: #000;
// --theme-background-color-darker-5: #000;
// --theme-background-color-less-1: #2a2e38;
// --theme-background-color-less-2: #353a46;
// --theme-background-color-less-3: #4b5263;
// --theme-background-color-less-4: #616a80;
// --theme-background-color-less-5: #979eb0;
// --theme-background-color-lighter-1: #2a2e38;
// --theme-background-color-lighter-2: #353a46;
// --theme-background-color-lighter-3: #4b5263;
// --theme-background-color-lighter-4: #616a80;
// --theme-background-color-lighter-5: #979eb0;
// --theme-background-color-more-1: #14161a;
// --theme-background-color-more-2: #090a0c;
// --theme-background-color-more-3: #000;
// --theme-background-color-more-4: #000;
// --theme-background-color-more-5: #000;
// --theme-background-color-transparent-05: rgba(31,34,41,0.05);
// --theme-background-color-transparent-10: rgba(31,34,41,0.1);
// --theme-background-color-tinted-red: #3b282c;
// --theme-foreground-color: #e2e4e9;
// --theme-foreground-color-muted-10: #16181d;
// --theme-foreground-color-muted-25: #373c49;
// --theme-foreground-color-muted-40: #586074;
// --theme-foreground-color-muted-65: #9aa1b2;
// --theme-foreground-color-transparent-05: rgba(226,228,233,0.05);
// --theme-foreground-color-transparent-10: rgba(226,228,233,0.1);
// --theme-black: #000000;
// --theme-blue: #6E9BEA;
// --theme-blue-gray: #7493A2;
// --theme-brown: #9C7162;
// --theme-gray: #ACACB0;
// --theme-green: #69DF73;
// --theme-light-red: #FF6E64;
// --theme-orange: #FFB251;
// --theme-pink: #FF6496;
// --theme-purple: #A772Ef;
// --theme-red: #DE4A40;
// --theme-teal: #49D3B4;
// --theme-white: #FFFFFF;
// --theme-yellow: #FFDE57;
// --theme-inverted-primary-background-color: #841209;
// --theme-inverted-primary-foreground-color: #0D2621;
// --theme-inverted-background-color: #e0ddd6;

//     --theme-primary-background-color: #841209;
//     --theme-primary-foreground-color: #0D2621;
//     --theme-background-color: #fff;
//     --theme-background-color-darker-1: #edf2f7;
//     --theme-background-color-darker-2: #dce5f0;
//     --theme-background-color-darker-3: #b8cbe0;
//     --theme-background-color-darker-4: #94b1d1;
//     --theme-background-color-darker-5: #4e7db2;
//     --theme-background-color-less-1: #edf2f7;
//     --theme-background-color-less-2: #dce5f0;
//     --theme-background-color-less-3: #b8cbe0;
//     --theme-background-color-less-4: #94b1d1;
//     --theme-background-color-less-5: #4e7db2;
//     --theme-background-color-lighter-1: #fff;
//     --theme-background-color-lighter-2: #fff;
//     --theme-background-color-lighter-3: #fff;
//     --theme-background-color-lighter-4: #fff;
//     --theme-background-color-lighter-5: #fff;
//     --theme-background-color-more-1: #fff;
//     --theme-background-color-more-2: #fff;
//     --theme-background-color-more-3: #fff;
//     --theme-background-color-more-4: #fff;
//     --theme-background-color-more-5: #fff;
//     --theme-background-color-transparent-05: rgba(255,255,255,0.05);
//     --theme-background-color-transparent-10: rgba(255,255,255,0.1);
//     --theme-background-color-tinted-red: #ffe2e0;
//     --theme-foreground-color: #1f3247;
//     --theme-foreground-color-muted-10: #dce5f0;
//     --theme-foreground-color-muted-25: #a6bed8;
//     --theme-foreground-color-muted-40: #7197c1;
//     --theme-foreground-color-muted-65: #36587c;
//     --theme-foreground-color-transparent-05: rgba(31,50,71,0.05);
//     --theme-foreground-color-transparent-10: rgba(31,50,71,0.1);
//     --theme-black: #000000;
//     --theme-blue: #3666B9;
//     --theme-blue-gray: #607D8B;
//     --theme-brown: #795548;
//     --theme-gray: #A4A4A8;
//     --theme-green: #2ECE45;
//     --theme-light-red: #FF665C;
//     --theme-orange: #FFAA4D;
//     --theme-pink: #FF5C91;
//     --theme-purple: #562992;
//     --theme-red: #FF3F34;
//     --theme-teal: #43C3A7;
//     --theme-white: #FFFFFF;
//     --theme-yellow: #F1CC52;
//     --theme-inverted-primary-background-color: #841209;
//     --theme-inverted-primary-foreground-color: #0D2621;
//     --theme-inverted-background-color: #000;
