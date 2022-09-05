import React, { useEffect } from 'react'
import { getTest } from '../../axios/api'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
const Home = (props) => {
  const location = useLocation()
  const getData = () => {
    console.log('home', props, location.state)
    getTest().then(res => {
      console.log('getData', res)
    }).catch(error => {
      console.log(error)
    })
  }
  useEffect(() => {
    getData()
  })
  return (
    <div>
      home
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    token: state.token
  }
}
export default connect(mapStateToProps, null)(Home)
