'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routers = undefined;

var _controller = require('./controller');

var _middlewares = require('../../middlewares');

var routers = exports.routers = {
  baseUrl: '/api/question',
  routes: [{
    method: 'POST',
    route: '/create-question',
    handlers: [_middlewares.isAuthenticated, _controller.CreateQuestion]
  }, {
    method: 'GET',
    route: '/get-question',
    handlers: [_middlewares.isAuthenticated, _controller.getQuestion]
  }, {
    method: 'GET',
    route: '/:id',
    handlers: [_middlewares.isAuthenticated, _controller.getOneQuestion]
  }, {
    method: 'POST',
    route: '/upload-file',
    handlers: [_middlewares.isAuthenticated, _controller.readCSV]
  }, {
    method: 'PUT',
    route: '/update-status/:id',
    handlers: [_middlewares.isAuthenticated, _controller.updateStatus]
  }, {
    method: 'PUT',
    route: '/:id',
    handlers: [_middlewares.isAuthenticated, _controller.updateQuestion]
  }, {
    method: 'DELETE',
    route: '/:id',
    handlers: [_middlewares.isAuthenticated, _controller.deleteQuestion]
  }, {
    method: 'POST',
    route: '/',
    handlers: [_middlewares.isAuthenticated, _controller.deleteMultiple]
  }]
};