import React, { useState, createRef, useEffect } from 'react'
import './index.scss'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux/es/exports'
import utils from '../../utils/index'
import Crumbs1 from '../../components/crumbs1/index.jsx'
import Model from '../../components/model'
import { Vertify } from '@alex_xu/react-slider-vertify'
import { Toast } from 'antd-mobile'
import { captcha, login } from '../../axios/api'
document.title = '登录'
const Login = (props) => {
  console.log('login')
  const navigate = useNavigate()
  const [data, setData] = useState({
    phone: '',
    captcha: ''
  })
  const [visible, setVisible] = useState(false) // 弹窗开关
  const timer = null
  const [captchaBtnText, setCaptchaBtnText] = useState(0) // 获取验证码按钮的文字

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
  const handleGetCaptcha = async () => {
    if (captchaBtnText) return false
    if (!/^[1]{1}[0-9]{10}$/.test(data.phone)) {
      return Toast.show({
        icon: 'fail',
        content: '手机号不符合规则'
      })
    }
    const res = await captcha({
      phone: data.phone,
      use_type: 1
    })
    console.log('res', res)
    // if (res.code !== 200) return
    // 开启定时器
    await setCaptchaBtnText(59)
  }
  useEffect(() => {
    if (captchaBtnText > 0) {
      setTimeout(() => {
        setCaptchaBtnText(val => val - 1)
      }, 1000)
    }
  }, [captchaBtnText])
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
      content: '验证错误'
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
    setVisible(true)
  }
  const handLogin = async () => {
    const hashParams = utils.getHashQuery()
    const loginForm = {
      ...data
    }
    if (hashParams.query.share_sign) {
      loginForm.share_sign = hashParams.query.share_sign
    }
    let back = ''
    if (hashParams.query.back === '/layout/home') {
      if (hashParams.query.share_sign || hashParams.query.id) {
        back = hashParams.query.back
      } else {
        back = '/layout/myEvent'
      }
    } else {
      back = '/layout/myEvent'
    }

    const res = await login(loginForm)
    // 登陆成功
    // props.setToken({
    //   type: 'login/token',
    //   token: 'xxxx'
    // })
    // props.setCount({
    //   type: 'index/count',
    //   count: '1'
    // })
    if (res.code !== 0) {
      setVisible(false)
      return false
    }
    utils.setUserInfo({
      ...res.data
    })
    utils.setToken(res.data.token)
    Toast.show({
      icon: 'success',
      content: '登录成功'
    })
    console.log('back', back)
    navigate(back, { state: { ...hashParams.query }, replace: false })
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
        <span className='get' onClick={() => handleGetCaptcha()}>{captchaBtnText || '获取验证码' }</span>
      </div>
      <div className="submit">
        <div className="submit-btn" onClick={() => loginNow()}>立即登录</div>
      </div>
      <Model hideClose={true} close={() => onClose()} visible={visible} text={
        <div ref={modelRef} className='visible-content'>
          <Vertify
            width={getWidth()}
            height={getWidth()}
            imgUrl={require('../../assets/20220918125925.jpg')}
            visible={visible}
            onSuccess={() => handLogin()}
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
