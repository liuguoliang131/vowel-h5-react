import React from 'react'
import './index.scss'
import { promotionPrizeDrawApi } from '../../../../axios/api'
const prizeBoxBG = require('../../../../assets/Cube_Rounded0011 10.png')
// let timer = null
class LuckyRolling extends React.Component {
  state = {
    prizeList: [],
    start: false
    // btnStatus: null
  }

  getPrizes = () => {
    const prizeList = [...this.props.prize_list]
    const emptyPrize = this.props.prize_list.find(item => {
      if (item.type === 5) {
        return true
      } else {
        return false
      }
    })
    for (let i = prizeList.length; i < 12; i++) {
      prizeList.push({
        ...emptyPrize
      })
    }
    prizeList.forEach(item => {
      item.active = false
    })
    this.setState({
      prizeList
    })
    console.log('prizeList', prizeList)
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

  componentDidMount () {
    console.log('luckyRolling mount', window.location)
  }

  componentDidUpdate (prevProps, prevState) {
    console.log('luckyrolling update', this.props)
    if (prevProps !== this.props) {
      if (this.props.prize_list) {
        this.getPrizes()
      }
      // this.setButtonStatus()
    }
  }

  render () {
    return (
      <div className="LuckyRolling">
        {this.state.prizeList.length
          ? (
          <div className="bg-box">
            <div className="LuckyRolling-box">
            {this.props.status === 2
              ? (
                <div className={'start-btn gray'}>
                <div className="start-btn-row1">已结束</div>
                <div className="start-btn-row2">今日剩余抽奖机会{this.props.user_info.remain_award_num}次</div>
              </div>
                )
              : (
                <div className={'start-btn'} onClick={() => this.playStart()}>
                      <div className="start-btn-row1">点击抽奖</div>
                      <div className="start-btn-row2">剩余抽奖机会{this.props.user_info.remain_award_num}次</div>
                    </div>
                )}
              {
                this.state.prizeList.map((item, index) => {
                  switch (index) {
                    case 0:
                      return (
                        <div className={item.active ? 'prize x1 y1 active-prize' : 'prize x1 y1'} key={index}>
                          <img className='bgPicture' src={prizeBoxBG} alt="" />
                          <img className='prizePicture' src={item.pic_url} alt="" />
                        </div>
                      )
                    case 1:
                      return (
                        <div className={item.active ? 'prize x2 y1 active-prize' : 'prize x2 y1'} key={index}>
                          <img className='bgPicture' src={prizeBoxBG} alt="" />
                          <img className='prizePicture' src={item.pic_url} alt="" />
                        </div>
                      )
                    case 2:
                      return (
                        <div className={item.active ? 'prize x3 y1 active-prize' : 'prize x3 y1'} key={index}>
                          <img className='bgPicture' src={prizeBoxBG} alt="" />
                          <img className='prizePicture' src={item.pic_url} alt="" />
                        </div>
                      )
                    case 3:
                      return (
                        <div className={item.active ? 'prize x4 y1 active-prize' : 'prize x4 y1'} key={index}>
                          <img className='bgPicture' src={prizeBoxBG} alt="" />
                          <img className='prizePicture' src={item.pic_url} alt="" />
                        </div>
                      )
                    case 4:
                      return (
                        <div className={item.active ? 'prize x4 y2 active-prize' : 'prize x4 y2'} key={index}>
                          <img className='bgPicture' src={prizeBoxBG} alt="" />
                          <img className='prizePicture' src={item.pic_url} alt="" />
                        </div>
                      )
                    case 5:
                      return (
                        <div className={item.active ? 'prize x4 y3 active-prize' : 'prize x4 y3'} key={index}>
                          <img className='bgPicture' src={prizeBoxBG} alt="" />
                          <img className='prizePicture' src={item.pic_url} alt="" />
                        </div>
                      )
                    case 6:
                      return (
                        <div className={item.active ? 'prize x4 y4 active-prize' : 'prize x4 y4'} key={index}>
                          <img className='bgPicture' src={prizeBoxBG} alt="" />
                          <img className='prizePicture' src={item.pic_url} alt="" />
                        </div>
                      )
                    case 7:
                      return (
                        <div className={item.active ? 'prize x3 y4 active-prize' : 'prize x3 y4'} key={index}>
                          <img className='bgPicture' src={prizeBoxBG} alt="" />
                          <img className='prizePicture' src={item.pic_url} alt="" />
                        </div>
                      )
                    case 8:
                      return (
                        <div className={item.active ? 'prize x2 y4 active-prize' : 'prize x2 y4'} key={index}>
                          <img className='bgPicture' src={prizeBoxBG} alt="" />
                          <img className='prizePicture' src={item.pic_url} alt="" />
                        </div>
                      )
                    case 9:
                      return (
                        <div className={item.active ? 'prize x1 y4 active-prize' : 'prize x1 y4'} key={index}>
                          <img className='bgPicture' src={prizeBoxBG} alt="" />
                          <img className='prizePicture' src={item.pic_url} alt="" />
                        </div>
                      )
                    case 10:
                      return (
                        <div className={item.active ? 'prize x1 y3 active-prize' : 'prize x1 y3'} key={index}>
                          <img className='bgPicture' src={prizeBoxBG} alt="" />
                          <img className='prizePicture' src={item.pic_url} alt="" />
                        </div>
                      )
                    case 11:
                      return (
                        <div className={item.active ? 'prize x1 y2 active-prize' : 'prize x1 y2'} key={index}>
                          <img className='bgPicture' src={prizeBoxBG} alt="" />
                          <img className='prizePicture' src={item.pic_url} alt="" />
                        </div>
                      )
                    default:
                      return (
                        <div className={item.active ? 'prize x1 y2 active-prize' : 'prize x1 y2'} key={index}>
                          <img className='bgPicture' src={prizeBoxBG} alt="" />
                          <img className='prizePicture' src={item.pic_url} alt="" />
                        </div>
                      )
                  }
                })
              }
            </div>
          </div>
            )
          : null}
      </div>
    )
  }

  // 抽奖
  getPrizeDraw = () => {
    return new Promise((resolve, reject) => {
      promotionPrizeDrawApi({
        promotion_id: this.props.id
      }).then(res => {
        if (res.code !== 0) {
          resolve(false)
        } else {
          this.prizeList.forEach((item, index) => {
            if (item.id === res.data.id) {
              resolve(index)
            }
          })
        }
      })
    })
  }

  // 轮动动画 finishIdx:结果的index
  animationJ = (finishIdx) => {
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
          that.props.success(list[index])
          that.setState({ start: false })
        }
      }, 100)
    }
    const count = 24 + finishIdx
    deep(0, prizeList, count)
  }

  // 点击开始
  playStart = async () => {
    if (!this.props.drawStatus) {
      this.props.success(1)
      return false
    }
    // 获取结果  然后开始动画
    console.log('start')
    if (this.state.start) return false
    if (this.props.user_info.remain_award_num === 0) {
      this.props.success(0)
      return false
    }
    this.setState({
      start: true
    })
    const finishIdx = await this.getPrizeDraw()
    // 知道了结果，设置动画让其轮动多少次
    if (finishIdx === false) return false
    console.log('结果是', this.state.prizeList[finishIdx].text)
    this.animationJ(finishIdx)
  }
}

export default LuckyRolling
