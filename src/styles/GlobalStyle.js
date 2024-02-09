import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
 ${reset}
  body {
    font-family: "Helvetica", "Arial", sans-serif;
    background-color:#F5F5F5;
    height:100vh;
    max-width: 1400px;
    margin: 0 auto;
  }
  :root{
    --main-color: #4B7BEC;
    --sub-color: #FF6348;
  }
  a:hover, a:visited, a:link, a:active
{
    text-decoration: none;
    color:black;
}

`;

export default GlobalStyle;
