// 兑换 代币下拉选择 代币图标 zpq
const getTokenLogoURL = (address: string) =>{
  let iconrul = '';
  // 如果是自己的代币
  if (address === '0xd2A65E9D9F06B26b04edF099226129Df53B47158') {
    iconrul = '/images/mImg/i.png'
  } else {
    iconrul=  `https://assets.trustwalletapp.com/blockchains/smartchain/assets/${address}/logo.png`
  }
  return iconrul;
}

export default getTokenLogoURL
