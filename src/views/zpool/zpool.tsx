import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { Button } from '@pancakeswap/uikit'
import 'popular-message/index.css';
import $message from "popular-message";
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
// import { getBep20Contract } from 'utils/contractHelpers'
import numberUtils from "config/abi/numberUtils";
import { stakePool,  lockPool} from 'utils/contractHelpers'
import contractAddress from 'config/constants/zpool'

const ua = navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
const PoolDiv = styled.div`
    margin-top: 15px;
    display: flex;
    justify-content: center;
    padding-bottom: 30px;
`;
const data = [
  {
    name: '订单1',
    status: '成功'
  },
  {
    name: '订单2',
    status: '失败'
  }
];
const PoolLeft = styled.div`
    margin-top: 15px;
    border-radius: 8px;
    padding: 15px;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 40%;
    min-height:500px;
    backgrond: #fff;
    border: 1px solid #ccc;
`;

const PoolRight = styled.div`
    margin-top: 15px;
    display: flex;
    border-radius: 8px;
    align-items: center;
    flex-direction: column;
    width: 40%;
    backgrond: #fff;
    min-height:500px;
    border: 1px solid #ccc;
    margin-left: 5%;
    padding: 15px;
`;

const listDiv = styled.div`
    margin-top: 15px;
    display: flex;
    justify-content: center;
    padding-bottom: 30px;
`;

const Zpool: React.FC = () => {
  // 是否授权
	const [isAuthed1, setIsAuthed1] = useState(false);
  const { account, chainId, connector, library } = useWeb3React()
  useEffect(() => {
    // account  当前登录账号
    // console.log('9090', account);
    console.log('22', contractAddress)
    // const contract = getBep20Contract(contractAddress.stakeContract.address)
    const contractStake= stakePool(contractAddress.stakeContract.address)
    console.log('00', contractStake)
    const contractLock= lockPool(contractAddress.lockContract.address)
    console.log('11', contractLock)

    const amount =  numberUtils.movePointRight(99999999, 18);
    console.log(amount);
	});

  // 矿池一领取奖励
  const getRewardOne = () => {
    if (!account) {
      $message.info('请先链接钱包');
      return
		}
    alert('234')
  }

  // 矿池二领取奖励
  const getRewardTwo = () => {
    if (!account) {
      $message.info('请先链接钱包');
      return
		}
    alert('234')
  }

  return (
    <PoolDiv style={ua ? {flexDirection : 'column', alignItems: 'center'}: null}>
      <PoolLeft style={{width: ua ? '300px' : '40%'}}>
        <p>矿池一</p>
        <div style={{margin: '15px 0'}}>
          <input placeholder="请输入质押数量" type="number" style={{height: '40px', paddingLeft: '6px', borderRadius: '4px', marginRight: '10px', border: 'none', borderColor: '#ccc'}}/>
          <Button>
            {!isAuthed1 ? '授权' : '锁定'}
          </Button>
        </div>
        <div style={{maxHeight: '400px', overflowY: 'auto'}}>
          <ul>
            {
              data.map((item, index) => {
                return  <li style={{margin: '10px 0'}}>
                <span>{item.name}</span>
                <span style={{margin: '0 25px'}}>{item.status}</span>
                <Button style={{marginLeft: '10px', height: '35px'}}>解锁</Button>
              </li>
              })
            }
          </ul>
        </div>
        <div style={{marginTop: '20px'}}>
          <p style={{margin: '20px 0'}}>待领取奖励：0.0000</p>
          <Button onClick={getRewardOne}>领取奖励</Button>
        </div>
      </PoolLeft>

      <PoolRight style={{width: ua ? '300px' : '40%'}}>
        <p style={{margin: '15px 0 35px'}}>已质押（个）: 0.0000</p>
        <div>
          <input placeholder="请输入质押数量" type="number" style={{height: '40px', paddingLeft: '6px', borderRadius: '4px', marginRight: '10px', border: 'none', borderColor: '#ccc'}}/>
          <Button>质押</Button>
        </div>
       
       <div>
          <input placeholder="请输入赎回数量" type="number" style={{height: '40px', paddingLeft: '6px',  borderRadius: '4px', marginRight: '10px', border: 'none', borderColor: '#ccc'}}/>
          <Button style={{marginTop: '20px'}}>赎回</Button>
       </div>
       <div style={{marginTop: '20px'}}>
          <p style={{margin: '20px 0'}}>待领取奖励：0.0000</p>
          <Button onClick={getRewardTwo}>领取奖励</Button>
        </div>
      </PoolRight>
    </PoolDiv>
  )
}

export default Zpool