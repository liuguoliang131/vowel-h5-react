import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import './index.scss'
import Crumbs1 from '../../components/crumbs1'
function MyEvent () {
  console.log('myevent')
  const [list] = useState([
    { id: '1', status: 1 },
    { id: '2', status: 0 }
  ])
  const navigate = useNavigate()
  const handleViewPrize = (item, e) => {
    e.stopPropagation()
    navigate('/layout/myPrize', { state: { ...item }, replace: false })
  }
  const handleViewDetail = (item) => {
    console.log('handleViewDetail', item)
    navigate('/layout/home', { state: { ...item }, replace: false })
  }
  return (
    <div className="myEvent">
      <Crumbs1 text='我的活动'></Crumbs1>
      <div className="list">
        {
          list.map((item, index) => (
            <div className="item" key={index} onClick={() => handleViewDetail(item)}>
              <div className="item-row1">
              《念君安》新歌上线
              </div>
              <div className="item-row2">
                购买即可抽免单奖励，更有超值大礼
              </div>
              <div className="item-row3">
              抢购时间：2020.08.25 10:00-2020.08.25 10:00
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
      </div>
    </div>
  )
}

export default MyEvent
