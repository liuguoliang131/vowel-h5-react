import React from 'react'
import './index.scss'
import { promotionPrizeDrawApi } from '../../../../axios/api'
import { Mask } from 'antd-mobile'
import utils from '../../../../utils'
// const prizeBoxBG = require('../../../../assets/Cube_Rounded0011 10.png')
const prizeBoxBG = require('../../../../assets/manghe.png')
const emptyIMG = require('../../../../assets/OhGodPleaseNo.png')
// let timer = null
class LuckyRolling extends React.Component {
  state = {
    prizeList: [],
    start: false
    // btnStatus: null
  }

  getPrizes = () => {
    const prizeList = [...this.props.prize_list]
    let emptyPrize = this.props.prize_list.find(item => {
      if (item.type === 5) {
        return true
      } else {
        return false
      }
    })
    if (!emptyPrize) {
      emptyPrize = {
        type: 5,
        note: '谢谢惠顾',
        pic_url: emptyIMG,
        title: '谢谢惠顾'
      }
    }
    for (let i = prizeList.length; i < 12; i++) {
      prizeList.push({
        ...emptyPrize
      })
    }
    prizeList.forEach(item => {
      item.active = false
    })
    this.setState({
      prizeList: JSON.parse(JSON.stringify(prizeList))
    })
    // console.log('prizeList', prizeList)
  }

  // // 定时器 抽奖时间控制按钮是否可点
  // setButtonStatus = () => {
  //   if (timer) clearTimeout(timer)
  //   timer = setInterval(() => {
  //     const now = new Date().getTime()
  //     if (now < this.props.draw_start_time) {
  //       this.setState({
  //         btnStatus: 1
  //       })
  //     } else if (now >= this.props.draw_start_time && now < this.props.draw_end_time) {
  //       this.setState({
  //         btnStatus: 2
  //       })
  //     } else {
  //       this.setState({
  //         btnStatus: 3
  //       })
  //       clearTimeout(timer)
  //     }
  //   }, 1000)
  // }
  buttonRender = () => {
    const Button = null
    if (utils.getToken()) {
      if (this.props.drawStatus === 2) {
        return (
          <div className={'start-btn gray'}>
          <div className="start-btn-row1">已结束</div>
          <div className="start-btn-row2">剩余抽奖机会
          <span>{this.props.remain_award_num}</span>次</div>
        </div>
        )
      } else {
        return (
          <div className={'start-btn'} onClick={() => this.playStart()}>
                <div className="start-btn-row1">点击抽奖</div>
                <div className="start-btn-row2">剩余抽奖机会<span>{this.props.remain_award_num}</span>次</div>
              </div>
        )
      }
    } else {
      return (
        <div className={'start-btn'} onClick={() => utils.goLogin()}>
              <div className="start-btn-row1">点击抽奖</div>
              <div className="start-btn-row2">登录后获取抽奖次数</div>
            </div>
      )
    }
  }

