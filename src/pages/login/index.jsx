import React from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux/es/exports'
const Login = (props) => {
  console.log('login')
  const navigate = useNavigate()
  const handLogin = () => {
    console.log('this', props)
    // eslint-disable-next-line react/prop-types
    props.setToken({
      type: 'token',
      token: 'xxxx'
    })
    navigate('/layout/home', { state: { token: 'xxxxx' }, replace: false })
  }
  return (
    <>
      <h3>login</h3>
      <button onClick={() => handLogin()}>登录</button>
    </>
  )
}
const mapDispatchToProps = (dispatch) => {
  return {
    setToken (action) {
      dispatch(action)
    },
    setUserInfo (action) {
      dispatch(action)
    }
  }
}
export default connect(null, mapDispatchToProps)(Login)
