import { createStore } from 'redux'
const initState = {
  type: '',
  value: 0
}
const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'token':
      return Object.assign(state, action)
    case 'userInfo':
      return Object.assign(state, action)
    default:
      return state
  }
}
const store = createStore(reducer)

export default store
