import React from 'react'
import './index.scss'
import { useLocation } from 'react-router-dom'
const row1IMG = require('../../../../assets/Frame 1000006094@2x.png')
const row2IMG = require('../../../../assets/Frame 1000006078-1.png')
const row3IMG = require('../../../../assets/Rectangle 40961.png')
function TaskList () {
  const location = useLocation()
  console.log('location', location)
  return (
    <div className="TaskList">
      <div className="TaskList-content">
        <div className="row">
          <div className="col1">
            <img src={row1IMG} alt="" />
          </div>
          <div className="col2">
            <div className="col2-1">邀请新用户注册(0/3)</div>
            <div className="col2-2">每邀请3位，抽奖机会<span className='col2-2-n'>+1</span></div>
          </div>
          <div className="col3">
            <div className="col3-1">
              <img src={row3IMG} alt="" />
              <div>立即分享</div>
            </div>
            <div className="col3-2">已获得<span style={{ color: 'rgba(252, 23, 188, 1)' }}>1</span>次抽奖机会</div>
          </div>
        </div>
        <div className="row">
          <div className="col1">
            <img src={row2IMG} alt="" />
          </div>
          <div className="col2">
            <div className="col2-1">购买成功</div>
            <div className="col2-2">抽奖机会<span className='col2-2-n'>+3</span></div>
          </div>
          <div className="col3">
            <div className="col3-1">
              <img src={row3IMG} alt="" />
              <div>{location.pathname === '/layout/home' ? '立即购买' : '立即预购'}</div>
            </div>
            <div className="col3-2">已获得<span style={{ color: 'rgba(252, 23, 188, 1)' }}>1</span>次抽奖机会</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskList
