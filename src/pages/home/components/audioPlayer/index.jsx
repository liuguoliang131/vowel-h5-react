import React, { Component } from 'react'
import { Toast } from 'antd-mobile'
import './index.scss'
const coverIMG = require('../../../../assets/Frame 77.png')
const playIMG = require('../../../../assets/Frame 1000006041.png')
const suspendIMG = require('../../../../assets/Frame 1000006074.png')
const audio = new Audio()
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
      return Toast({
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
        <img src={coverIMG} alt="" className='cover' />
        <div className="title">《念君安》立即试听</div>
        <div className="playbtn" onClick={() => this.handlePlay()}>
          {
            this.state.isPlay ? (<img src={suspendIMG} alt="" />) : (<img src={playIMG} alt="" />)
          }
        </div>
      </div>
    )
  }

  componentDidMount () {
    audio.src = song
  }

  componentDidUpdate (prevProps, prevState) {
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
}

export default AudioPlayer
