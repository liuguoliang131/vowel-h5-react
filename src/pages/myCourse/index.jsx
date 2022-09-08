import React, { useState } from 'react'
import Crumbs1 from '../../components/crumbs1'
// import { Space } from 'antd-mobile'
// import { LoopOutline } from 'antd-mobile-icons'
import './index.scss'
function MyCourse () {
  const [list] = useState([
    { name: '第一课', id: 1 },
    { name: '第二课', id: 2 },
    { name: '第三课', id: 3 }
  ])
  const [loading, setLoading] = useState('false')
  // 播放按钮
  const handlePauseOthter = (index, e) => {
    console.log(index, e)
    const videoDomList = document.getElementsByTagName('video')
    console.log('videoDomList', videoDomList)
    for (let i = 0; i < videoDomList.length; i++) {
      const item = videoDomList[i]
      if (index !== i) {
        item.pause()
      }
    }
  }
  // 滚动事件
  const handleScroll = (e) => {
    console.log('停止')
    if (loading !== 'false') return false
    const clientHeight = e.target.clientHeight
    const scrollHeight = e.target.scrollHeight
    const scrollTop = e.target.scrollTop
    console.log('视口高度clientHeight', e.target.clientHeight, '滚动块高度scrollHeight:', e.target.scrollHeight, 'scrollTop:', e.target.scrollTop, '底边距离：', scrollHeight - clientHeight - scrollTop)
    if (scrollHeight - clientHeight - scrollTop <= 0.5) {
      console.log('到底了')
      setLoading('finish')
    }
  }
  return (
    <div className='MyCourse'>
      <Crumbs1 text="我的奖品"></Crumbs1>
      <div className="list" onScroll={(e) => handleScroll(e)}>
        <div className="scroll-box">
          {
            list.map((item, index) => (
              <div className="item" key={index}>
                <div className="item-title">尤克里里线上课程第一讲</div>
                <div className="item-video">
                  <video controls controlslist="nodownload noremoteplayback"
                    disablePictureInPicture
                    onPlay={(e) => handlePauseOthter(index, e)}>
                    <source src={require('../../assets/mda-kg0bxye40aq22ri6.mp4')} type="video/mp4" />
                  </video>
                </div>
              </div>
            ))
          }
          {
            loading === 'true'
              ? (
            <div className="scroll-bottom">
              {/* <span className='rotate'>

              </span> */}
              <span>加载中</span>
            </div>
                )
              : loading === 'finish'
                ? (
              <div className="scroll-bottom">
                <span>到底了</span>
              </div>
                  )
                : null
          }
        </div>
        <div className="footer">
          <div className="footer-content">
            <div>提示：本次课程的有效期为</div>
            <div>2022.09.08 11:05:30-2022.09.08 11:05:30</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyCourse
