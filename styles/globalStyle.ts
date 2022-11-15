import { createGlobalStyle, css } from "styled-components";
import typography from "./theme/typography";
import DropdownStyles from "./uiComponents/dropdown";

const GlobalStyle = createGlobalStyle<{ isA11yMode: boolean }>`
  html {
    height: 100%;
    width: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  *, *:before, *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: inherit;
  }

  ${({ isA11yMode }) =>
    isA11yMode &&
    css`
      @media (prefers-reduced-motion: reduce) {
        *,
        ::before,
        ::after {
          animation-delay: -1ms !important;
          animation-duration: 1ms !important;
          animation-iteration-count: 1 !important;
          background-attachment: initial !important;
          scroll-behavior: auto !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      }
    `}

  @font-face {
    font-family: "Apoc-Revelations";
    src: url("/fonts/ApocRevelations-Light.woff2") format("woff2"), 
    url("/fonts/ApocRevelations-Light.woff") format("woff");
  }
  @font-face {
    font-family: "Formula-Condensed";
    src: url("/fonts/PPFormula-CondensedBold.woff2") format("woff2"), 
    url("/fonts/PPFormula-CondensedBold.woff") format("woff");
  }
  @font-face {
    font-family: "Universal-Sans";
    src: url("/fonts/Universal-Sans-Display-450.woff2") format("woff2"), 
    url("/fonts/Universal-Sans-Display-450.woff") format("woff");
  }
  @font-face {
    font-family: "Avalon-Demi";
    src: url("/fonts/Avalon-Demi.woff2") format("woff2"), 
    url("/fonts/Avalon-Demi.woff") format("woff");
  }
  
  h1{
    font-family: ${typography.fontFamily.apoc};
  }
  div, span, p, input, label, select, text, button, section, article, header, footer, main, nav, caption, a, ul, li, ol, dl, fieldset, figcaption, figure, option, strong, table {
    line-height: ${typography.lineHeight.medium};
  }
  h1, h2, h3, h4, h5, h6 {
    line-height: ${typography.lineHeight.small}
  }
  .formula {
    font-family: ${typography.fontFamily.formula};
  }
  
  body {
    * {
      font-size: ${typography.fontSize.small};
      margin: 0;
      padding: 0;
    }

    
    font-family: ${typography.fontFamily.universalSansDisplay};
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    #__next {
      width:  100%;
      height: 100%;
    }
    .flex {
      display:flex;
    }
    .spacer {
      height: 2rem;
    }

    ${DropdownStyles}
  }

  .sr-only:not(:focus):not(:active) {
    clip: rect(0 0 0 0); 
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap; 
    width: 1px;
  }
`;

export default GlobalStyle;
