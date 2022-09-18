
import React, { useState, useEffect } from 'react'
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
import FirstPop from './components/firstPop'
import utils from '../../utils'
import { promotionActivityDetailApi } from '../../axios/api'
let timer = null
const Home = (props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [data, setData] = useState({
  })

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
  // 关闭 第一次进入的弹窗

  const closeFirstPop = () => {
    setData({
      ...data,
      is_first: 0
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
        if (location.state.id) {
          params.id = Number(location.state.id)
        }
        if (location.state.share_sign) {
          params.share_sign = location.state.share_sign
        }
      }

      const res = await promotionActivityDetailApi(params)
      if (res.code !== 0) {
        setEmptyMsg(res.msg)
        return false
      }
      res.data.draw_end_time *= 1000
      res.data.draw_start_time *= 1000
      res.data.end_time *= 1000
      res.data.start_time *= 1000
      const newData = res.data
      const now = new Date().getTime()
      if (now < newData.draw_start_time) {
        newData.drawStatus = 0 // 抽奖未开始
      } else if (now >= newData.draw_start_time && now < newData.draw_end_time) {
        newData.drawStatus = 1 // 抽奖开始
      } else {
        newData.drawStatus = 2 // 抽奖结束
      }
      if (now < newData.start_time) {
        newData.status = 0
      } else if (now >= newData.start_time && now < newData.end_time) {
        newData.status = 1
      } else {
        newData.status = 2
      }
      setData(newData)
      if (newData.status === 2) {
        return false
      }
      timer = setInterval(() => {
        const now = new Date().getTime()
        if (now < newData.draw_start_time) {
          newData.drawStatus = 0 // 抽奖未开始
        } else if (now >= newData.draw_start_time && now < newData.draw_end_time) {
          newData.drawStatus = 1 // 抽奖开始
        } else {
          newData.drawStatus = 2 // 抽奖结束
        }
        if (now < newData.start_time) {
          newData.status = 0
        } else if (now >= newData.start_time && now < newData.end_time) {
          newData.status = 1
        } else {
          newData.status = 2
        }
        if (now > newData.start_time && now > newData.draw_end_time) {
          newData.status = 2
          newData.drawStatus = 2
          clearTimeout(timer)
        }
        setData(newData)
        if ((newData.status !== data.status && data.status !== undefined) || (newData.drawStatus !== data.drawStatus && data.drawStatus !== undefined)) {
          window.history.go(0)
        }
      }, 1000)
    } catch (error) {
      Toast.show({
        content: error.message,
        icon: 'error'
      })
      throw error
    }

    // const newData = {
    //   id: 14,
    //   type: 1,
    //   title: '幸运大抽奖',
    //   sub_title: '0918-测试活动，预热+正在进行1',
    //   rule_note: '活动规则',
    //   status: 1,
    //   start_time: 1663478208,
    //   end_time: 1663636611,
    //   draw_start_time: 1663478711000,
    //   draw_end_time: 1663498711701,
    //   prize_list: [
    //     {
    //       id: 4,
    //       title: '测试课程奖品',
    //       note: '测试课程奖品',
    //       pic_url: 'https://media.shenglangnft.com/16474136647.jpg',
    //       type: 4
    //     },
    //     {
    //       id: 5,
    //       title: '苹果手表S7',
    //       note: '苹果手表S7',
    //       pic_url: 'https://file.yuanyinfu.com/operate/prize/手表2.png',
    //       type: 1
    //     },
    //     {
    //       id: 6,
    //       title: '苹果耳机pro版',
    //       note: '苹果耳机pro版',
    //       pic_url: 'https://file.yuanyinfu.com/operate/prize/耳机2.png',
    //       type: 1
    //     },
    //     {
    //       id: 7,
    //       title: '免单奖励',
    //       note: '免单奖励',
    //       pic_url: 'https://file.yuanyinfu.com/operate/prize/免单卡.png',
    //       type: 1
    //     },
    //     {
    //       id: 8,
    //       title: '索尼运动耳机',
    //       note: '索尼运动耳机',
    //       pic_url: 'https://file.yuanyinfu.com/operate/prize/耳机1.png',
    //       type: 1
    //     },
    //     {
    //       id: 9,
    //       title: '300奇点积分包',
    //       note: '300奇点积分包',
    //       pic_url: 'https://file.yuanyinfu.com/operate/prize/1000006207.png',
    //       type: 2
    //     },
    //     {
    //       id: 10,
    //       title: '500奇点积分包',
    //       note: '500奇点积分包',
    //       pic_url: 'https://file.yuanyinfu.com/operate/prize/1000006083.png',
    //       type: 2
    //     },
    //     {
    //       id: 11,
    //       title: '800奇点积分包',
    //       note: '800奇点积分包',
    //       pic_url: 'https://file.yuanyinfu.com/operate/prize/1000006208.png',
    //       type: 2
    //     },
    //     {
    //       id: 12,
    //       title: '1000奇点积分包',
    //       note: '1000奇点积分包',
    //       pic_url: 'https://file.yuanyinfu.com/operate/prize/1000006209.png',
    //       type: 2
    //     },
    //     {
    //       id: 13,
    //       title: '一路听天下读书年卡',
    //       note: '一路听天下读书年卡',
    //       pic_url: 'https://file.yuanyinfu.com/operate/prize/1000006202.png',
    //       type: 3
    //     },
    //     {
    //       id: 14,
    //       title: '元音符VIP专属尤克里里课程',
    //       note: '元音符VIP专属尤克里里课程',
    //       pic_url: 'https://file.yuanyinfu.com/operate/prize/1000006210.png',
    //       type: 4
    //     },
    //     {
    //       id: 15,
    //       title: '元音符VIP专属乐理课程',
    //       note: '元音符VIP专属乐理课程',
    //       pic_url: 'https://file.yuanyinfu.com/operate/prize/1000006083-1.png',
    //       type: 4
    //     },
    //     {
    //       id: 16,
    //       title: '谢谢惠顾',
    //       note: '谢谢惠顾',
    //       pic_url: 'https://file.yuanyinfu.com/operate/prize/1000006085.png',
    //       type: 5
    //     }
    //   ],
    //   task_list: [
    //     {
    //       type: 1,
    //       reach_num: 0,
    //       give_num: 2
    //     },
    //     {
    //       type: 3,
    //       reach_num: 3,
    //       give_num: 2
    //     },
    //     {
    //       type: 2,
    //       reach_num: 0,
    //       give_num: 4
    //     }
    //   ],
    //   pic_list: [
    //     'https://file.yuanyinfu.com/operate/promotion/voice-promotion-1663464599349.png',
    //     'https://file.yuanyinfu.com/operate/promotion/voice-promotion-1663464602280.png'
    //   ],
    //   main_img: 'https://file.yuanyinfu.com/operate/promotion/voice-promotion-1663464588417.png',
    //   user_info: {
    //     user_id: 100446,
    //     remain_award_num: 3,
    //     share_award_num: 0,
    //     share_user_num: 0
    //   },
    //   music_info: {
    //     id: 0,
    //     music_time: '233',
    //     music_pic: 'https://media.shenglangnft.com/poster/1663464177230397.jpg?imageView2/2/w/300/h/300',
    //     music_pic_shear: '',
    //     music_url: 'https://media.shenglangnft.com/music/1663464167314327.wav',
    //     visit_num: '',
    //     music_name: '0918，预售歌曲参加活动预约+开售001',
    //     play_num: 0,
    //     like_num: 0,
    //     is_like: 0,
    //     share_h5_url: '',
    //     avatar: 'https://media.shenglangnft.com/avatar/165821988149739.jpeg',
    //     author_name: '域名资源-艺人姓名',
    //     music_info_id: 328,
    //     music_status: 0,
    //     lyrics: ''
    //   },
    //   share_info: {
    //     user_name: '',
    //     user_avatar: ''
    //   },
    //   is_first: 0
    // }
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
      const newData = data
      if (now < data.draw_start_time) {
        newData.drawStatus = 0 // 抽奖未开始
      } else if (now >= data.draw_start_time && now < data.draw_end_time) {
        console.log('drawStatus', 1)
        newData.drawStatus = 1 // 抽奖开始
      } else {
        console.log('drawStatus', 2)
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
        console.log('结束了')
        clearTimeout(timer)
      }

      if (newData.status !== data.status || newData.drawStatus !== data.drawStatus) {
        console.log(newData.status, data.status)
        // eslint-disable-next-line no-prototype-builtins
        if (newData.status !== data.status && JSON.stringify(data) !== '{}') {
          // window.history.go(0)
        }
        setData(newData)
      }
    }, 1000)
  }
  useEffect(() => {
    console.log('home1')
  })
  useEffect(() => {
    getDetail()
  }, [])
  useEffect(() => {
    // handleSetStatus()
    return () => {

    }
  }, [data])
  return (
    <div className='home'>
      <Crumbs buttonHide={!data.id} to={() => handleGoPoster()} handleGoMyPrize={() => handleGoMyPrize()}></Crumbs>
      {
        data.id
          ? (
          <>
          <TopWord mainImg={data.main_img}></TopWord>
          <CountDown id={data.id} draw_start_time={data.draw_start_time}></CountDown>
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
