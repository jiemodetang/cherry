import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { Button } from '@pancakeswap/uikit'
import 'popular-message/index.css';
import $message from "popular-message";
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
// import { getBep20Contract } from 'utils/contractHelpers'
import _ from "lodash";
import numberUtils from "config/abi/numberUtils";
import $web3js from "config/abi/web3";
import erc20Abi from 'config/abi/stakePool.json'
import lockAbi from 'config/abi/stLock.json'
import { tokenPool, lockPool } from 'utils/contractHelpers'
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
    width: 100%;
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

const Zpool = () => {
  const [list1, setList1] = useState(0);
  // 是否授权
  const [isAuthed1, setIsAuthed1] = useState(false);
  const [isAuthed2, setIsAuthed2] = useState(false);
  const [selectVal, setSelectVal] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [orderArr, setOrderArr] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [reward, setReward] = useState('0.0000');
  const { account } = useWeb3React()
  useEffect(() => {
    // account  当前登录账号
    // console.log('9090', account);
    // console.log('22', contractAddress)
    // const contract = getBep20Contract(contractAddress.stakeContract.address)
    const contractStake = tokenPool(contractAddress.tokenContract.address)
    console.log('00', contractStake)
    // 1. 是否授权
    const isAuth = async () => {
      const thisWeb3 = $web3js.getWeb3();
      const nftConst = new thisWeb3.eth.Contract(
        erc20Abi,
        contractAddress.tokenContract.address,
        {
          from: account,
        }
      );
      nftConst.methods
        .allowance(account, contractAddress.lockContract.address)
        .call({ from: account })
        .then((res) => {
          if (res > 0) {
            setIsAuthed1(true)
          }
        });
      // console.log('0', isauth)
    }

    // 2. 解锁是否授权
    const isAuth2 = async () => {
      const thisWeb3 = $web3js.getWeb3();
      const nftConst = new thisWeb3.eth.Contract(
        lockAbi,
        contractAddress.lockContract.address,
        {
          from: account,
        }
      );
      nftConst.methods
        .allowance(account, contractAddress.lockContract.address)
        .call({ from: account })
        .then((res) => {
          console.log('sss', res);
          if (res > 0) {
            setIsAuthed2(true)
          }
        });
      // console.log('0', isauth)
    }

    // 3. 锁仓获取用户所有订单
    const getOrderList = async () => {
      const thisWeb3 = $web3js.getWeb3();
      const nftConst = new thisWeb3.eth.Contract(
        lockAbi,
        contractAddress.lockContract.address,
        {
          from: account,
        }
      );
      nftConst.methods
        .getUserAllDepositIds(account)
        .call({ from: account })
        .then((res) => {
          console.log('res', res);
          setOrderArr(res);
          if (res.length) {
            // 取订单详情
            getOrderDetail()
          }
        });
    }
    if (account) {
      isAuth();
      getOrderList();
      isAuth2()
      // rewardView();
    }
  }, [account, list1]); // eslint-disable-line

  // 订单详情
  const getOrderDetail = async () => {
    const thisWeb3 = $web3js.getWeb3();
    const nftConst2 = new thisWeb3.eth.Contract(
      lockAbi,
      contractAddress.lockContract.address,
      {
        from: account,
      }
    );
    const arr = ['1', '2']
    const detailArr = [];
    arr.forEach((item, index) => {
      nftConst2.methods.getDepositDetails(item).call({ from: account })
        .then((res) => {
          console.log(res);
          detailArr.push(res);
          console.log('detailArr', detailArr);
          setOrderData(detailArr);
        });
    })
  }

  // 授权
  const authApprove = async () => {
    if (!account) {
      $message.info('请先链接钱包');
      return
    }
    connectMetaMask();
    const thisWeb3 = $web3js.getWeb3();
    const nftConst = new thisWeb3.eth.Contract(
      erc20Abi,
      contractAddress.tokenContract.address,
      {
        from: account,
      }
    );
    let getedHash = '';
    const amount111 = await numberUtils.movePointRight(99999999, 18);
    nftConst.methods
      .approve(contractAddress.lockContract.address, amount111)
      .send({ from: account })
      .on("transactionHash", function (hash) {
        $message.config({
          top: 50,
          duration: 0
        });
        $message.loading("请耐心等待交易打包，不要退出");
        getedHash = hash;
      })
      .on("receipt", function (receipt) {
        if (receipt.transactionHash === getedHash) {
          console.log('approve', 'success');
          $message.destroy();
          setTimeout(() => {
            $message.success('授权成功！')
          }, 800)
          setIsAuthed1(true)
        }
      })
      .on("error", function (error, receipt) {
        console.log('err', error);
        $message.destroy();
        setTimeout(() => {
          $message.error(error.message);
        }, 800)
      });
  };

  // 锁仓数量
  const handlerInput = (event) => {
    const inputVal = event.target.value
    setAmountInput(inputVal);
  }

  // 下拉选择月份
  const slectChange = (event) => {
    const val1 = event.target.value
    setSelectVal(val1);
  };

  // 锁仓
  const handlerLockPool = async () => {
    // selectVal 月份
    if (!account) {
      $message.info('请先链接钱包');
      return
    }
    if (!amountInput) {
      $message.info('请输入锁仓数量');
      return
    }
    if (!selectVal) {
      $message.info('请选择月份');
      return
    }
    connectMetaMask();
    const thisWeb3 = $web3js.getWeb3();
    const nftConst = new thisWeb3.eth.Contract(
      lockAbi,
      contractAddress.lockContract.address,
      {
        from: account,
      }
    );
    let getedHash = '';
    const amount222 = await numberUtils.movePointRight(amountInput, 18);
    nftConst.methods
      .lockTokens(amount222, selectVal)
      .send({ from: account })
      .on("transactionHash", function (hash) {
        $message.config({
          top: 50,
          duration: 0
        });
        $message.loading("请耐心等待交易打包，不要退出");
        getedHash = hash;
      })
      .on("receipt", function (receipt) {
        if (receipt.transactionHash === getedHash) {
          console.log('approve', 'success');
          $message.destroy();
          setTimeout(() => {
            $message.success('锁仓成功！')
          }, 800)
          setSelectVal('')
          setAmountInput('')
        }
      })
      .on("error", function (error, receipt) {
        console.log('err', error);
        $message.destroy();
        setTimeout(() => {
          $message.error(error.message);
        }, 800)
        setSelectVal('')
        setAmountInput('')
      });
  };

  // 解锁
  const doNoLock = (id) => {
    // withdrawTokens
    connectMetaMask();
    const thisWeb3 = $web3js.getWeb3();
    const nftConst = new thisWeb3.eth.Contract(
      lockAbi,
      contractAddress.lockContract.address,
      {
        from: account,
      }
    );
    let getedHash = '';
    nftConst.methods
      .withdrawTokens(id)
      .send({ from: account })
      .on("transactionHash", function (hash) {
        $message.config({
          top: 50,
          duration: 0
        });
        $message.loading("请耐心等待交易打包，不要退出");
        getedHash = hash;
      })
      .on("receipt", function (receipt) {
        if (receipt.transactionHash === getedHash) {
          console.log('approve', 'success');
          $message.destroy();
          setTimeout(() => {
            $message.success('解锁仓成功！')
          }, 800);
          setList1(list1 + 1)
          // 为什么报错, 重新调用
          // getOrderList()
        }
      })
      .on("error", function (error, receipt) {
        console.log('err', error);
        $message.destroy();
        setTimeout(() => {
          $message.error(error.message);
        }, 800)
      });
    console.log('3', id)
  }

  // 授权解锁
  const authunlock = async () => {
    if (!account) {
      $message.info('请先链接钱包');
      return
    }
    connectMetaMask();
    const thisWeb3 = $web3js.getWeb3();
    const nftConst = new thisWeb3.eth.Contract(
      lockAbi,
      contractAddress.lockContract.address,
      {
        from: account,
      }
    );
    let getedHash = '';
    const amount111 = await numberUtils.movePointRight(99999999, 18);
    nftConst.methods
      .approve(contractAddress.lockContract.address, amount111)
      .send({ from: account })
      .on("transactionHash", function (hash) {
        $message.config({
          top: 50,
          duration: 0
        });
        $message.loading("请耐心等待交易打包，不要退出");
        getedHash = hash;
      })
      .on("receipt", function (receipt) {
        if (receipt.transactionHash === getedHash) {
          console.log('approve', 'success');
          $message.destroy();
          setTimeout(() => {
            $message.success('解锁授权成功！')
          }, 800)
          setIsAuthed2(true)
        }
      })
      .on("error", function (error, receipt) {
        console.log('err', error);
        $message.destroy();
        setTimeout(() => {
          $message.error(error.message);
        }, 800)
      });
  }

  // 查看奖励
  const rewardView = () => {
    const thisWeb3 = $web3js.getWeb3();
    const nftConst2 = new thisWeb3.eth.Contract(
      lockAbi,
      contractAddress.lockContract.address,
      {
        from: account,
      }
    );
    nftConst2.methods
      .userEachRewards(account)
      .call({ from: account })
      .then((res) => {
        setReward(res)
        console.log('奖励', res)

      });
  }

  // 领取奖励
  const getRewardOne = async () => {
    if (!account) {
      $message.info('请先链接钱包');
      return
    }
    connectMetaMask();
    const thisWeb3 = $web3js.getWeb3();
    const nftConst = new thisWeb3.eth.Contract(
      lockAbi,
      contractAddress.lockContract.address,
      {
        from: account,
      }
    );
    let getedHash = '';
    nftConst.methods
      .receiveReward(account)
      .send({ from: account })
      .on("transactionHash", function (hash) {
        $message.config({
          top: 50,
          duration: 0
        });
        $message.loading("请耐心等待交易打包，不要退出");
        getedHash = hash;
      })
      .on("receipt", function (receipt) {
        if (receipt.transactionHash === getedHash) {
          console.log('approve', 'success');
          $message.destroy();
          setTimeout(() => {
            $message.success('领取奖励成功！')
          }, 800)
          rewardView()
        }
      })
      .on("error", function (error, receipt) {
        console.log('err', error);
        $message.destroy();
        setTimeout(() => {
          $message.error(error.message);
        }, 800)
      });
  }
  function connectMetaMask() {
    $web3js
      .connectMetaMask()
      .then((res) => {
        // this.$toast(this.$t("lang.connectsuc"));
      })
      .catch((error) => {
        //    this.$toast(this.$t("lang.connectfail") + error);
      });
  }

  return (
    <PoolDiv style={ua ? { flexDirection: 'column', alignItems: 'center' } : null}>
      <PoolLeft style={{ width: ua ? '330px' : '80%' }}>
        <div style={{flexDirection : ua ? 'column': 'unset', margin: '0 0 45px', width: '80%', textAlign: 'left', display: 'flex', alignItems: ua ? '' : 'center'}}>
          <div style={{ width: '60%' }}>
            <span>锁仓数量：</span>
            <input
              placeholder="请输入锁仓数量" type="number"
              value={null}
              onChange={handlerInput}
              style={{ height: '40px', paddingLeft: '6px', borderRadius: '4px', marginRight: '10px', border: 'none', borderColor: '#ccc', margin: ua ? '10px 0 15px 15px' : '0' }} />

            <span style={{ marginLeft:  ua ? '0' : '25px'}}>请选择月份：</span>
            <select style={{ marginRight: '35px', margin:  ua ? '15px' : '0' }} onChange={slectChange}>
              <option value="请选择">请选择</option>
              <option value={3}>三月</option>
              <option value={6}>六月</option>
              <option value={9}>九月</option>
              <option value={12}>十二月</option>
            </select>
          </div>
          <Button 
            style={{ marginTop: ua ? '20px' : '0' }} 
            onClick={!isAuthed1 ? authApprove : handlerLockPool}>
            {!isAuthed1 ? '授权' : '锁定'}
          </Button>
        </div>
        <span style={{ width: '80%', textAlign: 'left' }}>订单列表:</span>
        <div style={{ maxHeight: '450px', minHeight: '80px', overflowY: 'auto' }}>
          <ul style={{ minHeight: '30px', margin: '10px 0' }}>
            {
              orderData.length ?
                orderData.map((item, index) => {
                  return <li style={{ margin: '10px 0' }}>
                    {/* <p style={{ width: '60%' }}> </p> */}
                    <span>锁仓数量：{item[3]}，</span>
                    <span style={{ marginLeft: '8px' }}>是否已解锁：{item[5] ? '已解锁' : '未解锁'}</span>
                    <span style={{ margin: '0 25px' }}>{item.status}</span>
                    {
                      isAuthed2 ?
                        <Button style={{ marginLeft: '10px', height: '35px' }}
                          disabled={item[5]}
                          onClick={() => {
                            doNoLock(index + 1)
                          }}
                        >
                          解锁
                        </Button>
                        :
                        <Button style={{ marginLeft: '10px', height: '35px' }}
                          onClick={authunlock}
                        >
                          授权
                        </Button>
                    }
                  </li>
                }) : '暂无订单列表!'
            }
          </ul>
        </div>
        <div style={{ marginTop: '50px', width: '80%', textAlign: 'left', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '60%' }}>
            <span style={{ margin: '60px 30px 0 0' }}>待领取奖励 CGC：{reward || '0.0000'}</span>
          </div>
          <Button onClick={getRewardOne}>领取奖励</Button>
        </div>
      </PoolLeft>

      {/* <PoolRight style={{width: ua ? '300px' : '40%'}}>
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
      </PoolRight> */}
    </PoolDiv>
  )
}

export default Zpool