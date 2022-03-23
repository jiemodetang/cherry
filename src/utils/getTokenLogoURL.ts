// 兑换 代币下拉选择 代币图标 zpq
const getTokenLogoURL = (address: string) =>{
  let iconrul = '';
  // 如果是自己的代币
  if (address === '0xffB3a5dA757641F2cA9DC1Cb3d85F94cF968fe72') {
    iconrul = '/images/mImg/i.png'
  } else {
    iconrul=  `https://assets.trustwalletapp.com/blockchains/smartchain/assets/${address}/logo.png`
  }
  return iconrul;
}

export default getTokenLogoURL
