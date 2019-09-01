import React from 'react';
import { Provider } from "react-redux";
// import { isLoggedIn } from '../core/middlewares';
import { AppSettings } from '../base';
import { AppRouter } from './route';
import store from './redux';
import '../static/styles/index.scss'

class App extends AppSettings {
  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    )
  }
}


export default (App);