import { GET_ALL_USER } from "../../../config";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_USER: {
      if (action.payload.status) {
        return state = {
          ...state,
          [action.payload.status]: action.payload.results
        }
      } else {
        return state;
      }
    }
    // case REQUEST_UPDATE_USER: {

    // }
    default:
      return state
  }
}