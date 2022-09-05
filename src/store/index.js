import { combineReducers, createStore } from 'redux'
import login from './modules/login'
import index from './modules/index'
const reducer = combineReducers({
  login,
  index
})
const store = createStore(reducer)
console.log('getState', store.getState())
export default store
