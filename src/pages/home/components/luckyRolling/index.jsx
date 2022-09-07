import React from 'react'
import './index.scss'
const prizeBoxBG = require('../../../../assets/Cube_Rounded0011 10.png')
class LuckyRolling extends React.Component {
  state = {
    prizeList: [],
    start: false
  }

  getPrizes = () => {
    // 获取回来的
    const httpPrizes = [
      { active: false, sort: 0, text: 'fbl1', id: 1, path: './' },
      { active: false, sort: 1, text: 'fbl2', id: 2, path: './' },
      { active: false, sort: 2, text: 'fbl3', id: 3, path: './' },
      { active: false, sort: 3, text: 'fbl4', id: 4, path: './' },
      { active: false, sort: 4, text: 'fbl5', id: 5, path: './' },
      { active: false, sort: 5, text: 'fbl6', id: 6, path: './' },
      { active: false, sort: 6, text: 'fbl7', id: 7, path: './' },
      { active: false, sort: 7, text: 'fbl8', id: 8, path: './' },
      { active: false, sort: 8, text: 'fbl9', id: 9, path: './' },
      { active: false, sort: 9, text: 'fbl10', id: 10, path: './' },
      { active: false, sort: 10, text: 'fbl11', id: 11, path: './' },
      { active: false, sort: 11, text: 'fbl12', id: 12, path: './' }
    ]
    this.setState({
      prizeList: httpPrizes
    })
  }

  componentDidMount () {
    this.getPrizes()
  }

  render () {
    return (
      <div className="LuckyRolling">
        <div className="bg-box">
          <div className="LuckyRolling-box">
            <div className="start-btn" onClick={() => this.playStart()}></div>
            {
              this.state.prizeList.map(item => {
                switch (item.sort) {
                  case 0:
                    return (
                      <div className={item.active ? 'prize x1 y1 active-prize' : 'prize x1 y1'} key={item.id}>
                        <img className='bgPicture' src={prizeBoxBG} alt="" />
                        <img className='prizePicture' src={item.path} alt="" />
                      </div>
                    )
                  case 1:
                    return (
                        <div className={item.active ? 'prize x2 y1 active-prize' : 'prize x2 y1'} key={item.id}>
                          <img className='bgPicture' src={prizeBoxBG} alt="" />
                          <img className='prizePicture' src={item.path} alt="" />
                        </div>
                    )
                  case 2:
                    return (
                          <div className={item.active ? 'prize x3 y1 active-prize' : 'prize x3 y1'} key={item.id}>
                            <img className='bgPicture' src={prizeBoxBG} alt="" />
                            <img className='prizePicture' src={item.path} alt="" />
                          </div>
                    )
                  case 3:
                    return (
                            <div className={item.active ? 'prize x4 y1 active-prize' : 'prize x4 y1'} key={item.id}>
                              <img className='bgPicture' src={prizeBoxBG} alt="" />
                              <img className='prizePicture' src={item.path} alt="" />
                            </div>
                    )
                  case 4:
                    return (
                      <div className={item.active ? 'prize x4 y2 active-prize' : 'prize x4 y2'} key={item.id}>
                        <img className='bgPicture' src={prizeBoxBG} alt="" />
                        <img className='prizePicture' src={item.path} alt="" />
                      </div>
                    )
                  case 5:
                    return (
                      <div className={item.active ? 'prize x4 y3 active-prize' : 'prize x4 y3'} key={item.id}>
                        <img className='bgPicture' src={prizeBoxBG} alt="" />
                        <img className='prizePicture' src={item.path} alt="" />
                      </div>
                    )
                  case 6:
                    return (
                      <div className={item.active ? 'prize x4 y4 active-prize' : 'prize x4 y4'} key={item.id}>
                        <img className='bgPicture' src={prizeBoxBG} alt="" />
                        <img className='prizePicture' src={item.path} alt="" />
                      </div>
                    )
                  case 7:
                    return (
                      <div className={item.active ? 'prize x3 y4 active-prize' : 'prize x3 y4'} key={item.id}>
                        <img className='bgPicture' src={prizeBoxBG} alt="" />
                        <img className='prizePicture' src={item.path} alt="" />
                      </div>
                    )
                  case 8:
                    return (
                      <div className={item.active ? 'prize x2 y4 active-prize' : 'prize x2 y4'} key={item.id}>
                        <img className='bgPicture' src={prizeBoxBG} alt="" />
                        <img className='prizePicture' src={item.path} alt="" />
                      </div>
                    )
                  case 9:
                    return (
                      <div className={item.active ? 'prize x1 y4 active-prize' : 'prize x1 y4'} key={item.id}>
                        <img className='bgPicture' src={prizeBoxBG} alt="" />
                        <img className='prizePicture' src={item.path} alt="" />
                      </div>
                    )
                  case 10:
                    return (
                      <div className={item.active ? 'prize x1 y3 active-prize' : 'prize x1 y3'} key={item.id}>
                        <img className='bgPicture' src={prizeBoxBG} alt="" />
                        <img className='prizePicture' src={item.path} alt="" />
                      </div>
                    )
                  case 11:
                    return (
                      <div className={item.active ? 'prize x1 y2 active-prize' : 'prize x1 y2'} key={item.id}>
                        <img className='bgPicture' src={prizeBoxBG} alt="" />
                        <img className='prizePicture' src={item.path} alt="" />
                      </div>
                    )
                  default:
                    return (
                      <div className={item.active ? 'prize x1 y2 active-prize' : 'prize x1 y2'} key={item.id}>
                        <img className='bgPicture' src={prizeBoxBG} alt="" />
                        <img className='prizePicture' src={item.path} alt="" />
                      </div>
                    )
                }
              })
            }
          </div>
        </div>
      </div>
    )
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
          alert(`您抽中了${list[index].text}`)
          that.setState({ start: false })
        }
      }, 100)
    }
    const count = 24 + finishIdx
    deep(0, prizeList, count)
  }

  // 点击开始
  playStart = () => {
    // 获取结果  然后开始动画
    console.log('start')
    if (this.state.start) return false
    this.setState({
      start: true
    })
    // 知道了结果，设置动画让其轮动多少次
    const finishIdx = 11
    console.log('结果是', this.state.prizeList[finishIdx].text)
    this.animationJ(finishIdx)
  }
}

export default LuckyRolling
