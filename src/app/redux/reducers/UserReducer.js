import { GET_ALL_USER, FILTER_SEARCH } from "../../../config";
import { UserFilter } from "../../components/views/users/UserFn";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_USER: {
      if (action.payload.status) {
        return state = {
          ...state,
          [action.payload.status]: {
            ...state[action.payload.status],
            results: action.payload.results,
            filtered: action.payload.results
          }
        }
      } else {
        return state;
      }
    }
    case FILTER_SEARCH: {
      const filteredData = UserFilter(state[action.payload.status].results, action.payload);
      return state = {
        ...state,
        [action.payload.status]: {
          ...state[action.payload.status],
          filtered: filteredData
        }
      }
    }
    default:
      return state
  }
}