import React, { Component } from 'react'
import './index.scss'
const closeIMG = require('../../assets/Group 220.png')
class Model extends Component {
  render () {
    return (
      <div className="model">
        {
          this.props.visible
            ? (
            <div className="mask">
            <div className="content-box">
              {this.props.hideClose ? null : (<img className='close' src={closeIMG} alt="" onClick={() => this.handleClose()} />)

              }
              <div className="text">
                {this.props.text}
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
    console.log('props', this.props)
    this.props.close()
  }
}
export default Model
