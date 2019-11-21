export declare type ThemeName =
  | 'auto'
  | 'custom'
  | 'dark-black'
  | 'dark-gray'
  | 'light-gray'
  | 'light-white';

export interface ThemePair {
  id: ThemeName;
  color?: string;
}

export interface StaticThemeColors {
  black: string;
  blue: string;
  blueGray: string;
  brown: string;
  gray: string;
  green: string;
  lightRed: string;
  orange: string;
  pink: string;
  purple: string;
  red: string;
  teal: string;
  transparent: 'transparent';
  white: string;
  yellow: string;
}

export interface ThemeColors extends StaticThemeColors {
  primaryBackgroundColor: string;
  primaryForegroundColor: string;
  backgroundColor: string;
  backgroundColorDarker1: string;
  backgroundColorDarker2: string;
  backgroundColorDarker3: string;
  backgroundColorDarker4: string;
  backgroundColorDarker5: string;
  backgroundColorLess1: string;
  backgroundColorLess2: string;
  backgroundColorLess3: string;
  backgroundColorLess4: string;
  backgroundColorLess5: string;
  backgroundColorLighter1: string;
  backgroundColorLighter2: string;
  backgroundColorLighter3: string;
  backgroundColorLighter4: string;
  backgroundColorLighter5: string;
  backgroundColorMore1: string;
  backgroundColorMore2: string;
  backgroundColorMore3: string;
  backgroundColorMore4: string;
  backgroundColorMore5: string;
  backgroundColorTransparent05: string;
  backgroundColorTransparent10: string;
  backgroundColorTintedRed: string;
  foregroundColor: string;
  foregroundColorMuted10: string;
  foregroundColorMuted25: string;
  foregroundColorMuted40: string;
  foregroundColorMuted65: string;
  foregroundColorTransparent05: string;
  foregroundColorTransparent10: string;
}

export interface Theme extends ThemeColors {
  id: ThemeName;
  displayName: string;
  isDark: boolean;
  isInverted: boolean;
  invert: () => Theme;
}
export declare type ThemeTransformer = 'invert' | 'force-dark' | 'force-light';

export declare const themeColorFields: Array<keyof ThemeColors>;
export declare const themes: Record<ThemeName, Theme | undefined>;
export declare function loadTheme(
  theme?: ThemePair,
  preferredDarkTheme?: ThemePair,
  preferredLightTheme?: ThemePair
): Theme;

export const DEFAULT_DARK_THEME: ThemeName = 'dark-gray';
export const DEFAULT_LIGHT_THEME: ThemeName = 'light-gray';
export const DEFAULT_THEME_PAIR: ThemePair = {
  id: DEFAULT_DARK_THEME,
  color: '',
};
