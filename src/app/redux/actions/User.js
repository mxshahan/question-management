import config, { GET_ALL_USER, REQUEST_UPDATE_USER, FILTER_SEARCH } from "../../../config";
import { api } from "../../../core/api";
import { serialize } from "../../../core/lib";

// Get Organization List
export const GetUserList = (params = {}) => {
  return async (dispatch) => {
    let query = await serialize(params);
    let url = config.endpoint.get_users + (query ? '?' + query : '');
    return new Promise((resolve, reject) => {
      api.get(url).then((res) => {
        dispatch({ type: GET_ALL_USER, payload: { results: res, status: params.status } })
        resolve(res);
      }).catch(e => {
        reject(e)
      })
    })
  }
}

// Update User
export const UpdateUser = (payload) => {
  console.log(payload)
  return async (dispatch) => {
    let url = config.endpoint.get_users + '/' + payload._id;
    return new Promise((resolve, reject) => {
      api.put(url, payload).then((res) => {
        dispatch({ type: REQUEST_UPDATE_USER, payload: res })
        resolve({ result: res, success: true });
      }).catch(e => {
        resolve({ error: e, success: false });
      })
    })
  }
}

// Upload Profile Picture
export const UploadImage = (payload, id) => {
  return async (dispatch) => {
    let url = config.endpoint.user_upload_image + '/' + id;
    return new Promise((resolve, reject) => {
      api.post(url, payload).then((res) => {
        dispatch({ type: REQUEST_UPDATE_USER, payload: res })
        resolve({ result: res.data, success: true });
      }).catch(e => {
        resolve({ error: e, success: false });
      })
    })
  }
}


export const DeleteUser = (id) => {
  return () => {
    let url = config.endpoint.get_users + '/' + id;
    return new Promise((resolve, reject) => {
      api.delete(url).then((res) => {
        resolve(res);
      }).catch(e => {
        reject(e)
      })
    })
  }
}



export const GetUser = (id) => {
  return () => {
    let url = config.endpoint.get_users + '/' + id;
    return new Promise((resolve, reject) => {
      api.get(url).then((res) => {
        resolve(res);
      }).catch(e => {
        reject(e)
      })
    })
  }
}

export const DeleteMultipleUser = (rowKeys) => {
  return () => {
    let url = config.endpoint.delete_multiple;
    return new Promise((resolve, reject) => {
      api.post(url, rowKeys).then((res) => {
        resolve(res);
      }).catch(e => {
        reject(e)
      })
    })
  }
}

export const filterData = (payload) => ({
  type: FILTER_SEARCH,
  payload
})