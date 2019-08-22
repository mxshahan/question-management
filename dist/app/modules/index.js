'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.routerHandlers = undefined;

var _user = require('./user');

var _question = require('./question');

var routerHandlers = exports.routerHandlers = [_user.userRouters, _question.questRouters];