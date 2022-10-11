import React from 'react'
import './index.scss'
// import widthNavigate from '../../../../components/withNavigate'
import Panel from '../panel'
let timer = null
class CountDown extends React.Component {
  state = {
    data: {
      hh: '00',
      MM: '00',
      ss: '00'
    }
  }

  // 活动未开始 开始计时 到活动开始后停止
  initTimeCount = () => {
    // const startTime = new Date('2022-09-14 22:53:00').getTime()
    const nowTime = new Date().getTime()

    if (!this.props.draw_start_time) return false
    let count = this.props.draw_start_time - nowTime
    // if (count <= 0) {
    //   // // 跳转
    //   // this.props.to('/layout/home', { state: { token: 'giao' }, replace: false })
    //   this.setState({
    //     panelShow: true
    //   })
    //   return false
    // }
    if (timer) {
      return false
    }
    timer = setInterval(() => {
      count -= 1000
      if (count <= 0) {
        clearTimeout(timer)
        timer = null
        // 开启活动进行中的计时器
        this.initTimeCountIng()
        return false
      }
      let hh = parseInt(count / 1000 / 60 / 60)
      let MM = parseInt(count / 1000 / 60 % 60)
      let ss = parseInt(count / 1000 % 60)
      // console.log('hh:MM:ss', hh, MM, ss)
      hh = hh < 10 ? `0${hh}` : hh
      MM = MM < 10 ? `0${MM}` : MM
      ss = ss < 10 ? `0${ss}` : ss
      this.setState({
        data: {
          hh,
          MM,
          ss
        }
      })
    }, 1000)
  }

  // 活动进行中 开始计时 到活动结束后停止
  initTimeCountIng = () => {
    // const startTime = new Date('2022-09-14 22:53:00').getTime()
    const nowTime = new Date().getTime()

    if (!this.props.draw_end_time) return false
    let count = this.props.draw_end_time - nowTime

    if (timer) {
      return false
    }
    timer = setInterval(() => {
      count -= 1000
      if (count <= 0) {
        clearTimeout(timer)
        timer = null
        return false
      }
      let hh = parseInt(count / 1000 / 60 / 60)
      let MM = parseInt(count / 1000 / 60 % 60)
      let ss = parseInt(count / 1000 % 60)
      // console.log('hh:MM:ss', hh, MM, ss)
      hh = hh < 10 ? `0${hh}` : hh
      MM = MM < 10 ? `0${MM}` : MM
      ss = ss < 10 ? `0${ss}` : ss
      this.setState({
        data: {
          hh,
          MM,
          ss
        }
      })
    }, 1000)
  }

  componentDidMount () {
    this.initTimeCount()
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps !== this.props) {
      this.initTimeCount()
    }
  }

  renderCountDown () {
    if (this.props.drawStatus === 0) {
      return (
        <div className='CountDown'>
          <div className="round-box">
            <div className="round-box-text1">
              距离开售
            </div>
            <div className="round-box-text2">
              <div className="text2-hh">{this.state.data.hh}</div>
              <div className="text2-colon">:</div>
              <div className="text2-MM">{this.state.data.MM}</div>
              <div className="text2-colon">:</div>
              <div className="text2-ss">{this.state.data.ss}</div>
            </div>
          </div>
        </div>
      )
    } else if (this.props.drawStatus === 1) {
      return (
        <div className='CountDown'>
          <div className="round-box">
            <div className="round-box-text1">
              距离结束
            </div>
            <div className="round-box-text2">
              <div className="text2-hh">{this.state.data.hh}</div>
              <div className="text2-colon">:</div>
              <div className="text2-MM">{this.state.data.MM}</div>
              <div className="text2-colon">:</div>
              <div className="text2-ss">{this.state.data.ss}</div>
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  render () {
    return (
      <>
      {
        this.props.draw_start_time
          ? (
              this.renderCountDown()
            )
          : null
      }
      </>

    )
  }

  componentWillUnmount () {
    clearTimeout(timer)
    timer = null
  }
}
// const ComponentCountDown = widthNavigate(CountDown)
export default CountDown
