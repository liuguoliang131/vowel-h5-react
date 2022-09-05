import React from 'react'
import { Provider } from 'react-redux'
import store from './store/index'
import Routes from './router/index'

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
