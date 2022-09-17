import React from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import utils from '../../utils/index'
const backIMG = require('../../assets/back.png')
function Crumbs1 (props) {
  const navigate = useNavigate()
  const onBack = () => {
    if (window.history.state === 0) {
      window.close()
    } else {
      navigate(-1)
    }
  }
  const BackBtnRender = () => {
    let com = null
    utils.ownApp(() => {

    }, () => {
      com = (
        <img src={backIMG} alt="" className="back" onClick={() => onBack()} />
      )
    })
    return com
  }
  return (
    <>
    <div className="crumbs1-slot"></div>
    <div className="crumbs1">
      <div className="content">
        <BackBtnRender></BackBtnRender>
        <span>{props.text}</span>
      </div>
    </div>
    </>
  )
}

export default Crumbs1
