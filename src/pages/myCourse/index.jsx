import React, { useState } from 'react'
import Crumbs1 from '../../components/crumbs1'
import { PullToRefresh, InfiniteScroll } from 'antd-mobile'
// import { sleep } from 'antd-mobile/es/utils/sleep'
import { mockRequest } from './mock-request.jsx'
import './index.scss'
import { courseLessonListApi } from '../../axios/api'

function MyCourse () {
  const [currentPage, setCurrentPage] = useState(1)
  const [list] = useState([
    { name: '第一课', id: 1 },
    { name: '第二课', id: 2 },
    { name: '第三课', id: 3 }
  ])
  const [dataTime, setDataTime] = useState({
    expiration_time: '2022.09.08 11:05:30',
    push_award_time: '2022.09.08 11:05:30'
  })

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

  const [data, setData] = useState([])
  const [hasMore, setHasMore] = useState(true)
  async function loadMore () {
    // try {
    //   const res = await courseLessonListApi({
    //     course_id: '1' || location.state.id,
    // page:currentPage
    //   })
    // setCurrentPage(val => val + 1)
    //   if (res.code !== 0) {
    //     setHasMore(false)
    //   }
    //   if (!res.data || !res.data.list || !res.data.list.length) {
    //     setHasMore(false)
    //   } else {
    //     setData(val => [...val, ...res.data.list])
    // setDataTime({
    //   expiration_time:res.data.expiration_time,
    //   push_award_time:res.data.push_award_time
    // })
    //   }
    // } catch (error) {
    //   setHasMore(false)
    //   throw error
    // }
    const append = await mockRequest([
      { name: '第一课', id: 1 },
      { name: '第二课', id: 2 },
      { name: '第三课', id: 3 }
    ])
    setData(val => [...val, ...append])
    setHasMore(append.length > 0)
  }

  // 下拉刷新
  const onRefresh = async () => {
    try {
      setCurrentPage(1)
      const res = await courseLessonListApi({
        course_id: '1' || location.state.id,
        page: currentPage
      })
      setCurrentPage(val => val + 1)
      console.log('res', res)
      if (!res.data || !res.data.list || !res.data.list.length) {
        setData([])
        setHasMore(false)
      } else {
        setDataTime({
          expiration_time: res.data.expiration_time,
          push_award_time: res.data.push_award_time
        })
        setData(val => [...val, ...res.data])
        setHasMore(true)
      }
    } catch (error) {
      setHasMore(false)
      throw error
    }
  }
  return (
    <div className='MyCourse'>
      <Crumbs1 text="我的奖品"></Crumbs1>
      <PullToRefresh
        onRefresh={() => onRefresh()}
      >
        <div className="list">
          <div className="scroll-box">
            {
              data.map((item, index) => (
                <div className="item" key={index}>
                  <div className="item-title">{item.title}</div>
                  <div className="item-video">
                    <video controls controlslist="nodownload noremoteplayback"
                      poster={item.img_url}
                      disablePictureInPicture
                      onPlay={(e) => handlePauseOthter(index, e)}>
                      <source src={item.video_url} type="video/mp4" />
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
