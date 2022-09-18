import React, { useState, useEffect } from 'react'
import utils from '../../utils/index'
import { useNavigate } from 'react-router-dom'
import Crumbs1 from '../../components/crumbs1'
import { PullToRefresh, InfiniteScroll, Toast } from 'antd-mobile'
import { sleep } from 'antd-mobile/es/utils/sleep'
import { mockRequest } from './mock-request.jsx'
import './index.scss'
import { promotionListApi } from '../../axios/api'

document.title = '我的活动'
function MyEvent () {
  console.log('myevent')
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState([])
  const navigate = useNavigate()
  // 查看奖品
  const handleViewPrize = (item, e) => {
    e.stopPropagation()
    navigate('/layout/myPrize', { state: { ...item }, replace: false })
  }
  // 查看活动详情
  const handleViewDetail = (item) => {
    console.log('handleViewDetail', item)
    if (item.status === 1) {
      // utils.hashPush('/layout/home', item)
      navigate('/layout/home', { state: { ...item }, replace: false })
    } else {
      Toast.show({
        content: '活动结束了'
      })
    }
  }

  const [hasMore, setHasMore] = useState(true)
  async function loadMore () {
    // const append = await mockRequest([
    //   { id: '1', status: 1 },
    //   { id: '2', status: 0 }
    // ])
    const res = await promotionListApi({
      page: currentPage
    })
    setCurrentPage(val => val + 1)
    console.log('res', res)
    if (!res.data) {
      setHasMore(false)
    } else {
      setData(val => [...val, ...res.data])
      setHasMore(true)
    }
  }
  // 下拉刷新
  const onRefresh = async () => {
    setCurrentPage(1)
    const res = await promotionListApi({
      page: 1
    })
    setCurrentPage(val => val + 1)
    console.log('res', res)
    if (!res.data) {
      setData([])
      setHasMore(false)
    } else {
      setData(val => [...res.data])
      setHasMore(true)
    }
  }
  return (
    <div className="myEvent">
      <Crumbs1 text='我的活动'></Crumbs1>
      <PullToRefresh
        onRefresh={async () => onRefresh()}
      >
      <div className="event-list">
        {
          data.map((item, index) => (
            <div className="event-item" key={index} onClick={() => handleViewDetail(item)}>
              <div className="item-row1">
                {item.title}
              </div>
              <div className="item-row2">
                {item.sub_title}
              </div>
              <div className="item-row3">
              抢购时间：{item.start_time}-{item.end_time}
              </div>
              <div className="item-row4">
                <div className="item-row4-l">
                  {
                    item.status === 1
                      ? (
                    <span className="on">活动进行中</span>
                        )
                      : (
                    <span className="off">活动已结束</span>
                        )

                  }
                </div>
                <div className="item-row4-r" onClick={(e) => handleViewPrize(item, e)}>
                  查看奖品
                </div>
              </div>
            </div>
          ))
        }
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </div>
      </PullToRefresh>
    </div>
  )
}

export default MyEvent
