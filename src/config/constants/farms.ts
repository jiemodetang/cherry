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
      56: '0xD36a623A74b8547c9c9dD06A41Fb0EcE5a02e1D4',
    },
    token: serializedTokens.syrup,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'CGC-USDT LP',
    lpAddresses: {
      97: '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
      56: '0x183a4c25077a3A35d86b34d8e5908Eb36444FC89',
    },
    token: serializedTokens.cgc,
    quoteToken: serializedTokens.usdt,
  }
]
export default farms
