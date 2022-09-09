import React, { useState } from 'react'
import Crumbs1 from '../../components/crumbs1'
import { PullToRefresh, InfiniteScroll } from 'antd-mobile'
import { sleep } from 'antd-mobile/es/utils/sleep'
import { mockRequest } from './mock-request.jsx'
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
    // console.log('停止')
    // if (loading !== 'false') return false
    // const clientHeight = e.target.clientHeight
    // const scrollHeight = e.target.scrollHeight
    // const scrollTop = e.target.scrollTop
    // console.log('视口高度clientHeight', e.target.clientHeight, '滚动块高度scrollHeight:', e.target.scrollHeight, 'scrollTop:', e.target.scrollTop, '底边距离：', scrollHeight - clientHeight - scrollTop)
    // if (scrollHeight - clientHeight - scrollTop <= 0.5) {
    //   console.log('到底了')
    //   setLoading('finish')
    // }
  }

  const [data, setData] = useState([])
  const [hasMore, setHasMore] = useState(true)
  async function loadMore () {
    const append = await mockRequest([
      { name: '第一课', id: 1 },
      { name: '第二课', id: 2 },
      { name: '第三课', id: 3 }
    ])
    setData(val => [...val, ...append])
    setHasMore(append.length > 0)
  }

  return (
    <div className='MyCourse'>
      <Crumbs1 text="我的奖品"></Crumbs1>
      <PullToRefresh
        onRefresh={async () => {
          await sleep(1000)
          setData([...data, ...data])
        }}
      >
        <div className="list">
          <div className="scroll-box">
            {
              data.map((item, index) => (
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
          </div>
          <div className="footer">
            <div className="footer-content">
              <div>提示：本次课程的有效期为</div>
              <div>2022.09.08 11:05:30-2022.09.08 11:05:30</div>
            </div>
          </div>
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
        </div>
        </PullToRefresh>
    </div>
  )
}

export default MyCourse
