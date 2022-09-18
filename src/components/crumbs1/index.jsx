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
  const CrumbsRender = () => {
    let com = null
    utils.ownApp(() => {

    }, () => {
      com = (
        <>
        <div className="crumbs1-slot"></div>
        <div className="crumbs1">
          <div className="content">
          <img src={backIMG} alt="" className="back" onClick={() => onBack()} />
            <span>{props.text}</span>
          </div>
        </div>
        </>
      )
    })
    return com
  }
  return (
    CrumbsRender()

  )
}

export default Crumbs1
