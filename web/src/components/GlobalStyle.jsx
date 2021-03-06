import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      outline: 0;
      box-sizing: border-box;
  }

  html,body, #root {
    height: 100%;
  }

  body {
      background: #E5E6F0;
      -webkit-font-smoothing: antialised;
    }
`;

export default GlobalStyle;
