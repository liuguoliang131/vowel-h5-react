import React from 'react'
import './index.scss'
const backIMG = require('../../assets/back.png')
const shareIMG = require('../../assets/share.png')
function Crumbs () {
  return (
    <>
      <div className="crumbs-slot"></div>
      <div className='crumbs'>
        <div className="crumbs-l"><img src={backIMG} alt="" /></div>
        <div className="crumbs-r">
          <div className="crumbs-r-btn1">我的奖品</div>
          <div className="crumbs-r-btn2"><img src={shareIMG} alt="" /></div>
        </div>
      </div>
    </>
  )
}

export default Crumbs
