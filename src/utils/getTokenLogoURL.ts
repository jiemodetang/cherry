// 兑换 代币下拉选择 代币图标 zpq
const getTokenLogoURL = (address: string) =>{
  let iconrul = '';
  // 如果是自己的代币
  if (address === '0x6dC4aA8e2F8826E2DE6BD1Fad8D5451aebB5b7D3') {
    iconrul = '/images/mImg/i.png'
  } else {
    iconrul=  `https://assets.trustwalletapp.com/blockchains/smartchain/assets/${address}/logo.png`
  }
  return iconrul;
}

export default getTokenLogoURL
