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
  .color7166B0{
    color:#7166B0
  }
  .bottonD53B79{
    color: #D53B79;
    background: #F0F0F0;
    border-radius: 16px;
  }
  .bottonD53B79Border{
    background: #D53B79;
    box-shadow: 0px 1px 0px 0px #8B264F;
    border-radius: 16px;
    color: #FFFFFF;
  }
  .inputD84D84{
    background-color:#F8E5ED !important
  }
  .inputD84D84:focus:not(:disabled){ 
    border: 1px solid #D84D84 !important;
    box-shadow: 0px 0px 0px 1px #EBCAD6, 0px 0px 0px 4px #f7eaef  !important;
  }
  .ToggleF8E5ED{
    background-color: #F8E5ED !important;
  }
  .ToggleF8E5EDOpen{
    background-color: #D53B79 !important;
  }

`

export default GlobalStyle
