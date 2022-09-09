import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { PullToRefresh, InfiniteScroll } from 'antd-mobile'
import { sleep } from 'antd-mobile/es/utils/sleep'
import { mockRequest } from './mock-request.jsx'
import './index.scss'
import Crumbs1 from '../../components/crumbs1'
function MyPrize () {
  const location = useLocation()
  const navigate = useNavigate()
  console.log('location', location)
  const [data, setData] = useState([
    { type: '1', id: 1 },
    { type: '2', id: 2 },
    { type: '3', id: 3 },
    { type: '4', id: 4 },
    { type: '5', id: 5 }
  ])
  const handleGo = (item) => {
    if (item.type === '5') {
      navigate('/layout/myCourse', { state: { ...item }, replace: false })
    }
  }

  const [hasMore, setHasMore] = useState(true)
  async function loadMore () {
    const append = await mockRequest([
      { type: '11', id: 24 },
      { type: '51', id: 25 }
    ])
    setData(val => [...val, ...append])
    setHasMore(append.length > 0)
  }

  return (
    <div className="myPrize">
      <Crumbs1 text="我的奖品"></Crumbs1>
      <PullToRefresh
        onRefresh={async () => {
          await sleep(1000)
          setData([...data, ...data])
        }}
      >
      <div className="list">
        {
          data.map((item, index) => {
            if (item.type === '1') {
              // 实物
              return (
                <div className="item type1" key={index}>
                  <div className="item-row1">
                  获得苹果手表S7
                  <span>×1份</span>
                  </div>
                  <div className="item-row2">
                    联系客服登记领取
                  </div>
                  <div className='item-row3'>
                    <img src="asdasd" alt="" />
                  </div>
                </div>
              )
            } else if (item.type === '2') {
              return (
                <div className="item type2" key={index}>
                  <div className="item-row1">
                  获得一路听天下读书年卡
                  <span>×1份</span>
                  </div>
                  <div className="item-row2">
                  复制以下兑换码前往“一路听天下”APP内兑换
                  </div>
                  <div className='item-row3'>
                    <img src="asdasd" alt="" />
                  </div>
                  <div className="item-row4">
                    <div className="item-row4-l">
                    AFHK3980TG5SGML417
                    </div>
                    <div className="item-row4-r">
                      复制
                    </div>
                  </div>
                </div>
              )
            } else if (item.type === '3') {
              // 免单
              return (
                <div className="item type3" key={index}>
                  <div className="item-row1">
                  获得免单奖励
                  <span>×1份</span>
                  </div>
                  <div className="item-row2">
                  联系客服登记领取
                  </div>
                  <div className='item-row3'>
                    <img src="asdasd" alt="" />
                  </div>
                </div>
              )
            } else if (item.type === '4') {
              // 获得奇点
              return (
                <div className="item type4" key={index}>
                  <div className="item-row1">
                  获得300奇点
                  <span>×1份</span>
                  </div>
                  <div className="item-row2">
                  前往“我的”-“资产管理、奇点”中查看
                  </div>
                  <div className='type4-row3'>
                    <img src={require('../../assets/Frame 1000006181.png')} alt="" />
                  </div>
                  <div className="type4-row4">
                    <span>立即查看</span>
                  </div>
                </div>
              )
            } else {
              return (
                <div className="item type5" key={index}>
                  <div className="item-row1">
                  获得元音符定制尤克里里线上课程
                  <span>×1份</span>
                  </div>
                  <div className="item-row2">
                  点击下方按钮观看课程
                  </div>
                  <div className="type5-row3">
                    <span onClick={() => handleGo({ type: '5' })}>
                      <i>
                        <img src={require('../../assets/play-icon.png')} alt="" />
                      </i>
                      立即观看课程
                    </span>
                  </div>
                  <div className="type5-row4">
                  有效期为：获得奖品日起180天内随意观看！
                  </div>
                </div>
              )
            }
          })

        }
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
        <div className="footer">
          <img src="qweqw" alt="" className='qrcode' />
          <div className="footer-tip">
            微信扫码添加客服
          </div>
        </div>
      </div>
      </PullToRefresh>
    </div>
  )
}

export default MyPrize
