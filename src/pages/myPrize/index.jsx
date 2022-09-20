import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PullToRefresh, InfiniteScroll, DotLoading, Toast } from 'antd-mobile'
import copy from 'copy-to-clipboard'
import utils from '../../utils'
import { sleep } from 'antd-mobile/es/utils/sleep'
import { mockRequest } from './mock-request.jsx'
import './index.scss'
import Crumbs1 from '../../components/crumbs1'
import { promotionPrizeListApi } from '../../axios/api'

function MyPrize () {
  const location = useLocation()
  const navigate = useNavigate()
  console.log('location', location)
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState([
    // { type: '1', id: 1 },
    // { type: '2', id: 2 },
    // { type: '3', id: 3 },
    // { type: '4', id: 4 },
    // { type: '5', id: 5 }
  ])
  const [qrcode, setQrcode] = useState('')
  const handleGo = (item) => {
    if (item.type === 4) {
      navigate('/layout/myCourse', { state: { ...item }, replace: false })
    } else if (item.type === 2) {
      // 跳转到原生app查看奇点页

      utils.openAppPage({ page: 'myScorePage', params: { ...item }, isNeedLogin: true })
    }
  }

  const handleCopy = (item) => {
    copy(item.batch_no)
    Toast.show({
      icon: 'success',
      content: '复制成功'
    })
  }

  const [hasMore, setHasMore] = useState(true)
  async function loadMore () {
    // setData([
    //   { type: 1, id: 1 },
    //   { type: 2, id: 2 },
    //   { type: 3, id: 3, batch_no: '121212412124' },
    //   { type: 4, id: 4 },
    //   { type: 4, id: 5 }
    // ])
    // setHasMore(false)
    // return false
    try {
      const res = await promotionPrizeListApi({
        promotion_id: location.state.id,
        page: currentPage
      })
      setCurrentPage(val => val + 1)
      console.log('res', res)
      if (res.code !== 0) {
        setHasMore(false)
        return false
      }
      if (!res.data || !res.data.list || !res.data.list.length) {
        setHasMore(false)
      } else {
        setData(val => [...val, ...res.data.list])
        setQrcode(res.data.customer_service || '')
        setHasMore(res.data.list.length > 0)
      }
    } catch (error) {
      Toast.show({
        content: error.message
      })
      setHasMore(false)
      throw error
    }
  }
  // 下拉刷新
  const onRefresh = async () => {
    try {
      setCurrentPage(1)
      const res = await promotionPrizeListApi({
        promotion_id: location.state.id,
        page: 1
      })
      setCurrentPage(val => val + 1)
      console.log('res', res)
      if (!res.data || !res.data.list || !res.data.list.length) {
        setData([])
        setHasMore(false)
      } else {
        setQrcode(res.data.customer_service || '')
        setData(val => [...res.data.list])
        setHasMore(true)
      }
    } catch (error) {
      Toast.show({
        content: error.message
      })
      setHasMore(false)
      throw error
    }
  }
  const formateTime = (date) => {
    const { y, mon, dd, hh, MM, ss } = utils.getTimeData(date)
    const timeStr = `${y}.${mon}.${dd} ${hh}:${MM}:${ss}`
    return timeStr
  }
  const handleSaveImg = () => {
    utils.saveUrlImage(qrcode)
  }
  return (
    <div className="myPrize">
      {/* <Crumbs1 text="我的奖品"></Crumbs1> */}
      <PullToRefresh
        onRefresh={async () => onRefresh()}
      >
      <div className="list">
        {
          data.map((item, index) => {
            if (item.type === 1) {
              // 实物
              return (
                <div className="item type1" key={index}>
                  <div className="item-row1">
                  {item.title}
                  <span>×1份</span>
                  </div>
                  <div className="item-row2">
                    {item.note}
                  </div>
                  <div className='item-row3'>
                    <img src={item.img_url} alt="" />
                  </div>
                </div>
              )
            } else if (item.type === 3) {
              // 卡券
              return (
                <div className="item type2" key={index}>
                  <div className="item-row1">
                  {item.title}
                  <span>×1份</span>
                  </div>
                  <div className="item-row2">
                  {item.note}
                  </div>
                  <div className='item-row3'>
                    <img src={item.img_url} alt="" />
                  </div>
                  <div className="item-row4">
                    <div className="item-row4-l copytxt">
                    {item.batch_no}
                    </div>
                    <div className="item-row4-r" onClick={() => handleCopy(item)}>
                      复制
                    </div>
                  </div>
                </div>
              )
            } else if (item.type === 2) {
              // 获得奇点
              return (
                <div className="item type4" key={index}>
                  <div className="item-row1">
                  {item.title}
                  <span>×{item.integral_num}份</span>
                  </div>
                  <div className="item-row2">
                  {item.note}
                  </div>
                  {/* <div className='type4-row3'>
                    <img src={item.img_url} alt="" />
                  </div> */}
                  <div className="type4-row4">
                    <span onClick={() => handleGo(item)}>立即查看</span>
                  </div>
                </div>
              )
            } else if (item.type === 4) {
              return (
                <div className="item type5" key={index}>
                  <div className="item-row1">
                  {item.title}
                  <span>×1份</span>
                  </div>
                  <div className="item-row2">
                  {item.note}
                  </div>
                  <div className="type5-row3">
                    <span onClick={() => handleGo(item)}>
                      <i>
                        <img src={require('../../assets/play-icon.png')} alt="" />
                      </i>
                      立即观看课程
                    </span>
                  </div>
                  <div className="type5-row4">
                    {
                      '有效期为：' + formateTime(item.push_award_time * 1000) + '-' + formateTime(item.expiration_time * 1000)
                    }
                  </div>
                </div>
              )
            } else {
              return null
              // 免单
              // return (
              //   <div className="item type3" key={index}>
              //     <div className="item-row1">
              //     获得免单奖励
              //     <span>×1份</span>
              //     </div>
              //     <div className="item-row2">
              //     联系客服登记领取
              //     </div>
              //     <div className='item-row3'>
              //       <img src="asdasd" alt="" />
              //     </div>
              //   </div>
              // )
            }
          })

        }
        {
          qrcode
            ? (<div className="footer">
                <div className="footer-tip">
                  微信扫码添加客服
                </div>
                <img src={qrcode} alt="" className='qrcode' />
                <div className='save-button' onClick={() => handleSaveImg()}>保存客服微信二维码</div>
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
                    <span>没有抽到奖品，再接再厉！</span>
                  </div>
                </div>
              )}
        </InfiniteScroll>
      </div>
      </PullToRefresh>
    </div>
  )
}

export default MyPrize
