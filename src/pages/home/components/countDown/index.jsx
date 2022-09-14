import React from 'react'
import './index.scss'
import widthNavigate from '../../../../components/withNavigate'
let timer = null
class CountDown extends React.Component {
  state = {
    data: {
      hh: '00',
      MM: '00',
      ss: '00'
    }
  }

  initTimeCount = () => {
    console.log('props', this.props)
    const startTime = new Date('2022-09-14 22:53:00').getTime()
    const nowTime = new Date().getTime()
    console.log('count-down', startTime - nowTime)
    let count = startTime - nowTime
    if (count <= 0) {
      // 跳转
      this.props.to('/layout/home', { state: { token: 'giao' }, replace: false })
      return false
    }
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setInterval(() => {
      count -= 1000
      if (count <= 0) {
        clearTimeout(timer)
        timer = null
        this.props.to('/layout/home',
          { state: { token: 'giao' }, replace: false })
        return false
      }
      let hh = parseInt(count / 1000 / 60 / 60)
      let MM = parseInt(count / 1000 / 60 % 60)
      let ss = parseInt(count / 1000 % 60)
      console.log('hh:MM:ss', hh, MM, ss)
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

  render () {
    return (
      <div className='CountDown'>
        <div className="round-box">
          <div className="round-box-text1">
            距离奖池开启剩
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
  }

  componentWillUnmount () {
    clearTimeout(timer)
    timer = null
  }
}
const ComponentCountDown = widthNavigate(CountDown)
export default ComponentCountDown
