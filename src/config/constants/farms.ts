import { serializeTokens } from './tokens'
import { SerializedFarmConfig } from './types'

const serializedTokens = serializeTokens()

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'CAKE',
    lpAddresses: {
      97: '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
      56: '0x39b719Fea96275b7504BeeDAA7BCa813e2E89992',
    },
    token: serializedTokens.syrup,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'BNB-USDT LP',
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      56: '0x35d3cf2c2671d1acd392fb55addc67035e8cf5bd',
    },
    token: serializedTokens.wbnb,
    quoteToken: serializedTokens.usdt
  },
  // 新加 zpq
  {
    pid: 2,
    lpSymbol: 'BTC-TEST-WBNB LP',
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      56: '0x3e74444DBa5D10Da20FDAE9e6459D1d092Cbce93',
    },
    token: serializedTokens.wbnb,
    quoteToken: serializedTokens['BTC-TEST']
  }
]

export default farms
