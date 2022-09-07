import React, { Component } from 'react'
import './index.scss'
const closeIMG = require('../../assets/Group 220.png')
class Dialog extends Component {
  state = {
    visible: false
  }

  render () {
    return (
      <div className="dialog">
        {
          this.state.visible
            ? (
          <div className="mask">
            <div className="content-box">
              <img className='close' src={closeIMG} alt="" onClick={() => this.handleClose()} />
              {
                this.props.content
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
    this.setState({
      visible: false
    })
  }

  componentDidMount () {
    this.setState({ visible: this.props.visible })
  }
}

export default Dialog
