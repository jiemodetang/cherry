// 兑换 代币下拉选择 代币图标 zpq
const getTokenLogoURL = (address: string) =>{
  let iconrul = '';
  // 如果是自己的代币
  if (address === '0xCb597f83722fC551e0748b25B2a0ac613606bb62') {
    iconrul = '/images/mImg/i.png'
  } else {
    iconrul=  `https://assets.trustwalletapp.com/blockchains/smartchain/assets/${address}/logo.png`
  }
  return iconrul;
}

export default getTokenLogoURL
