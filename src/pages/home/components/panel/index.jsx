import React, { Component, createRef } from 'react'
import { promotionDrawCycleListApi } from '../../../../axios/api'
import './index.scss'
let timer = null
class Panel extends Component {
  viewRef = createRef()
  state = {
    data: []
  }

  getData = async () => {
    const res = await promotionDrawCycleListApi({
      promotion_id: this.props.id
    })
    if (res.code !== 0) {
      return false
    }
    this.setState({
      data: res.data
    })
  }

  // 轮播动画
  startScroll = async () => {
    console.log('viewRef', this.viewRef)
    const theScroll = this.viewRef.current.children[0]
    const clientHeight = this.viewRef.current.clientHeight
    const scrollHeight = this.viewRef.current.scrollHeight
    const scrollTop = this.viewRef.current.scrollTop
    console.log('视口高度clientHeight', this.viewRef.current.clientHeight, '滚动块高度scrollHeight:', this.viewRef.current.scrollHeight, 'scrollTop:', this.viewRef.current.scrollTop, '底边距离：', scrollHeight - clientHeight - scrollTop)
    clearInterval(timer)
    timer = setInterval(() => {
      // console.log('父盒子上距离', this.viewRef.current)
      // console.log('1', theScroll.offsetTop)
      if (-1 * theScroll.offsetTop < theScroll.offsetHeight - clientHeight) {
        // console.log('1', theScroll.offsetTop)
        theScroll.style.transition = 'all 0.5s'
        theScroll.style.top = (theScroll.offsetTop - clientHeight) + 'px'
      } else {
        // console.log('2')
        theScroll.style.transition = 'none'
        theScroll.style.top = '0px'
        // theScroll.style.transition = 'all 0.5s'
        // theScroll.style.top = -clientHeight + 'px'
      }
    }, 5000)
  }

  componentDidMount () {
    this.getData()
  }

  componentDidUpdate () {
    this.startScroll()
  }

  componentWillUnmount () {
    clearTimeout(timer)
    timer = null
  }

  render () {
    return (
      <div className="panel">
        <div className="panel-content" ref={this.viewRef}>
          <div className="panel-scroll">
          {this.state.data.map((item, index) => (
            <div className="panel-item" key={index}>
              {item}
            </div>
          ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Panel
