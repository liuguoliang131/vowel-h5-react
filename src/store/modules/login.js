const initState = {
  type: 'init'
}
const login = (state = initState, action) => {
  switch (action.type) {
    case 'login/token':
      return Object.assign(state, action)
    case 'loginuserInfo':
      return Object.assign(state, action)
    default:
      return state
  }
}
export default login
