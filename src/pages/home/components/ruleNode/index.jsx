import React, { Component } from 'react'
import './index.scss'
const closeIMG = require('../../../../assets/Group 220.png')
class RuleNode extends Component {
  state = {

  }

  render () {
    return (
      <div className="ruleNode">
        {
          this.props.visible
            ? (
          <div className="mask">
            <div className="content-box">
              <img className='close' src={closeIMG} alt="" onClick={() => this.handleClose()} />
              <div className="text" dangerouslySetInnerHTML={{ __html: window.sessionStorage.getItem('rule_node') }}></div>
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
    console.log('ruleNode update', this.props.ruleNode)
  }
}

export default RuleNode
