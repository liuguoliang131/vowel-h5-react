import React from 'react'
import './index.scss'
function CountDown () {
  return (
    <div className='CountDown'>
      <div className="round-box">
        <div className="round-box-text1">
          距离奖池开启剩
        </div>
        <div className="round-box-text2">
          <div className="text2-hh">01</div>
          <div className="text2-colon">:</div>
          <div className="text2-MM">21</div>
          <div className="text2-colon">:</div>
          <div className="text2-ss">43</div>
        </div>
      </div>
    </div>
  )
}

export default CountDown
