import { Theme, ThemeName } from '../types';
import { theme as darkBlack } from './dark-black';
import { theme as darkGray } from './dark-gray';
import { theme as lightGray } from './light-gray';
import { theme as lightWhite } from './light-white';

export const themes: Record<ThemeName, Theme | undefined> = {
  auto: undefined,
  custom: undefined,
  'dark-black': darkBlack,
  'dark-gray': darkGray,
  'light-gray': lightGray,
  'light-white': lightWhite,
};

export const darkThemesArr = [darkBlack, darkGray];
export const lightThemesArr = [lightWhite, lightGray];
