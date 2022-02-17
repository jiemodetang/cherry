// 兑换 代币下拉选择 代币图标 zpq
const getTokenLogoURL = (address: string) =>{
  let iconrul = '';
  // 如果是自己的代币
  if (address === '0x4E697faa8c1bE1C4c3249FC47b2dc3d002B1F5Ef') {
    iconrul = '/images/mImg/i.png'
  } else {
    iconrul=  `https://assets.trustwalletapp.com/blockchains/smartchain/assets/${address}/logo.png`
  }
  return iconrul;
}

export default getTokenLogoURL
