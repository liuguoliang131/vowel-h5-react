import React from 'react'
import { Provider } from 'react-redux'
import store from './store/index'
import SetRoutes from './router/index'

function App () {
  console.log('app')
  // const element = useRoutes(routes)
  return (
    <Provider store={store}>
      <div className='App'>
        <SetRoutes></SetRoutes>
      </div>
    </Provider>
  )
}

export default App
