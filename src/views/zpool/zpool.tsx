import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { Button } from '@pancakeswap/uikit'
import 'popular-message/index.css';
import $message from "popular-message";
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { useTranslation } from 'contexts/Localization'
import _ from "lodash";
import numberUtils from "config/abi/numberUtils";
import $web3js from "config/abi/web3";
import erc20Abi from 'config/abi/stakePool.json'
import lockAbi from 'config/abi/stLock.json'
import masterChefABI from 'config/abi/stmasterchef.json'
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
    padding:  15px 15px 40px;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height:500px;
    backgrond: #fff;
    filter: drop-shadow(rgba(25, 19, 38, 0.15) 0px 1px 4px);
    background: rgb(255, 255, 255);
    border-radius: 16px;
    margin: 16px 0px;

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

const Fdiv1 = styled.div`
  width:100%;
  display:flex;
  align-items: center;
  padding: 10px 20px;
  justify-content:space-between;
`;

const TokenDiv = styled.div`
  width: 44%;
  display: flex;
  flex-direction:column;
  justify-content: center;
  padding-bottom: 30px;
  border: 2px solid rgb(235, 202, 215);
  border-radius: 16px;
  padding: 20px;
  height:142px;
`;

const Zpool = () => {
  const [list1, setList1] = useState(0);
  const [stakeTokenB, setStakeTokenB] = useState('0.0000')
  const [veTokenB, setVeTokenB] = useState('0.0000')
  // 是否授权
  const [isAuthed1, setIsAuthed1] = useState(false);
  const [isAuthed2, setIsAuthed2] = useState(false);
  const [selectVal, setSelectVal] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [orderArr, setOrderArr] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [reward, setReward] = useState('0.0000');
  const { account } = useWeb3React()
  const { t } = useTranslation()
  useEffect(() => {
    // account  当前登录账号
    // console.log('9090', account);
    // console.log('22', contractAddress)
    // const contract = getBep20Contract(contractAddress.stakeContract.address)
    const contractStake = tokenPool(contractAddress.tokenContract.address)

    // 0   staketoken balanceOf
    const stakeTokenbal = async () => {
      const thisWeb3 = $web3js.getWeb3();
      const nftConst = new thisWeb3.eth.Contract(
        erc20Abi,
        contractAddress.tokenContract.address,
        {
          from: account,
        }
      );
      nftConst.methods
      .balanceOf(account)
      .call({ from: account })
      .then((res) => {
        console.log('stakeTokenbal', res);
        const stakeres = numberUtils.movePointLeft(res, 18).toString();
        setStakeTokenB(stakeres)
      });
     
    }
    // 00  vetoken balanceOf
    const veTokenbal = async () => {
      const thisWeb3 = $web3js.getWeb3();
      const nftConst = new thisWeb3.eth.Contract(
        lockAbi,
        contractAddress.lockContract.address,
        {
          from: account,
        }
      );
      nftConst.methods
      .balanceOf(account)
      .call({ from: account })
      .then((res) => {
        console.log('veres', res);
        const veres = numberUtils.movePointLeft(res, 18).toString();
        setVeTokenB(veres)
      });
     
      
    }
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
          // setList1(list1 + 1)
          if (res.length) {
            // 取订单详情
            getOrderDetail(res)
          }
        });
    }
    if (account) {
      stakeTokenbal()
      veTokenbal()
      isAuth();
      getOrderList();
      isAuth2()
      rewardView();
    }
  }, [account, list1]); // eslint-disable-line

  // 订单详情
  const getOrderDetail = async (ssss) => {
    console.log('ddd', ssss);
    const thisWeb3 = $web3js.getWeb3();
    const nftConst2 = new thisWeb3.eth.Contract(
      lockAbi,
      contractAddress.lockContract.address,
      {
        from: account,
      }
    );
    // const arr = ['1', '2', '3', '4', '5', '6', '7', '9', '10', '11', '12', '14']
    const detailArr = [];
    ssss.forEach((item, index) => {
      nftConst2.methods.getDepositDetails(item).call({ from: account })
        .then((res) => {
          console.log(res);
          detailArr.push(res);
          setOrderData(detailArr);
        });
    })
  }

  // 授权
  const authApprove = async () => {
    if (!account) {
      $message.info(t('Please link the wallet first'));
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
      $message.info(t('Please link the wallet first'));
      return
    }
    if (!amountInput) {
      $message.info(t('Please enter the lock-up amount'));
      return
    }
    if (!selectVal) {
      $message.info(t('Please select a month'));
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
    console.log('amount222, selectVal', amount222, selectVal)
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
          setList1(list1 + 1)
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
  const doNoLock = (itemid) => {
    const id = Number(itemid)
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
      $message.info(t('Please link the wallet first'));
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
      masterChefABI,
      contractAddress.mastchef.address,
      {
        from: account,
      }
    );
    nftConst2.methods
      .userEachRewards(account)
      .call({ from: account })
      .then((res) => {
        const resreward = numberUtils.movePointLeft(res, 18).toString();
        setReward(resreward)
        console.log('奖励', res)
      });
  }

  // 领取奖励
  const getRewardOne = async () => {
    if (!account) {
      $message.info(t('Please link the wallet first'));
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
      <PoolLeft style={{ width: ua ? '330px' : '80%', padding: ua ? '0' : '20px' }}>
        <Fdiv1 style={{flexDirection : ua ? 'column' : 'unset'}}>
          <TokenDiv style={{width: ua ? '100%':'44%'}}>
            <span>stakeToken {t('Balance')}：{stakeTokenB}</span>
            <span style={{marginTop: '25px'}}>veToken {t('Balance')}：{veTokenB}</span>
          </TokenDiv>
          <div style={{flexDirection : ua ? 'column': 'column', marginTop: ua ?'10px': '0', width: ua ? '100%' : '50%', padding:'20px', textAlign: 'left', display: 'flex', alignItems: ua ? '' : 'center', border: '2px solid rgb(235, 202, 215)', borderRadius: '16px'}}>
            <div style={{ width: '100%', display:'flex', alignItems: ua ?'unset':'center', flexDirection: ua ? 'column' : 'unset' }}>
              <span>{t('Locked Quantity')}：</span>
              <input
                placeholder={t('Locked Quantity')} type="number"
                value={amountInput}
                onChange={handlerInput}
                style={{ height: '40px', paddingLeft: '6px', borderRadius: '4px', marginRight: '10px', border: 'none', borderColor: '#ccc', margin: ua ? '10px 0 15px 15px' : '0' }} />
              <span style={{ marginLeft:  ua ? '0' : '25px'}}>{t('select month')}：</span>
              <select style={{ marginRight: '35px', margin:  ua ? '15px' : '0' }} onChange={slectChange}>
                <option value="请选择">{t("please choose")}</option>
                <option value={3}>三月</option>
                <option value={6}>六月</option>
                <option value={9}>九月</option>
                <option value={12}>十二月</option>
                <option value={15}>十五月</option>
                <option value={18}>十八月</option>
              </select>
            </div>
            <Button 
              style={{ marginTop: ua ? '20px' : '10px', marginRight:'auto' }} 
              onClick={!isAuthed1 ? authApprove : handlerLockPool}>
              {!isAuthed1 ? t('Auth') : t('locking')}
            </Button>
          </div>
        </Fdiv1>

        <span style={{height: '2px', width: '100%', background: '#eee', marginTop: '20px'}}></span> {/* eslint-disable-line */}
        <span style={{ width: '80%', textAlign: 'left',margin: '20px 0 15px',paddingLeft: '20px' }}>{t('Order List')}:</span>
        <div style={{ maxHeight: '450px', minHeight: '100px', width: '80%', marginLeft: '25px', padding: '15px', border: '2px solid rgb(235, 202, 215)', borderRadius: '16px'}}>
          <ul style={{ minHeight: '30px', margin: '10px 0', maxHeight: '450px', overflowY: 'auto'}}>
            {
              orderData.length ?
                orderData.map((item, index) => {
                  return <li style={{ margin: '5px 0', width: ua ?'100%' : '80%',paddingLeft: '40px', display:'flex', flexWrap: ua ? 'wrap': 'nowrap'}}>
                    <p style={{ width: '100%', marginBottom: ua ? '15px' : '0'}}> 
                    <span style={{marginRight:'5px'}}>{index + 1}. </span>
                    <span>{t('Locked Quantity')}：{numberUtils.movePointLeft(item[2], 18)}，</span>
                    <span style={{ marginLeft: '8px' }}>{t('Is it unlocked')}：{!item[4] ? t("Unlockable") : item[3] ? t("unlocked") : t("not unlocked")}</span>
                    <span style={{ margin: '0 25px' }}>{item.status}</span>
                    </p>
                    
                    {
                      isAuthed2 ?
                        <Button style={{ marginLeft: '10px', height: '35px', width:'95px' }}
                          disabled={item[3] || item[4]}
                          onClick={() => {
                            doNoLock(item[5])
                          }}
                        >
                          {t('unlock')}
                        </Button>
                        :
                        <Button style={{ marginLeft: '10px', height: '35px', width:'95px' }}
                          onClick={authunlock}
                        >
                           {t('Auth')}
    
                        </Button>
                    }
                  </li>
                }) : <span style={{marginLeft: '45px'}}>{ t('No order list yet!')}</span>
            }
          </ul>
        </div>
        <span style={{height: '2px', width: '100%', background: '#eee', marginTop: '20px'}}></span> {/* eslint-disable-line */}
        <div style={{paddingLeft: ua ? '0' : '18px', width: '100%'}}>
          <div style={{ marginTop: '20px', width: ua ? '90%':'44%',padding: '20px', marginLeft : ua ? '20px': '', textAlign: 'left', display: 'flex',flexDirection: 'column', border: '2px solid rgb(235, 202, 215)', borderRadius: '16px'}}>
            <div>
              <span style={{ margin: '60px 30px 0 0' }}>{t('Rewards to be claimed')} CGC：{reward || '0.0000'}</span>
            </div>
            <Button onClick={getRewardOne} style={{marginTop: '20px', width:'200px'}}>{t('Receive award')}</Button>
          </div>
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