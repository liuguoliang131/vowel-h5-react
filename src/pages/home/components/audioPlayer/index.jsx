import React, { useState, useEffect, useRef } from 'react'
import { Toast } from 'antd-mobile'
import './index.scss'
const coverIMG = require('../../../../assets/Frame 77.png')
const playIMG = require('../../../../assets/Frame 1000006041.png')
const suspendIMG = require('../../../../assets/Frame 1000006074.png')

const song = require('../../../../assets/stone.mp3')
// let timer = null
function AudioPlayer (props) {
  const [isPlay, setIsPlay] = useState(false)
  const audioRef = useRef()

  // 播放
  const onPlay = (e) => {
    console.log('播放', e)
    setIsPlay(true)
  }
  const onPause = (e) => {
    console.log('暂停', e)
    setIsPlay(false)
  }
  const handlePlay = () => {
    console.log('handlePlay', audioRef)
    if (!audioRef.current) return false
    // if (!audioRef.current.readyState) {
    //   return Toast.show({
    //     content: '歌曲加载中，请稍等'
    //   })
    // }
    audioRef.current.paused ? audioRef.current.play() : audioRef.current.pause()
  }
  useEffect(() => {

  }, [props])
  useEffect(() => {
    console.log('audioRef', audioRef)
    return () => {
      audioRef.current.pause()
    }
  }, [])
  useEffect(() => {
    audioRef.current.setAttribute('playsinline', true)
    audioRef.current.setAttribute('webkit-playsinline', true)
  }, [audioRef])
  return (
    <div className="audioPlayer">
      <audio ref={audioRef} style={{ width: 0, position: 'absolute' }} src={props.music_url} autoPlay={true} onPlay={(e) => onPlay(e)} onPause={(e) => onPause(e)}></audio>
      <img src={props.music_pic} alt="" className='cover' />
      <div className="title">{props.music_name}</div>
      <div className="playbtn" onClick={() => handlePlay()}>
        {
          isPlay ? (<img src={suspendIMG} alt="" />) : (<img src={playIMG} alt="" />)
        }
      </div>
    </div>
  )
}

export default AudioPlayer
