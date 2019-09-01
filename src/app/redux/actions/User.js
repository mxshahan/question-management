import config, { GET_ALL_USER, REQUEST_UPDATE_USER } from "../../../config";
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

// Get Organization List
export const UpdateUser = (payload) => {
  console.log(payload)
  return async (dispatch) => {
    let url = config.endpoint.get_users + '/' + payload.id;
    return new Promise((resolve, reject) => {
      api.put(url, payload).then((res) => {
        dispatch({ type: REQUEST_UPDATE_USER, payload: res })
        resolve(res);
      }).catch(e => {
        reject(e)
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