  componentDidMount () {
    this.getPrizes()
    // console.log('luckyRolling mount', window.location)
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps !== this.props) {
      if (this.props.prize_list) {
        this.getPrizes()
      }
      // this.setButtonStatus()
    }
  }

  render () {
    return (
      this.state.prizeList.length
        ? (
        <div className="LuckyRolling">
          <Mask
            visible={this.state.start}
            opacity={0}
          />
          <div className="bg-box">
            <div className="LuckyRolling-box">
              {this.buttonRender()}
              {
                this.state.prizeList.map((item, index) => {
                  switch (index) {
                    case 0:
                      return (
                        <div className={item.active ? 'prize x1 y1 active-prize' : 'prize x1 y1'} key={index}>
                          {/* <img className='bgPicture' src={prizeBoxBG} alt="" />
                          <img className='prizePicture' src={item.pic_url} alt="" /> */}
                          <img src={prizeBoxBG} className='bgPicture' />
                        </div>
                      )
                    case 1:
                      return (
                        <div className={item.active ? 'prize x2 y1 active-prize' : 'prize x2 y1'} key={index}>
                          {/* <img className='bgPicture' src={prizeBoxBG} alt="" />
                          <img className='prizePicture' src={item.pic_url} alt="" /> */}
                          <img src={prizeBoxBG} className='bgPicture' />
                        </div>
                      )
                    case 2:
                      return (
                        <div className={item.active ? 'prize x3 y1 active-prize' : 'prize x3 y1'} key={index}>
                          {/* <img className='bgPicture' src={prizeBoxBG} alt="" />
                          <img className='prizePicture' src={item.pic_url} alt="" /> */}
                          <img src={prizeBoxBG} className='bgPicture' />
                        </div>
                      )
                    case 3:
                      return (
                        <div className={item.active ? 'prize x4 y1 active-prize' : 'prize x4 y1'} key={index}>
                          {/* <img className='bgPicture' src={prizeBoxBG} alt="" />
                          <img className='prizePicture' src={item.pic_url} alt="" /> */}
                          <img src={prizeBoxBG} className='bgPicture' />
                        </div>
                      )
                    case 4:
                      return (
                        <div className={item.active ? 'prize x4 y2 active-prize' : 'prize x4 y2'} key={index}>
                          {/* <img className='bgPicture' src={prizeBoxBG} alt="" />
                          <img className='prizePicture' src={item.pic_url} alt="" /> */}
                          <img src={prizeBoxBG} className='bgPicture' />
                        </div>
                      )
                    case 5:
                      return (
                        <div className={item.active ? 'prize x4 y3 active-prize' : 'prize x4 y3'} key={index}>
                          {/* <img className='bgPicture' src={prizeBoxBG} alt="" />
                          <img className='prizePicture' src={item.pic_url} alt="" /> */}
                          <img src={prizeBoxBG} className='bgPicture' />
                        </div>
                      )
                    case 6:
                      return (
                        <div className={item.active ? 'prize x4 y4 active-prize' : 'prize x4 y4'} key={index}>
                          {/* <img className='bgPicture' src={prizeBoxBG} alt="" />
                          <img className='prizePicture' src={item.pic_url} alt="" /> */}
                          <img src={prizeBoxBG} className='bgPicture' />
                        </div>
                      )
                    case 7:
                      return (
                        <div className={item.active ? 'prize x3 y4 active-prize' : 'prize x3 y4'} key={index}>
                          {/* <img className='bgPicture' src={prizeBoxBG} alt="" />
                          <img className='prizePicture' src={item.pic_url} alt="" /> */}
                          <img src={prizeBoxBG} className='bgPicture' />
                        </div>
                      )
                    case 8:
                      return (
                        <div className={item.active ? 'prize x2 y4 active-prize' : 'prize x2 y4'} key={index}>
                          {/* <img className='bgPicture' src={prizeBoxBG} alt="" />
                          <img className='prizePicture' src={item.pic_url} alt="" /> */}
                          <img src={prizeBoxBG} className='bgPicture' />
                        </div>
                      )
                    case 9:
                      return (
                        <div className={item.active ? 'prize x1 y4 active-prize' : 'prize x1 y4'} key={index}>
                          {/* <img className='bgPicture' src={prizeBoxBG} alt="" />
                          <img className='prizePicture' src={item.pic_url} alt="" /> */}
                          <img src={prizeBoxBG} className='bgPicture' />
                        </div>
                      )
                    case 10:
                      return (
                        <div className={item.active ? 'prize x1 y3 active-prize' : 'prize x1 y3'} key={index}>
                          {/* <img className='bgPicture' src={prizeBoxBG} alt="" />
                          <img className='prizePicture' src={item.pic_url} alt="" /> */}
                          <img src={prizeBoxBG} className='bgPicture' />
                        </div>
                      )
                    case 11:
                      return (
                        <div className={item.active ? 'prize x1 y2 active-prize' : 'prize x1 y2'} key={index}>
                          {/* <img className='bgPicture' src={prizeBoxBG} alt="" />
                          <img className='prizePicture' src={item.pic_url} alt="" /> */}
                          <img src={prizeBoxBG} className='bgPicture' />
                        </div>
                      )
                    default:
                      return (
                        <div className={item.active ? 'prize x1 y2 active-prize' : 'prize x1 y2'} key={index}>
                          {/* <img className='bgPicture' src={prizeBoxBG} alt="" />
                          <img className='prizePicture' src={item.pic_url} alt="" /> */}
                          <img src={prizeBoxBG} className='bgPicture' />
                        </div>
                      )
                  }
                })
              }
            </div>
          </div>
      </div>
          )
        : null
    )
  }

  // 抽奖
  getPrizeDraw = () => {
    return new Promise((resolve, reject) => {
      promotionPrizeDrawApi({
        promotion_id: this.props.id
      }).then(res => {
        if (res.code !== 0) {
          resolve({
            finishIdx: false
          })
        } else {
          // 念君安版本
          // this.state.prizeList.forEach((item, index) => {
          //   if (item.id === res.data.id) {
          //     resolve({
          //       finishIdx: index,
          //       data: res.data
          //     })
          //   }
          // })
          resolve({
            finishIdx: Math.floor(this.state.prizeList.length * Math.random()),
            data: res.data
          })
        }
      })
    })
  }

  // 轮动动画 finishIdx:结果的index
  animationJ = (finishIdx, data) => {
    const that = this
    // 轮动2圈到3圈
    const { prizeList } = this.state
    //
    function deep (index, list, count) {
      setTimeout(() => {
        list[index].active = true
        if (index === 0) {
          list[list.length - 1].active = false
        } else {
          list[index - 1].active = false
        }
        that.setState({
          prizeList: list
        })
        const nextIndex = index + 1 === list.length ? 0 : index + 1
        if (count !== 0) {
          deep(nextIndex, list, count - 1)
        } else {
          // alert(`您抽中了${list[index].title}`)
          // that.props.success(list[index])
          that.props.success(data)
          that.setState({ start: false })
        }
      }, 100)
    }
    const count = 24 + finishIdx
    deep(0, prizeList, count)
  }

  // 点击开始
  playStart = async () => {
    // this.props.success({
    //   toast_type: 2,
    //   toast_content: '<p style="font-weight: 700;">恭喜您获得%v</p > 分享邀请好友参加可以获得更多抽奖机会'
    // })
    // return false
    if (!this.props.drawStatus) {
      console.log('play', this.props)
      this.props.success('未开始')
      return false
    }
    // if (this.props.remain_award_num === 0) {
    //   this.props.success('已用完')
    //   return false
    // }
    // 获取结果  然后开始动画
    console.log('start')
    if (this.state.start) return false

    const { finishIdx, data } = await this.getPrizeDraw()
    // const finishIdx = 0
    // const data = { toast_type: 1 }
    // 知道了结果，设置动画让其轮动多少次
    if (finishIdx === false) {
      return false
    } else {
      if (data.toast_type === 3 || data.toast_type === 4) {
        // 没有抽奖机会 或 错误
        this.props.success(data)
        return false
      }
    }
    this.setState({
      start: true
    })
    console.log('结果是', this.state.prizeList[finishIdx].text)
    this.animationJ(finishIdx, data)
  }
}

export default LuckyRolling
