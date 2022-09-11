import React, { Component, createRef } from 'react'
class SliderVertifyVw extends Component {
  state = {

  }

  SliderVertifyVw = createRef()
  // 获取父盒子宽度
  fitWith = () => {
    console.log('ref', this.SliderVertifyVw)
  }

  render () {
    return (
      <div ref={SliderVertifyVw} className="SliderVertifyVw">
        <div className="bg-img">
          <div className="start">1</div>
          <div className="end">2</div>
        </div>
        <div className="slide-content">
          <div className="slide-btn">滑动</div>
        </div>
      </div>
    )
  }

  // 先获取父盒子多宽
  componentDidMount () {
    this.fitWith()
  }
  // 首先先确认1px等于多少vw 然后
}
