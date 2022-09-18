import React from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import utils from '../../utils'
const backIMG = require('../../assets/back.png')
const shareIMG = require('../../assets/share.png')
function Crumbs (props) {
  const navigate = useNavigate()
  const onBack = () => {
    if (window.history.state === 0) {
      window.close()
    } else {
      navigate(-1)
    }
  }
  const handleGoPoster = () => {
    props.to()
  }
  return (
    <>
      <div className="crumbs-slot"></div>
      <div className='crumbs'>
        <div className="crumbs-l"><img src={backIMG} alt="" onClick={() => onBack()} /></div>
        {
          props.buttonHide
            ? (
            <div className="crumbs-r"></div>
              )
            : (
            <div className="crumbs-r">
          <div className="crumbs-r-btn1" onClick={() => props.handleGoMyPrize()}>我的奖品</div>
          <div className="crumbs-r-btn2"><img src={shareIMG} alt="" onClick={() => handleGoPoster()} /></div>
        </div>
              )
        }

      </div>
    </>
  )
}

export default Crumbs
