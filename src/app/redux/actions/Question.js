import config, { GET_QUESTION } from "../../../config";
import { api } from "../../../core/api";

// Get Organization List
export const CreateQuestion = (payload) => {
  return () => {
    let url = config.endpoint.create_question;
    return new Promise((resolve, reject) => {
      api.post(url, payload).then((res) => {
        resolve(res);
      }).catch(e => {
        reject(e)
      })
    })
  }
}

// Get Organization List
export const FetchQuestion = (query = '') => {
  return (dispatch) => {
    const q = new URLSearchParams(query);
    let url = config.endpoint.get_question + (query ? '?' + query : '');
    return new Promise((resolve, reject) => {
      api.get(url).then((res) => {
        dispatch({ type: GET_QUESTION, payload: { results: res, category: q.get('category') } })
        resolve(res);
      }).catch(e => {
        reject(e)
      })
    })
  }
}

export const UpdateQuestion = (payload) => {
  return () => {
    let url = config.endpoint.question + '/' + payload._id;
    return new Promise((resolve, reject) => {
      api.put(url, payload).then((res) => {
        resolve(res);
      }).catch(e => {
        reject(e)
      })
    })
  }
}

export const UpdateStatus = (payload) => {
  console.log(payload)
  return () => {
    let url = config.endpoint.update_status + '/' + payload._id;
    return new Promise((resolve, reject) => {
      api.put(url, payload).then((res) => {
        resolve(res);
      }).catch(e => {
        reject(e)
      })
    })
  }
}

export const DeleteQuestion = (id) => {
  return () => {
    let url = config.endpoint.question + '/' + id;
    return new Promise((resolve, reject) => {
      api.delete(url).then((res) => {
        resolve(res);
      }).catch(e => {
        reject(e)
      })
    })
  }
}

export const DeleteMultiple = (items) => {
  return () => {
    let url = config.endpoint.question;
    return new Promise((resolve, reject) => {
      api.post(url, items).then((res) => {
        resolve(res);
      }).catch(e => {
        reject(e)
      })
    })
  }
}



export const getSingleQuestion = (id) => {
  return () => {
    let url = config.endpoint.question + '/' + id;
    return new Promise((resolve, reject) => {
      api.get(url).then((res) => {
        resolve(res);
      }).catch(e => {
        reject(e)
      })
    })
  }
}

export const uploadFile = data => {
  return () => {
    let url = config.endpoint.upload_file;
    return new Promise((resolve, reject) => {
      api.post(url, data).then((res) => {
        resolve(res);
      }).catch(e => {
        reject(e)
      })
    })
  }
}