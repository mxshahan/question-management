'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routers = undefined;

var _controller = require('./controller');

var _middlewares = require('../../middlewares');

var _validate = require('./validate');

// import { isAuthenticated } from '@mid'

var routers = exports.routers = {
  baseUrl: '/api/user',
  routes: [{
    method: 'GET',
    route: '/',
    handlers: [_controller.GetUser]
  }, {
    method: 'POST',
    route: '/login',
    handlers: [_controller.LoginUser]
  }, {
    method: 'POST',
    route: '/register',
    handlers: [_controller.CreateUser]
  }, {
    method: 'POST',
    route: '/create-admin',
    handlers: [_validate.validateAdmin, _controller.CreateAdmin]
  }, {
    method: 'PUT',
    route: '/',
    handlers: [_middlewares.isAuthenticated, _controller.UpdateUser]
  }, {
    method: 'DELETE',
    route: '/',
    handlers: [_middlewares.isAuthenticated, _controller.DeleteUser]
  }]
};