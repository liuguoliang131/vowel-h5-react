const initState = {
  type: 'init'
}
const index = (state = initState, action) => {
  switch (action.type) {
    case 'index/count':
      return Object.assign(state, action)
    case 'index/page':
      return Object.assign(state, action)
    default:
      return state
  }
}
export default index
