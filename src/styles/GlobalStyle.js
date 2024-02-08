import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
 ${reset}
  body {
    font-family: "Helvetica", "Arial", sans-serif;
    background-color:#F5F5F5;
    height:100vh;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
  }
  a{text-decoration:none;}
  a:visited { color:black; }
  :root{
    --main-color: #4B7BEC;
    --sub-color: #FF6348;
  }
  
`;

export default GlobalStyle;
