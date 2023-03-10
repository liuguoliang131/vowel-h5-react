import React, { useEffect, useState } from 'react'
import Crumbs1 from '../../components/crumbs1'
import { PullToRefresh, InfiniteScroll, DotLoading } from 'antd-mobile'
import { useLocation } from 'react-router-dom'
// import { sleep } from 'antd-mobile/es/utils/sleep'
// import { mockRequest } from './mock-request.jsx'
import './index.scss'
import { courseLessonListApi } from '../../axios/api'
import utils from '../../utils'
function MyCourse () {
  const location = useLocation()
  const [currentPage, setCurrentPage] = useState(1)
  const [list] = useState([

  ])
  const [dataTime, setDataTime] = useState({
    expiration_time: '',
    push_award_time: ''
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
  const hashParams = utils.getHashQuery()
  const [data, setData] = useState([])
  const [hasMore, setHasMore] = useState(true)
  async function loadMore () {
    try {
      const res = await courseLessonListApi({
        course_id: location.state.course_id || hashParams.query.course_id,
        page: currentPage
      })
      // const res = await mockRequest()
      setCurrentPage(val => val + 1)
      if (res.code !== 0) {
        setHasMore(false)
      }
      if (!res.data || !res.data.list || !res.data.list.length) {
        setHasMore(false)
      } else {
        setData(val => [...val, ...res.data.list])
        const startTime = utils.getTimeData(res.data.expiration_time * 1000)
        const endTime = utils.getTimeData(res.data.push_award_time * 1000)
        const expiration_time = `${startTime.y}.${startTime.mon}.${startTime.dd} ${startTime.hh}:${startTime.MM}:${startTime.ss}`
        const push_award_time = `${endTime.y}.${endTime.mon}.${endTime.dd} ${endTime.hh}:${endTime.MM}:${endTime.ss}`
        setDataTime({
          expiration_time,
          push_award_time
        })
        setHasMore(res.data.list.length > 0)
      }
    } catch (error) {
      setHasMore(false)
      throw error
    }
    // const append = await mockRequest([
    //   { name: '第一课', id: 1 },
    //   { name: '第二课', id: 2 },
    //   { name: '第三课', id: 3 }
    // ])
    // setData(val => [...val, ...append])
    // setHasMore(append.length > 0)
  }

  // 下拉刷新
  const onRefresh = async () => {
    try {
      setCurrentPage(1)
      const res = await courseLessonListApi({
        course_id: location.state.course_id || hashParams.query.course_id,
        page: 1
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
        setData(val => [...res.data.list])
        setHasMore(res.data.list.length > 0)
      }
    } catch (error) {
      setHasMore(false)
      throw error
    }
  }
  return (
    <div className='MyCourse'>
      {/* <Crumbs1 text="我的课程"></Crumbs1> */}
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
                    <video playsinline webkit-playsinline controls controlslist="nodownload noremoteplayback"
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
          {
            dataTime.expiration_time
              ? (
              <div className="footer">
            <div className="footer-content">
              <div>提示：本次课程的有效期为</div>
              <div>{dataTime.push_award_time}-{dataTime.expiration_time}</div>
            </div>
          </div>
                )
              : null
          }

          <InfiniteScroll loadMore={loadMore} hasMore={hasMore} >
          {hasMore
            ? (
          <>
            <span>加载中</span>
            <DotLoading />
          </>
              )
            : data.length
              ? (
              <span>没有更多了</span>
                )
              : (
                <div className="empty-content">
                  <div className="empty-center">
                    <img src={require('../../assets/empty-icon.png')} alt="" />
                    <span>暂无课程</span>
                  </div>
                </div>
                )}
          </InfiniteScroll>
        </div>
        </PullToRefresh>
    </div>
  )
}

export default MyCourse
