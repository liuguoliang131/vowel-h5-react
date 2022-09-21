import React, { Component } from 'react'
import utils from '../../utils'
import './index.scss'
const closeIMG = require('../../assets/Group 220.png')
class Model extends Component {
  render () {
    return (
      <div className="model" onTouchMove={(e) => e.preventDefault()}>
        {
          this.props.visible
            ? (
            <div className="mask" onTouchMove={(e) => e.preventDefault()}>
            <div className="content-box" onTouchMove={(e) => e.preventDefault()}>
              {this.props.hideClose ? null : (<img className='close' src={closeIMG} alt="" onClick={() => this.handleClose()} />)

              }
              <div className="text" onTouchMove={(e) => e.preventDefault()}>
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

  componentDidMount () {
    if (utils.isWhatSysTem() === 2) {
      document.body.style.overflow = 'hidden' // 弹层显示时
    }
  }

  componentWillUnmount () {
    if (utils.isWhatSysTem() === 2) {
      document.body.style.overflow = null // 弹层不显示时
    }
  }

  handleClose = () => {
    console.log('props', this.props)
    this.props.close()
  }
}
export default Model
