import React, { Component } from 'react'
import { Toast } from 'antd-mobile'
import './index.scss'
const coverIMG = require('../../../../assets/Frame 77.png')
const playIMG = require('../../../../assets/Frame 1000006041.png')
const suspendIMG = require('../../../../assets/Frame 1000006074.png')
let audio = new Audio()
audio.autoplay = true
audio.onplay = (e) => {
  console.log('play...')
}
const song = require('../../../../assets/stone.mp3')
let timer = null
class AudioPlayer extends Component {
  state = {
    isPlay: false
  }

  initPlayer = () => {

  }

  handlePlay = () => {
    if (!audio.readyState) {
      return Toast.show({
        content: '歌曲加载中，请稍等'
      })
    }
    console.log('audio', audio.paused)
    this.setState({
      isPlay: audio.paused
    })
  }

  render () {
    return (
      <div className="audioPlayer">
        <img src={this.props.music_pic} alt="" className='cover' />
        <div className="title">{this.props.music_name}</div>
        <div className="playbtn" onClick={() => this.handlePlay()}>
          {
            this.state.isPlay ? (<img src={suspendIMG} alt="" />) : (<img src={playIMG} alt="" />)
          }
        </div>
      </div>
    )
  }

  componentDidMount () {
    if (this.props.music_url) {
      audio.src = this.props.music_url
    }

    console.log('this.props.music_url', this.props.music_url)
  }

  componentDidUpdate (prevProps, prevState) {
    // console.log('audioPlayer update', this.props)

    if (this.state.isPlay !== prevState.isPlay) {
      clearTimeout(timer)
      if (this.state.isPlay) {
        audio.play()
        timer = setTimeout(() => {
          audio.currentTime = 0
          this.setState({
            isPlay: false
          })
        }, 1000 * (audio.duration - audio.currentTime))
      } else {
        audio.pause()
      }
    }
  }

  componentWillUnmount () {
    if (timer) {
      clearTimeout(timer)
    }
    if (audio) {
      audio.pause()
      audio = null
    }
  }
}

export default AudioPlayer
