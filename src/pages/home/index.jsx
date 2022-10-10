
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import './index.scss'
import { Empty, Toast } from 'antd-mobile'
import Crumbs from '../../components/crumbs/index.jsx'
import TopWord from './components/topWord/index.jsx'
import CountDown from './components/countDown'
import LuckyRolling from './components/luckyRolling/index.jsx'
import TaskList from './components/taskList/index.jsx'
import DetailedPicture from './components/detailedPicture/index.jsx'
import AudioPlayer from './components/audioPlayer/index.jsx'
import Dialog from '../../components/dialog/index.jsx'
import RuleNode from './components/ruleNode'
import FirstPop from './components/firstPop'
import utils from '../../utils'
import { promotionActivityDetailApi } from '../../axios/api'
// import { mockRequest } from './mock-request'
let timer = null
const Home = (props) => {
  // const saveCallBack = useRef()
  const locationHook = useLocation()
  const navigate = useNavigate()
  const [resData, setResData] = useState({})
  const [data, setData] = useState({
  })

  const [emptyMsg, setEmptyMsg] = useState('')
  const [ruleNodeVisible, setRuleNodeVisible] = useState(false)
  // 去往海报
  const handleGoPoster = () => {
    if (process.env.NODE_ENV === 'development') {
      if (data.id) {
        navigate('/layout/poster', {
          state: {
            id: data.id,
            title: data.title,
            dec: data.sub_title
          },
          replace: false
        })
      } else {
        Toast.show({
          content: emptyMsg
        })
      }
    } else {
      utils.ownApp(() => {
        if (data.id) {
          navigate('/layout/poster', {
            state: {
              id: data.id,
              title: data.title,
              dec: data.sub_title
            },
            replace: false
          })
        } else {
          Toast.show({
            content: emptyMsg
          })
        }
      })
    }
  }
  const btn1Fn = () => {
    setRollingDialogOption({
      ...rollingDialogOption,
      visible: false
    })
    handleGoPoster()
  }
  const close = () => {
    console.log('close')
    setRollingDialogOption({
      ...rollingDialogOption,
      visible: false
    })
  }
  // 刷新页面方法
  const handleRefreshPage = () => {
    const { path, query } = utils.getHashQuery()
    // debugger
    const time = String(new Date().getTime())
    console.log('time', time)
    query.time = time
    let newUrl = window.location.origin + '/#/layout/home'
    const arr = []
    Object.keys(query).forEach((key, idx) => {
      arr[idx] = key + '=' + query[key]
    })
    newUrl = newUrl + '?' + arr.join('&')
    // eslint-disable-next-line no-self-assign
    window.location.href = newUrl
  }
  // 关闭 第一次进入的弹窗

  const closeFirstPop = () => {
    try {
      setData({
        ...data,
        is_first: 0
      })
      // handleRefreshPage()
      setTimeout(() => {
        getDetail()
      }, 1500)
    } catch (error) {
      alert(error.message)
    }
  }
  const [rollingDialogOption, setRollingDialogOption] = useState({
    visible: false,
    text: '恭喜您获得了一次抽奖机会，奖池开启后记得来参与喔！',
    btn1: { text: '我知道了', click: () => btn1Fn() },
    close: () => close()
  }) // 抽奖弹窗里的配置
  // 获取详情
  const getDetail = async () => {
    if (timer) {
      clearInterval(timer)
    }
    // eslint-disable-next-line no-useless-catch
    try {
      // console.log('location', window.location)
      // 没有参数 正常登录
      const params = {}
      const urlParams = utils.getUrlParams()
      if (Object.keys(urlParams).length) {
        if (urlParams.id) {
          params.id = Number(urlParams.id)
        }
        if (urlParams.share_sign) {
          params.share_sign = urlParams.share_sign
        }
      } else {
        if (locationHook.state.id) {
          params.id = Number(locationHook.state.id)
        }
        if (locationHook.state.share_sign) {
          params.share_sign = locationHook.state.share_sign
        }
      }

      const res = await promotionActivityDetailApi(params)
      if (res.code !== 0) {
        setEmptyMsg(res.msg)
        return false
      }
      // const res = await mockRequest()
      console.log('res', res)
      res.data.draw_end_time *= 1000
      res.data.draw_start_time *= 1000
      res.data.end_time *= 1000
      res.data.start_time *= 1000
      setResData(res.data)
      setData(res.data)
    } catch (error) {
      throw error
    }
  }
  // 去往我的奖品
  const handleGoMyPrize = () => {
    utils.ownApp(() => {
      const urlParams = utils.getUrlParams()
      if (urlParams.id) {
        navigate('/layout/myPrize', {
          state: { id: Number(urlParams.id) },
          replace: false
        })
      } else {
        if (data.id) {
          navigate('/layout/myPrize', {
            state: { id: Number(data.id) },
            replace: false
          })
        }
      }
    })
  }
  // 抽奖次数-1
  const handleChangeNum = () => {
    setData({
      ...data,
      user_info: {
        ...data.user_info,
        remain_award_num: data.user_info.remain_award_num - 1
      }
    })
  }
  // 抽奖callback
  const rollingSuccess = (prize) => {
    // console.log('success', prize)
    if (prize === '已用完') {
      setRollingDialogOption({
        ...rollingDialogOption,
        visible: true,
        text: '您还没有抽奖机会或已用完，快去分享赚取抽奖机会！',
        btn1: { text: '分享邀请', click: () => btn1Fn() }
      })
      return false
    } else if (prize === '未开始') {
      const startTime = utils.getTimeData(data.draw_start_time)

      setRollingDialogOption({
        ...rollingDialogOption,
        visible: true,
        text: `不要急哦，${startTime.mon}月${startTime.dd}日${startTime.hh}:${startTime.MM}开始抽奖哦~`,
        btn1: { text: '确认', click: () => btn1Fn() }
      })
      return false
    }
    handleChangeNum()
    if (prize.type === 5) {
      // 弹窗 很遗憾没有中奖
      setRollingDialogOption({
        ...rollingDialogOption,
        visible: true,
        text: prize.toast_content,
        btn1: { text: '获取更多机会', click: () => btn1Fn() },
        btn2: { text: '继续抽奖', click: () => close() }
      })
    } else {
      setRollingDialogOption({
        ...rollingDialogOption,
        visible: true,
        text: prize.toast_content,
        btn1: { text: '分享邀请', click: () => btn1Fn() }

      })
    }
  }

  // 设置定时器 改变活动状态
  const handleSetStatus = () => {
    const newData = JSON.parse(JSON.stringify(data))
    const now = new Date().getTime()
    if (now < resData.draw_start_time) {
      newData.drawStatus = 0 // 抽奖未开始
    } else if (now >= resData.draw_start_time && now < resData.draw_end_time) {
      newData.drawStatus = 1 // 抽奖开始
    } else {
      newData.drawStatus = 2 // 抽奖结束
    }
    if (now < resData.start_time) {
      newData.status = 0
    } else if (now >= resData.start_time && now < resData.end_time) {
      newData.status = 1
    } else {
      newData.status = 2
    }
    setData(newData)
    if (newData.status === 2) {
      return false
    }
    timer = setInterval(() => {
      const newData = JSON.parse(JSON.stringify(data))
      const now = new Date().getTime()
      if (now < resData.draw_start_time) {
        newData.drawStatus = 0 // 抽奖未开始
      } else if (now >= resData.draw_start_time && now < resData.draw_end_time) {
        newData.drawStatus = 1 // 抽奖开始
      } else {
        newData.drawStatus = 2 // 抽奖结束
      }
      if (now < resData.start_time) {
        newData.status = 0
      } else if (now >= resData.start_time && now < resData.end_time) {
        newData.status = 1
      } else {
        newData.status = 2
      }
      if (now > resData.start_time && now > resData.draw_end_time) {
        newData.status = 2
        newData.drawStatus = 2
        clearTimeout(timer)
      }
      setData(val => {
        return {
          ...val,
          status: newData.status,
          drawStatus: newData.drawStatus
        }
      })
      if ((data.status !== resData.status && resData.status !== undefined) || (data.drawStatus !== resData.drawStatus && resData.drawStatus !== undefined)) {
        // handleRefreshPage()
        getDetail()
      }
    }, 1000)
  }

  useEffect(() => {
    // saveCallBack.current = handleSetStatus
  })
  useEffect(() => {
    // console.log('data', data)
  }, [data])
  useEffect(() => {
    getDetail()
  }, [])
  useEffect(() => {
    // saveCallBack.current()
    handleSetStatus()
    return () => {
      clearTimeout(timer)
    }
  }, [resData])
  return (
    <div className='home'>
      <Crumbs buttonHide={!data.id} to={() => handleGoPoster()} handleGoMyPrize={() => handleGoMyPrize()}></Crumbs>
      {
        emptyMsg
          ? (
            <div className="empty-content">
              <div className="empty-center">
                <img src={require('../../assets/empty-icon.png')} alt="" />
                <span>{emptyMsg}</span>
              </div>
            </div>
            )
          : (
          <>
          {data.id
            ? (
            <>
              <TopWord mainImg={data.main_img}></TopWord>
              <CountDown id={data.id} draw_start_time={data.draw_start_time}></CountDown>
              <div className="mb14"></div>
              <LuckyRolling remain_award_num={data.user_info.remain_award_num} drawStatus={data.drawStatus} prize_list={data.prize_list} id={data.id} success={(prize) => rollingSuccess(prize)}></LuckyRolling>
              <div className="mb16"></div>
              <TaskList drawStatus={data.drawStatus} music_info={data.music_info} userInfo={data.user_info} task_list={data.task_list} showRule={() => setRuleNodeVisible(true)} to={() => handleGoPoster()}></TaskList>
              <div className="mb16"></div>
              <DetailedPicture picList={data.pic_list}></DetailedPicture>
              {/* {
                utils.isWhatSysTem() !== 2 ? (<AudioPlayer {...data.music_info}></AudioPlayer>) : null
              } */}
              <AudioPlayer {...data.music_info}></AudioPlayer>
              <RuleNode visible={ruleNodeVisible} close={() => setRuleNodeVisible(false)} text={data.rule_node}></RuleNode>
            </>

              )
            : null
          }
          </>
            )

      }

      <div className="footer"></div>
      <Dialog {...rollingDialogOption}></Dialog>
      <FirstPop visible={data.is_first} shareInfo={data.share_info} close={() => closeFirstPop()}></FirstPop>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    // token: state.login.token,
    // count: state.index.count
  }
}
export default connect(mapStateToProps, null)(Home)
