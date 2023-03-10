
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import './preheat.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import Crumbs from '../../components/crumbs/index.jsx'
import CountDown from './components/countDown/index.jsx'
import TopWord from './components/topWord/index.jsx'
import Panel from './components/panel'
import LuckyRolling from './components/luckyRolling/index.jsx'
import TaskList from './components/taskList/index.jsx'
import DetailedPicture from './components/detailedPicture/index.jsx'
import AudioPlayer from './components/audioPlayer/index.jsx'
import Dialog from '../../components/dialog/index.jsx'
import utils from '../../utils'
import { promotionActivityDetailApi } from '../../axios/api'
const Home = (props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [data, setData] = useState({})

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
      const params = {}
      if (urlParams.id) {
        params.id = Number(urlParams.id)
        params.share_sign = urlParams.share_sign
      } else {
        params.id = location.state.id
      }
      const res = await promotionActivityDetailApi(params)
      if (res.code !== 0) {
        return false
      }
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
  useEffect(() => {
    console.log('home ', location)
    getDetail()
  }, [])
  return (
    <div className='preheat'>
      <Crumbs to={() => handleGoPoster()}></Crumbs>
      <TopWord mainImg={data.main_img}></TopWord>
      <div className="mb14"></div>
      <CountDown startTime={new Date('2022-09-22 00:00:00').getTime()}></CountDown>
      <div className="mb14"></div>
      <LuckyRolling {...data} success={(prize) => rollingSuccess(prize)}></LuckyRolling>
      <div className="mb16"></div>
      <TaskList taskList={data.task_list} to={() => handleGoPoster()} userInfo={data.user_info}></TaskList>
      <div className="mb16"></div>
      <DetailedPicture picList={data.pic_list}></DetailedPicture>
      <AudioPlayer {...data.music_info}></AudioPlayer>
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
