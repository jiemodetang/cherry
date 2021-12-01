import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@pancakeswap/uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
  .cocoButton7166B0{
    background:#7166B0; 
    color:#FFFFFF;
    border:#7166B0;
  }
  .cocoButton7166B0NoBorder{
    background:none;
    color:#7166B0;
    border: 2px solid #7166B0
  }
  .colorD53B79{
    color:#D53B79;
  }


`

export default GlobalStyle
