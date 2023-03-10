import React, { useEffect } from 'react'
import './index.scss'
import { useLocation } from 'react-router-dom'
import utils from '../../../../utils/index'
const row1IMG = require('../../../../assets/task3.png')
const row2IMG = require('../../../../assets/task2.png')
// const row3IMG = require('../../../../assets/Rectangle 40961.png')
const row3IMG = require('../../../../assets/taskButton.png')
const rtIMG = require('../../../../assets/iconRt.png')
function TaskList (props) {
  const location = useLocation()

  const handleGoPay = () => {
    utils.ownApp(() => {
      if (utils.getToken()) {
        utils.openAppPage({
          page: 'musicDetailPage',
          isNeedLogin: false,
          params: { music_info_id: props.music_info.music_info_id }
        })
      } else {
        utils.goLogin()
      }
    })
  }
  useEffect(() => {
    // console.log('taskList drawStatus', props.drawStatus)
  }, [props])
  return (
    <div className="TaskList">
      <div className="TaskList-content">
        {/* <div className="line"></div> */}
        {
          props.task_list && props.task_list.map((item, index) => {
            if (item.type === 2) {
              return (
                <div className="row" key={index}>
                  <div className="col1">
                    <img src={row2IMG} alt="" />
                  </div>
                  <div className="col2">
                    <div className="col2-1">购买成功</div>
                    <div className="col2-2">抽奖机会<span className='col2-2-n'>+{item.give_num}</span></div>
                  </div>
                  <div className="col3">
                    <div className="col3-1" onClick={() => handleGoPay()}>
                      <img src={row3IMG} alt="" />
                      <div>{props.drawStatus === 0 ? '预约抢购' : '立即购买'}</div>
                    </div>
                    {/* <div className="col3-2">已获得<span style={{ color: 'rgba(252, 23, 188, 1)' }}>1</span>次抽奖机会</div> */}
                  </div>
                </div>
              )
            } else if (item.type === 3) {
              return (
                <div className="row" key={index}>
                  <div className="col1">
                    <img src={row1IMG} alt="" />
                  </div>
                  <div className="col2">
                    <div className="col2-1">邀请新用户注册({props.userInfo.share_user_num}/{item.reach_num})</div>
                    <div className="col2-2">每邀请{item.reach_num}位，抽奖机会<span className='col2-2-n'>+{item.give_num}</span></div>
                  </div>
                  <div className="col3">
                    <div className="col3-1" onClick={() => props.to()}>
                      <img src={row3IMG} alt="" />
                      <div>立即分享</div>
                    </div>
                    {
                      props.userInfo.share_award_num
                        ? (
                        <div className="col3-2">已获得<span style={{ color: 'rgba(252, 23, 188, 1)' }}>{props.userInfo.share_award_num}</span>次抽奖机会</div>
                          )
                        : null

                    }
                  </div>
                </div>
              )
            } else if (item.type === 4) {
              return (
                <div className="row" key={index}>
                  <div className="col1">
                    <img src={row2IMG} alt="" />
                  </div>
                  <div className="col2">
                    <div className="col2-1">购买成功</div>
                    <div className="col2-2">购买1份，可获得抽奖机会<span className='col2-2-n'>+{item.give_num}</span></div>
                  </div>
                  <div className="col3">
                    <div className="col3-1" onClick={() => handleGoPay()}>
                      <img src={row3IMG} alt="" />
                      <div>{props.drawStatus === 0 ? '预约抢购' : '立即购买'}</div>
                    </div>
                    {/* <div className="col3-2">已获得<span style={{ color: 'rgba(252, 23, 188, 1)' }}>1</span>次抽奖机会</div> */}
                  </div>
                </div>
              )
            } else {
              return null
            }
          })
        }

      </div>
      <div className="viewRule" onClick={() => props.showRule()}>
        查看更多规则
        <img src={rtIMG} alt="" />
      </div>
    </div>
  )
}

export default TaskList
