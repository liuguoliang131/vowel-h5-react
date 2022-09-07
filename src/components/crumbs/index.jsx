import React from 'react'
import { useNavigate } from 'react-router'
import './index.scss'
const backIMG = require('../../assets/back.png')
const shareIMG = require('../../assets/share.png')
function Crumbs () {
  const navigate = useNavigate()
  const onBack = () => {
    if (window.history.state === 0) {
      window.close()
    } else {
      navigate(-1)
    }
  }
  return (
    <>
      <div className="crumbs-slot"></div>
      <div className='crumbs'>
        <div className="crumbs-l"><img src={backIMG} alt="" onClick={() => onBack()} /></div>
        <div className="crumbs-r">
          <div className="crumbs-r-btn1">我的奖品</div>
          <div className="crumbs-r-btn2"><img src={shareIMG} alt="" /></div>
        </div>
      </div>
    </>
  )
}

export default Crumbs
