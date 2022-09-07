import React from 'react'
import './index.scss'
const coverIMG = require('../../../../assets/Frame 77.png')
const playIMG = require('../../../../assets/Frame 1000006041.png')
// const suspendIMG = require('../../../../assets/Frame 1000006074.png')
function AudioPlayer () {
  return (
    <div className="audioPlayer">
      <img src={coverIMG} alt="" className='cover' />
      <div className="title">《念君安》立即试听</div>
      <div className="playbtn">
        <img src={playIMG} alt="" />
      </div>
    </div>
  )
}

export default AudioPlayer
