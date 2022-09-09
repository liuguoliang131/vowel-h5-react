import React from 'react'
import './index.scss'
import Crumbs1 from '../../components/crumbs1'
import utils from '../../utils/index'
function Poster () {
  return (
    <div className="poster">
      <Crumbs1 text="抽奖海报"></Crumbs1>
      <div className="poster-box">
        <img src={require('../../assets/分享-分享图.png')} alt="" />
      </div>
      <div className="bottom-box">
        <a className="save-the" download href={require('../../assets/分享-分享图.png')}>
          点击保存海报
        </a>
        <div className="bottom-box-share">
          <div className="line">
            <div className="line-1"></div>
            <div className="line-1"></div>
          </div>
          <div className="share-title">分享至微信或朋友圈</div>
          <div className="share-btns">
            <div className="share-btns-friends">
              <img onClick={() => utils.shareWebToWX('title', 'desc', 'https://www.baidu.com', 'coverurl')} src={require('../../assets/share-wx.png')} alt="" />
              <span>微信</span>
            </div>
            <div className="share-btns-friends">
            <img onClick={() => utils.shareWebToWX('title', 'desc', 'https://www.baidu.com', 'coverurl')} src={require('../../assets/share-friends.png')} alt="" />
              <span>朋友圈</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Poster
