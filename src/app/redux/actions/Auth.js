import config, {
  RECIEVED_LOGIN_DATA, FAILED_LOGIN_DATA, SET_USER_DATA, LOGOUT_USER, RECIEVED_SIGNUP_DATA, ACTIVATE_ACCOUNT, GET_GROUPS
} from '../../../config'
import { api } from '../../../core/api';
// import { history } from '../route';
import { firebase } from '../../../config';

let url;

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

export const WriteInitData = (data) => {

}

// Google Login
export const GoogleLoginHandler = (payload) => {
  return dispatch => {
    let base_provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(base_provider).then(result => {
      console.log(result);
      if (result) {
        let data = {
          profile: result.additionalUserInfo.profile,
          token: result.credential.accessToken,
          refreshToken: result.user.refreshToken
        }
        if (result.additionalUserInfo.isNewUser) WriteInitData();
        dispatch(recievedLoginData(data));
      }
    }).catch(error => {
      console.log('error', error);
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
  const url = config.endpoint.public_registration;
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
  return (dispatch) => {
    return firebase.auth().signOut().then(() => {
      console.log("Successfully Signout")
      dispatch(logoutUser()); // Store Clearing
      localStorage.clear(); // LocalStorage clearing
    }).catch(e => {
      console.log(e)
    })
  }
}

// Logout User


export const ChangePassword = (payload, token) => {
  return () => {
    url = config.endpoint.change_pwd;
    return new Promise((resolve, reject) => {
      api.post(url, payload, token).then((res) => {
        console.log(res)
        resolve(res)
      }, error => {
        reject(error)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}



// Get Group List
export const getGroupList = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    return new Promise((resolve, reject) => {
      api.getGroupHandler(token).then((res) => {
        // console.log(res.results)
        dispatch(getGroups(res.results))
        resolve(res);
      }).catch(e => {
        reject(e)
      })
    })
  }
}

// Activate Account 
export const activateAccount = (payload) => {
  return () => {
    return new Promise((resolve, reject) => {
      api.activateHandler(payload).then((res) => {
        resolve(res.data)
      }, e => {
        resolve(e)
      }).catch((e) => {
        resolve(e)
      })
    })
  }
}

export const validateToken = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    return new Promise((resolve, reject) => {
      api.validateTokenHandler(token).then(res => {
        resolve(res)
      }, error => {
        dispatch(logoutUser()); // Store Clearing
        localStorage.clear(); // LocalStorage clearing
      })
    })
  }
}