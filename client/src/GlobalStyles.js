import { createGlobalStyle } from "styled-components"

const GlobalReset = createGlobalStyle`

  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after  {
    margin: 0;
    padding: 0;
    font-size: 62.5%;
    box-sizing: inherit;
  }

  body {
    font-family: 'Inter', sans-serif;
  }
`;

export default GlobalReset