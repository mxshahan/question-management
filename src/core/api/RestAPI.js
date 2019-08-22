import BaseAPI from "./BaseAPI"
import store from "../../app/redux";

export class RestAPI extends BaseAPI {

    get = (url, token = store.getState().auth.token) => {
        let accessToken = token;
        if (token) return this.callAPI(url, 'get', {}, { headers: { auth: accessToken } })
        else return this.callAPI(url, 'get');
    }

    put = (url, payload, token = store.getState().auth.token) => {
        let accessToken = token;
        if (token) return this.callAPI(url, 'put', payload, { headers: { auth: accessToken } })
        else return this.callAPI(url, 'put', payload);
    }

    post = (url, payload, token = store.getState().auth.token) => {
        let accessToken = token;
        if (token) return this.callAPI(url, 'post', payload, { headers: { auth: accessToken } })
        else return this.callAPI(url, 'post', payload);
    }

    delete = (url, token = store.getState().auth.token) => {
        let accessToken = token;
        if (token) return this.callAPI(url, 'delete', {}, { headers: { auth: accessToken } })
        else return this.callAPI(url, 'delete');
    }
}

const api = new RestAPI();

export {
    api,
    RestAPI as default
};