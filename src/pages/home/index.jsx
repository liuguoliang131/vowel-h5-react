// import React, { useEffect } from 'react'
import React, { useState } from 'react'
// import { getTest } from '../../axios/api'
import { connect } from 'react-redux'
// import { useLocation } from 'react-router-dom'
import './index.scss'
import Crumbs from '../../components/crumbs/index.jsx'
import TopWord from './components/topWord/index.jsx'
import Panel from './components/panel'
import LuckyRolling from './components/luckyRolling/index.jsx'
import TaskList from './components/taskList/index.jsx'
import DetailedPicture from './components/detailedPicture/index.jsx'
import AudioPlayer from './components/audioPlayer/index.jsx'
import Dialog from '../../components/dialog/index.jsx'
const Home = (props) => {
  const [visible, setVisible] = useState(true)
  const btn1Fn = () => {
    setVisible(false)
  }
  const close = () => {
    console.log('close')
    setVisible(false)
  }
  return (
    <div className='home'>
      <Crumbs></Crumbs>
      <TopWord></TopWord>
      <Panel></Panel>
      <div className="text-1">
        —— 奖池已开放，抓紧抽奖吧 ——
      </div>
      <div className="mb14"></div>
      <LuckyRolling></LuckyRolling>
      <div className="mb16"></div>
      <TaskList></TaskList>
      <div className="mb16"></div>
      <DetailedPicture></DetailedPicture>
      <AudioPlayer></AudioPlayer>
      <div className="footer"></div>
      <Dialog text={<div>恭喜您获得了一次抽奖机会，奖池开启后记得来参与喔！</div>} visible={visible} close={() => close()} btn1={{ text: '我知道了', click: () => btn1Fn() }}></Dialog>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    count: state.index.count
  }
}
export default connect(mapStateToProps, null)(Home)
