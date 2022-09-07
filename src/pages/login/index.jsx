import React from 'react'
import './index.scss'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux/es/exports'
const backIMG = require('../../assets/back.png')
const Login = (props) => {
  console.log('login')
  const navigate = useNavigate()
  const handLogin = () => {
    console.log('this', props)

    props.setToken({
      type: 'login/token',
      token: 'xxxx'
    })
    props.setCount({
      type: 'index/count',
      count: '1'
    })
    navigate('/layout/home', { state: { token: 'xxxxx' }, replace: false })
  }
  return (
    <div className='login'>
      <div className="crumbs">
        <img src={backIMG} alt="" className="back" />
        <span>登录</span>
      </div>
      <div className="phone">
        <label htmlFor="phone">手机号</label>
        <input type="phone" name='phone' />
      </div>
      <div className="code">
        <label htmlFor="code">验证码</label>
        <input type="number" name="code" id="" />
        <span className='get'>获取验证码</span>
      </div>
      <div className="submit">
        <div className="submit-btn" onClick={() => handLogin()}>立即登录</div>
      </div>
    </div>
  )
}
const mapDispatchToProps = (dispatch) => {
  return {
    setToken (action) {
      dispatch(action)
    },
    setUserInfo (action) {
      dispatch(action)
    },
    setCount (action) {
      dispatch(action)
    }
  }
}
export default connect(null, mapDispatchToProps)(Login)
