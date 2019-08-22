import { GET_QUESTION } from "../../../config";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_QUESTION: {
      if (action.payload.category === 'deep') {
        return state = {
          ...state,
          deep: action.payload.results
        }
      } else {
        return state = {
          ...state,
          basic: action.payload.results
        }
      }
    }
    default:
      return state
  }
}