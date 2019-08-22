'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteUser = exports.UpdateUser = exports.CreateAdmin = exports.CreateUser = exports.LoginUser = exports.GetUser = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _model = require('./model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// import { generateJwt } from '@util'
var user = void 0,
    users = void 0;

var GetUser = exports.GetUser = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _model.userCrud.get();

          case 3:
            users = _context.sent;
            _context.next = 9;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context['catch'](0);

            res.status(422).json(_context.t0);

          case 9:
            _context.prev = 9;

            res.status(200).json(users);
            return _context.finish(9);

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 6, 9, 12]]);
  }));

  return function GetUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var LoginUser = exports.LoginUser = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
    var _req$body, username, password;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, password = _req$body.password;
            _context2.prev = 1;
            _context2.next = 4;
            return _model.userCrud.single({
              qr: {
                $or: [{
                  'email': username
                }, {
                  'username': username
                }]
              }
            });

          case 4:
            user = _context2.sent;
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](1);

            res.status(422).json(_context2.t0);

          case 10:
            _context2.prev = 10;

            if (user && user.isMatchedPassword(password)) {
              res.status(200).json(user.toAuthJSON());
            } else {
              res.status(401).json({
                success: false,
                message: 'Unauthorized'
              });
            }
            return _context2.finish(10);

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 7, 10, 13]]);
  }));

  return function LoginUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var CreateUser = exports.CreateUser = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _model.userCrud.create(req.body);

          case 3:
            user = _context3.sent;
            _context3.next = 9;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3['catch'](0);

            res.status(422).json(_context3.t0);

          case 9:
            _context3.prev = 9;

            res.status(201).json(user.toAuthJSON());
            return _context3.finish(9);

          case 12:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 6, 9, 12]]);
  }));

  return function CreateUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var CreateAdmin = exports.CreateAdmin = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res, next) {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _model.userCrud.create(req.body);

          case 3:
            user = _context4.sent;
            _context4.next = 9;
            break;

          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4['catch'](0);

            next(_context4.t0);

          case 9:
            _context4.prev = 9;

            res.status(201).json(user.toAuthJSON());
            return _context4.finish(9);

          case 12:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 6, 9, 12]]);
  }));

  return function CreateAdmin(_x7, _x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();

var UpdateUser = exports.UpdateUser = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _model.userCrud.put({
              params: {
                qr: { _id: req.user.uid }
              },
              body: req.body
            });

          case 3:
            user = _context5.sent;
            _context5.next = 9;
            break;

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5['catch'](0);

            res.status(422).json(_context5.t0);

          case 9:
            _context5.prev = 9;

            res.status(201).json(user.toAuthJSON());
            return _context5.finish(9);

          case 12:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 6, 9, 12]]);
  }));

  return function UpdateUser(_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();

var DeleteUser = exports.DeleteUser = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _model.userCrud.delete({
              params: {
                qr: { _id: req.user.uid }
              }
            });

          case 3:
            user = _context6.sent;
            _context6.next = 9;
            break;

          case 6:
            _context6.prev = 6;
            _context6.t0 = _context6['catch'](0);

            res.status(422).json(_context6.t0);

          case 9:
            _context6.prev = 9;

            res.status(201).json({
              success: true,
              message: 'User Deleted'
            });
            return _context6.finish(9);

          case 12:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 6, 9, 12]]);
  }));

  return function DeleteUser(_x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}();