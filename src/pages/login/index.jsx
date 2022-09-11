import React, { useState, createRef } from 'react'
import './index.scss'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux/es/exports'
import utils from '../../utils/index'
import Crumbs1 from '../../components/crumbs1/index.jsx'
import Model from '../../components/model'
import { Vertify } from '@alex_xu/react-slider-vertify'
import { Toast } from 'antd-mobile'
const Login = (props) => {
  console.log('login')
  const navigate = useNavigate()
  const [data, setData] = useState({
    phone: '',
    captcha: ''
  })
  const [captchaBtnText, setCaptchaBtnText] = useState(null) // 获取验证码按钮的文字
  const [visible, setVisible] = useState(false) // 弹窗开关
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
    navigate('/layout/myEvent', { state: { token: 'xxxxx' }, replace: false })
  }
  // 受控组件输入
  const handleSetState = (e) => {
    if (e.target.name === 'phone') {
      setData({
        ...data,
        phone: e.target.value
      })
    } else {
      setData({
        ...data,
        captcha: e.target.value
      })
    }
  }
  // 获取验证码
  const handleGetCaptcha = () => {

  }
  // 关闭弹窗
  const onClose = () => {
    setVisible(false)
  }

  const modelRef = createRef()
  // 获取弹窗宽度 自适应
  const getWidth = () => {
    return modelRef.clientWidth
  }
  const onFail = () => {
    Toast.show({
      icon: 'fail',
      content: '名称已存在'
    })
  }
  const onRefresh = () => {

  }
  // 登录
  const loginNow = () => {
    if (!/^[1]{1}[0-9]{10}$/.test(data.phone)) {
      return Toast.show({
        icon: 'fail',
        content: '手机号不符合规则'
      })
    }
    if (!/^\S{1,}$/.test(data.captcha)) {
      return Toast.show({
        icon: 'fail',
        content: '验证码不符合规则'
      })
    }
    const toast = Toast.show({
      content: '登录中',
      duration: 0,
      maskClickable: false,
      icon: 'loading'

    })
    // 登陆成功
    utils.setUserInfo({
      token: 'asdasdsadasdadasdasdasd'
    })
    setTimeout(() => {
      toast.close()
    }, 2000)
  }
  return (
    <div className='login'>
      <Crumbs1 text="登录"></Crumbs1>
      <div className="pt30"></div>
      <div className="phone">
        <label htmlFor="phone">手机号</label>
        <input type="phone" name='phone' onChange={(e) => handleSetState(e)} value={data.phone} />
      </div>
      <div className="code">
        <label htmlFor="code">验证码</label>
        <input type="number" name="captcha" id="" onChange={(e) => handleSetState(e)} value={data.captcha} />
        <span className='get' onClick={() => handleGetCaptcha()}>{captchaBtnText || '获取验证码'}</span>
      </div>
      <div className="submit">
        <div className="submit-btn" onClick={() => loginNow()}>立即登录</div>
      </div>
      <Model hideClose={true} close={() => onClose()} visible={visible} text={
        <div ref={modelRef} className='visible-content'>
          <Vertify
            width={getWidth()}
            height={getWidth()}
            imgUrl={require('../../assets/分享-分享图.png')}
            visible={visible}
            onSuccess={() => loginNow()}
            onFail={() => onFail()}
            onRefresh={() => onRefresh()}
          />
        </div>
      }></Model>
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
