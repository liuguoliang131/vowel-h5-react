import React, { Component } from 'react'
import './index.scss'
const closeIMG = require('../../assets/Group 220.png')
class Dialog extends Component {
  state = {

  }

  render () {
    return (
      <div className="dialog">
        {
          this.props.visible
            ? (
          <div className="mask">
            <div className="content-box">
              <img className='close' src={closeIMG} alt="" onClick={() => this.handleClose()} />
              <div className="text">
                {this.props.text}
              </div>
                {
                  this.props.btn1 && this.props.btn2
                    ? (
                    <div className="btns">
                      <div className="btn1" onClick={this.props.btn1.click}>{this.props.btn1.text}</div>
                      <div className="btn2" onClick={this.props.btn2.click}>{this.props.btn2.text}</div>
                    </div>
                      )
                    : (
                    <div className="btns">
                      <div className="btn3" onClick={this.props.btn1.click}>{this.props.btn1.text}</div>
                    </div>
                      )
                  }
            </div>
          </div>
              )
            : null
        }
      </div>
    )
  }

  handleClose = () => {
    console.log('props', this.props)
    this.props.close()
  }

  componentDidMount () {
    console.log('mount')
  }

  componentDidUpdate () {
    console.log('update')
  }
}

export default Dialog
