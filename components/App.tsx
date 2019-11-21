import * as React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import themeList from '../lib/theme';
import { App as ThemedApp } from './Theme';

interface Props {
  children: any;
  theme: string;
}

const GlobalStyle = createGlobalStyle`
  * {
    border: 0;
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
    font-weight: inherit;
    margin: 0;
    outline: 0;
    padding: 0;
    text-decoration: none;
    text-rendering: optimizeLegibility;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
  html {
    height: 100%;
    box-sizing: border-box;
    font-size: 16px;
    line-height: 1.5;
    background-color: #ffffff;
    color: #454F63;
  }
  body {
    display: block;
    position: relative;
    min-height: 100%;
    margin: 0;
    font-family: 'Muli', sans-serif;
    min-width: 320px;
    direction: ltr;
    font-feature-settings: 'kern';
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    scroll-behavior: smooth;
  }
  a {
    color: currentColor;
    text-decoration: none;
  }
  a:hover {
    cursor: pointer;
  }
  textarea {
    resize: none;
  }
  ::-moz-selection {
    /* Code for Firefox */
    background: #0176ff;
    color: #ffffff;
  }
  ::selection {
    background: #0176ff;
    color: #ffffff;
  }
  ::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: #a3afbf;
  }
  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #a3afbf;
    opacity: 1;
  }
  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #a3afbf;
    opacity: 1;
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #a3afbf;
  }
  #root {
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    flex-direction: column;
    -ms-flex-direction: column;
    -moz-flex-direction: column;
    -webkit-flex-direction: column;
    height: 100%;
    width: 100%;
  }
`;

const App = ({ children, theme }: Props) => {
  const themeName = !themeList[theme] ? 'main' : theme;

  return (
    <ThemeProvider theme={themeList}>
      <ThemedApp>
        <GlobalStyle />
        {children}
      </ThemedApp>
    </ThemeProvider>
  );
};

App.defaultProps = {
  theme: 'main',
};

export default App;
