
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import './index.scss'
import { Empty } from 'antd-mobile'
import Crumbs from '../../components/crumbs/index.jsx'
import TopWord from './components/topWord/index.jsx'
import CountDown from './components/countDown'
import LuckyRolling from './components/luckyRolling/index.jsx'
import TaskList from './components/taskList/index.jsx'
import DetailedPicture from './components/detailedPicture/index.jsx'
import AudioPlayer from './components/audioPlayer/index.jsx'
import Dialog from '../../components/dialog/index.jsx'
import utils from '../../utils'
import { promotionActivityDetailApi } from '../../axios/api'
let timer = null
const Home = (props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [data, setData] = useState({})
  const [emptyMsg, setEmptyMsg] = useState('暂无内容')
  const btn1Fn = () => {
    setRollingDialogOption({
      ...rollingDialogOption,
      visible: false
    })
  }
  const close = () => {
    console.log('close')
    setRollingDialogOption({
      ...rollingDialogOption,
      visible: false
    })
  }
  const [rollingDialogOption, setRollingDialogOption] = useState({
    visible: false,
    text: '恭喜您获得了一次抽奖机会，奖池开启后记得来参与喔！',
    btn1: { text: '我知道了', click: () => btn1Fn() },
    close: () => close()
  }) // 抽奖弹窗里的配置
  // 获取详情
  const getDetail = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      console.log('location', window.location)
      const urlParams = utils.getUrlParams()
      console.log('urlParams', urlParams)
      // 如果url有参数 那么跳转到login进行登录 share_sign
      if (urlParams.id) {
        return utils.hashPush('/login', {
          ...urlParams,
          back: '/layout/home'
        })
      }
      // 没有参数 正常登录
      const params = {}
      params.id = location.state.id
      params.share_sign = location.state.share_sign || ''
      const res = await promotionActivityDetailApi(params)
      if (res.code !== 0) {
        setEmptyMsg(res.msg)
        return false
      }
      res.data.draw_end_time *= 1000
      res.data.draw_start_time *= 1000
      res.data.end_time *= 1000
      res.data.start_time *= 1000
      setData(res.data)
    } catch (error) {
      throw error
    }
  }
  // 去往我的奖品
  const handleGoMyPrize = () => {
    utils.ownApp(() => {
      navigate('/layout/myPrize', {
        state: {},
        replace: false
      })
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
    console.log('success', prize)
    if (prize === 0) {
      setRollingDialogOption({
        ...rollingDialogOption,
        visible: true,
        text: '您还没有抽奖机会或已用完，快去分享赚取抽奖机会！',
        btn1: { text: '确认', click: () => btn1Fn() }
      })
      return false
    } else if (prize === 1) {
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
        text: '不要遗憾，不要气馁，再抽一次~',
        btn1: { text: '确认', click: () => btn1Fn() }
      })
    } else {
      setRollingDialogOption({
        ...rollingDialogOption,
        visible: true,
        text: `恭喜您获得${prize.title}，请前往“我的奖品”里查看兑换`,
        btn1: { text: '去查看', click: () => handleGoMyPrize() }

      })
    }
  }
  // 去往海报
  const handleGoPoster = () => {
    navigate('/layout/poster', {
      state: { id: data.id },
      replace: false
    })
  }
  // 设置定时器 改变活动状态
  const handleSetStatus = () => {
    if (JSON.stringify(data) === '{}') {
      return false
    }
    if (timer) {
      return false
    }
    timer = setInterval(() => {
      const now = new Date().getTime()
      const newData = { ...data }
      if (now < data.draw_start_time) {
        newData.drawStatus = 0 // 抽奖未开始
      } else if (now >= data.draw_start_time && now < data.draw_end_time) {
        newData.drawStatus = 1 // 抽奖开始
      } else {
        newData.drawStatus = 2 // 抽奖结束
      }
      if (now < data.start_time) {
        newData.status = 0
      } else if (now >= data.start_time && now < data.end_time) {
        newData.status = 1
      } else {
        newData.status = 2
      }
      if (now > data.start_time && now > data.draw_end_time) {
        clearTimeout(timer)
      }
      setData(newData)
    }, 1000)
  }
  useEffect(() => {
    console.log('home ', location)
    getDetail()
  }, [])
  useEffect(() => {
    handleSetStatus()
  }, [data])
  return (
    <div className='home'>
      <Crumbs to={() => handleGoPoster()}></Crumbs>
      {
        data.id
          ? (
          <>
          <TopWord mainImg={data.main_img}></TopWord>
          <CountDown draw_start_time={data.draw_start_time}></CountDown>
          <div className="mb14"></div>
          <LuckyRolling {...data} success={(prize) => rollingSuccess(prize)}></LuckyRolling>
          <div className="mb16"></div>
          <TaskList {...data} to={() => handleGoPoster()} userInfo={data.user_info}></TaskList>
          <div className="mb16"></div>
          <DetailedPicture picList={data.pic_list}></DetailedPicture>
          <AudioPlayer {...data.music_info}></AudioPlayer>
          </>
            )
          : (<Empty description={emptyMsg} />)

      }

      <div className="footer"></div>
      <Dialog {...rollingDialogOption}></Dialog>
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
