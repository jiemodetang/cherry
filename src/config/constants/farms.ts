import { serializeTokens } from './tokens'
import { SerializedFarmConfig } from './types'

const serializedTokens = serializeTokens()

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
  
 /**
  * zpq
  * pid : 0; 为 自己发的 代币；
  * 需要在 tokens.ts 中配置
  * （因为 walletInfo.ts 中读取 余额 时，代币名称直接写死的读取 tokens.ts 中的 cgc 的地址）
  */
  {
    pid: 0,
    lpSymbol: 'CGC',
    lpAddresses: {
      97: '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
      56: '0xd2A65E9D9F06B26b04edF099226129Df53B47158',
    },
    token: serializedTokens.syrup,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'CGC-USDT LP',
    lpAddresses: {
      97: '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
      56: '0xAd95ADa241F62300E265AbDE39379cF7Af9CD0bC',
    },
    token: serializedTokens.cgc,
    quoteToken: serializedTokens.usdt,
  },
  {
    pid: 2,
    lpSymbol: 'CGC-BNB LP',
    lpAddresses: {
      97: '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
      56: '0x5B16E108a1b25bEA6d10250E00a89aa2Df4F8A6F',
    },
    token: serializedTokens.cgc,
    quoteToken: serializedTokens.wbnb,
  }
]
export default farms
