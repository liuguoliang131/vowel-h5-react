import React, { Component } from 'react'
import './index.scss'
const closeIMG = require('../../../../assets/Group 220.png')
class FirstPop extends Component {
  state = {

  }

  render () {
    return (
      <div className="first-pop">
        {
          this.props.visible
            ? (
          <div className="mask">
            <div className="content-box">
              <img className='close' src={closeIMG} alt="" onClick={() => this.handleClose()} />
              {
                this.props.shareInfo.user_name
                  ? (
                  <div className="share-have">
                <div className="share-have-row1">
                  <img src={this.props.shareInfo.user_avatar} alt="" />
                  <span>{this.props.shareInfo.user_name}</span>
                </div>
                <div className="share-have-row2">
                  赠送您一次抽奖机会
                </div>
              </div>
                    )
                  : (
                  <div className="text">
                    恭喜您获得了一次抽奖机会，奖池开启后记得来参与喔！
                  </div>
                    )
              }
              <div className="btns">
                <div className="btn3" onClick={() => this.handleClose()}>我知道了</div>
                </div>
            </div>
          </div>
              )
            : null
        }
      </div>
    )
  }

  handleClose = () => {
    this.props.close()
  }

  componentDidMount () {
  }

  componentDidUpdate () {
  }
}

export default FirstPop
