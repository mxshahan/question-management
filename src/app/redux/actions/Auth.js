import config, {
  RECIEVED_LOGIN_DATA, FAILED_LOGIN_DATA, SET_USER_DATA, LOGOUT_USER, RECIEVED_SIGNUP_DATA, ACTIVATE_ACCOUNT, GET_GROUPS
} from '../../../config'
import { api } from '../../../core/api';
// import { history } from '../route';

// Failed Login Action Creator
export const failedLoginData = (payload) => ({
  type: FAILED_LOGIN_DATA, // eslint-disable-line
  payload
})

// Successfull Login  Action Creator
export const recievedLoginData = (payload) => ({
  type: RECIEVED_LOGIN_DATA, // eslint-disable-line
  payload
})

// Set User Data Action Creator
export const setUserData = (payload) => ({
  type: SET_USER_DATA,
  payload
})

// Logout Action Creator
export const logoutUser = () => ({
  type: LOGOUT_USER
})

// Sign Up Action Creator
export const recievedSignupData = (payload) => ({
  type: RECIEVED_SIGNUP_DATA,
  payload
})

export const activateAccountData = (payload) => ({
  type: ACTIVATE_ACCOUNT,
  payload
})


// Loaded into App Reducers
export const getGroups = (payload) => ({
  type: GET_GROUPS,
  payload
})

// Check if there any user or admin available
export const hasUsers = () => {
  const url = config.endpoint.has_user
  return () => {
    return new Promise((resolve, reject) => {
      api.get(url).then(res => {
        resolve(res)
      }).catch((e) => {
        reject(e);
      })
    })
  }
}

// Login User
export const fetchLoginUser = (userData = {}) => {
  return dispatch => {
    const url = config.endpoint.login;
    return api.post(url, userData).then((res) => {
      dispatch(recievedLoginData({ ...res.data, status: res.status }))
    }, error => {
      dispatch(failedLoginData(
        error.response ? Object.assign(error.response.data, { status: error.response.status }) : { status: 500 }
      ))
    })
  }
}

// Sign Up User
export const requestSignUpUser = (userData = {}) => {
  const url = config.endpoint.create_admin;
  return dispatch => {
    api.post(url, userData).then((res) => {
      dispatch(recievedSignupData(
        Object.assign(res.data, { status: res.status })
      ))
    }, error => {
      dispatch(failedLoginData(
        Object.assign(error.response.data, { status: error.response.status })
      ))
    }).catch(e => {
      dispatch(failedLoginData(
        Object.assign({ status: 500 })
      ))
      console.log('Something error')
    })
  }
}



// Logout User
export const logoutUserData = () => {
  return dispatch => {
    dispatch(logoutUser());
    localStorage.clear();
  }
}

