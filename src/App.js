import React from 'react'
import { Provider } from 'react-redux'
import store from './store/index'
import Routes from './router/index'
import utils from './utils/index'

// test
// const req = new XMLHttpRequest()
// req.open('GET', document.location, false)
// req.send(null)
// console.log(req.getAllResponseHeaders())
// alert(req.getAllResponseHeaders())

utils.ownApp(() => {
  if (document.cookie) {
    console.log(document.cookie)
    const arr = document.cookie.split('&')
    arr.forEach(item => {
      if (item.includes('x-token')) {
        const token = item.substring(8, item.length)
        console.log('x-token', token)
        utils.setToken(token)
      }
    })
  } else {
    utils.delToken()
  }
}, () => {

})
function App () {
  console.log('app')
  return (
    <Provider store={store}>
      <div className='App'>
        <Routes></Routes>
      </div>
    </Provider>
  )
}

export default App
