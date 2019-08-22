import { MENU_ENLARGED } from "../../../config";

const initialState = {
  menuEnlarged: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MENU_ENLARGED: {
      return state = {
        ...state,
        menuEnlarged: action.payload
      }
    }
    default:
      return state
  }
}