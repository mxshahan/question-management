'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readCSV = exports.deleteMultiple = exports.deleteQuestion = exports.updateStatus = exports.updateQuestion = exports.getOneQuestion = exports.getQuestion = exports.CreateQuestion = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _model = require('./model');

var _shortid = require('shortid');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// import csv from 'fast-csv';


var csv = require('csv-parser');
var question = void 0,
    questions = [];

var CreateQuestion = exports.CreateQuestion = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = {
              question: req.body.question,
              category: req.body.category.toLowerCase(),
              type: req.body.type.toLowerCase(),
              owner: req.body.owner,
              option1: req.body.option1,
              option2: req.body.option2,
              option3: req.body.option3,
              option4: req.body.option4
            };
            _context.prev = 1;
            _context.next = 4;
            return _model.questionModel.create(data);

          case 4:
            question = _context.sent;
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](1);

            next(_context.t0);

          case 10:
            _context.prev = 10;

            res.status(201).json(question);
            return _context.finish(10);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 7, 10, 13]]);
  }));

  return function CreateQuestion(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var getQuestion = exports.getQuestion = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    var query;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            query = _extends({}, req.query);

            if (req.query.type === '') delete query.type;
            _context2.prev = 2;
            _context2.next = 5;
            return _model.questionModel.find(query);

          case 5:
            question = _context2.sent;
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2['catch'](2);

            next(_context2.t0);

          case 11:
            _context2.prev = 11;

            res.status(201).json(question);
            return _context2.finish(11);

          case 14:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[2, 8, 11, 14]]);
  }));

  return function getQuestion(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var getOneQuestion = exports.getOneQuestion = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res, next) {
    var id;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.prev = 1;
            _context3.next = 4;
            return _model.questionModel.findOne({ _id: id });

          case 4:
            question = _context3.sent;

            res.status(202).json(question);
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3['catch'](1);

            next(_context3.t0);

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 8]]);
  }));

  return function getOneQuestion(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var updateQuestion = exports.updateQuestion = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res, next) {
    var id, data, newQuestion;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.prev = 1;
            _context4.next = 4;
            return _model.questionModel.findOne({ _id: id });

          case 4:
            question = _context4.sent;

            if (!question) {
              _context4.next = 12;
              break;
            }

            data = {
              question: req.body.question,
              category: req.body.category.toLowerCase(),
              type: req.body.type.toLowerCase(),
              owner: req.body.owner,
              option1: req.body.option1,
              option2: req.body.option2,
              option3: req.body.option3,
              option4: req.body.option
            };

            _extends(question, data);
            _context4.next = 10;
            return question.save();

          case 10:
            newQuestion = _context4.sent;


            res.status(201).json(newQuestion);

          case 12:
            _context4.next = 17;
            break;

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4['catch'](1);

            next(_context4.t0);

          case 17:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[1, 14]]);
  }));

  return function updateQuestion(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

var updateStatus = exports.updateStatus = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res, next) {
    var id, data, newQuestion;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.prev = 1;
            _context5.next = 4;
            return _model.questionModel.findOne({ _id: id });

          case 4:
            question = _context5.sent;

            if (!question) {
              _context5.next = 12;
              break;
            }

            data = {
              status: req.body.status
            };

            _extends(question, data);
            _context5.next = 10;
            return question.save();

          case 10:
            newQuestion = _context5.sent;


            res.status(201).json(newQuestion);

          case 12:
            _context5.next = 17;
            break;

          case 14:
            _context5.prev = 14;
            _context5.t0 = _context5['catch'](1);

            next(_context5.t0);

          case 17:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[1, 14]]);
  }));

  return function updateStatus(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

var deleteQuestion = exports.deleteQuestion = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res, next) {
    var id, newQuestion;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id;
            _context6.prev = 1;
            _context6.next = 4;
            return _model.questionModel.findOne({ _id: id });

          case 4:
            question = _context6.sent;

            if (!question) {
              _context6.next = 12;
              break;
            }

            _context6.next = 8;
            return question.delete({ _id: id });

          case 8:
            newQuestion = _context6.sent;

            res.status(201).json(newQuestion);
            _context6.next = 14;
            break;

          case 12:
            res.status(421).json({
              message: 'Question not found.'
            });
            return _context6.abrupt('return');

          case 14:
            _context6.next = 19;
            break;

          case 16:
            _context6.prev = 16;
            _context6.t0 = _context6['catch'](1);

            next(_context6.t0);

          case 19:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[1, 16]]);
  }));

  return function deleteQuestion(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

var deleteMultiple = exports.deleteMultiple = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res, next) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, entry;

    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;

            if (!Array.isArray(req.body)) {
              _context7.next = 29;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context7.prev = 5;
            _iterator = req.body[Symbol.iterator]();

          case 7:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context7.next = 15;
              break;
            }

            entry = _step.value;
            _context7.next = 11;
            return _model.questionModel.deleteOne({ _id: entry._id });

          case 11:
            question = _context7.sent;

          case 12:
            _iteratorNormalCompletion = true;
            _context7.next = 7;
            break;

          case 15:
            _context7.next = 21;
            break;

          case 17:
            _context7.prev = 17;
            _context7.t0 = _context7['catch'](5);
            _didIteratorError = true;
            _iteratorError = _context7.t0;

          case 21:
            _context7.prev = 21;
            _context7.prev = 22;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 24:
            _context7.prev = 24;

            if (!_didIteratorError) {
              _context7.next = 27;
              break;
            }

            throw _iteratorError;

          case 27:
            return _context7.finish(24);

          case 28:
            return _context7.finish(21);

          case 29:
            res.status(202).json({
              message: 'deleted'
            });
            _context7.next = 35;
            break;

          case 32:
            _context7.prev = 32;
            _context7.t1 = _context7['catch'](0);

            next(_context7.t1);

          case 35:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[0, 32], [5, 17, 21, 29], [22,, 24, 28]]);
  }));

  return function deleteMultiple(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();

var readCSV = exports.readCSV = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee9(req, res, next) {
    var csvFile, ext, newFilename, uploadPath, count, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, entry, isExist;

    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            if (!(Object.keys(req.files).length == 0)) {
              _context9.next = 2;
              break;
            }

            return _context9.abrupt('return', res.status(400).send('No files were uploaded.'));

          case 2:
            csvFile = req.files.csv; //file send from frontend

            ext = csvFile.name.split('.');
            newFilename = Date.now() + '-' + (0, _shortid.generate)() + '.' + ext[1];
            uploadPath = './' + newFilename;

            if (!(ext[1] !== 'csv')) {
              _context9.next = 8;
              break;
            }

            return _context9.abrupt('return', res.status(422).json({
              message: 'File format is not ok. Only CSV file supported',
              status: false
            }));

          case 8:
            _context9.next = 10;
            return csvFile.mv(uploadPath, function (err) {
              if (err) return res.status(500).send(err);
            });

          case 10:
            _context9.prev = 10;
            _context9.next = 13;
            return new Promise(function (resolve) {
              _fs2.default.createReadStream(uploadPath).pipe(csv()).on('data', function (row) {

                questions.push({
                  question: unescape(escape(row.Question).toString('utf8').replace(/%uFFFD/g, '%22')),
                  category: unescape(row.Category).toString('utf8').toLowerCase().normalize(),
                  type: unescape(row.Type).toString('utf8').toLowerCase().normalize(),
                  option1: unescape(row.Option1).toString('utf8').normalize(),
                  option2: unescape(row.Option2).toString('utf8').normalize(),
                  option3: unescape(row.Option3).toString('utf8').normalize(),
                  option4: unescape(row.Option4).toString('utf8').normalize(),
                  owner: unescape(row.Owner).toString('utf8').normalize()
                });
                resolve(questions);
              }).on('end', _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
                return _regenerator2.default.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.next = 2;
                        return _fs2.default.unlinkSync(uploadPath);

                      case 2:
                        console.log('CSV File successfully processed');

                      case 3:
                      case 'end':
                        return _context8.stop();
                    }
                  }
                }, _callee8, undefined);
              })));
            });

          case 13:
            console.log('please wait...');
            count = 0;
            // await questionModel.insertMany(questions);

            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context9.prev = 18;
            _iterator2 = questions[Symbol.iterator]();

          case 20:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context9.next = 34;
              break;
            }

            entry = _step2.value;
            _context9.next = 24;
            return _model.questionModel.findOne({ question: entry.question });

          case 24:
            isExist = _context9.sent;

            if (!isExist) {
              _context9.next = 29;
              break;
            }

            count += 1;
            _context9.next = 31;
            break;

          case 29:
            _context9.next = 31;
            return _model.questionModel.create(_extends(entry));

          case 31:
            _iteratorNormalCompletion2 = true;
            _context9.next = 20;
            break;

          case 34:
            _context9.next = 40;
            break;

          case 36:
            _context9.prev = 36;
            _context9.t0 = _context9['catch'](18);
            _didIteratorError2 = true;
            _iteratorError2 = _context9.t0;

          case 40:
            _context9.prev = 40;
            _context9.prev = 41;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 43:
            _context9.prev = 43;

            if (!_didIteratorError2) {
              _context9.next = 46;
              break;
            }

            throw _iteratorError2;

          case 46:
            return _context9.finish(43);

          case 47:
            return _context9.finish(40);

          case 48:

            console.log('CSV Record Added');
            return _context9.abrupt('return', res.json({
              message: 'CSV File Successfully Added',
              record: {
                totalRecord: questions.length,
                duplicate: count,
                newlyAdded: questions.length - count
              }
            }));

          case 52:
            _context9.prev = 52;
            _context9.t1 = _context9['catch'](10);

            next(_context9.t1);

          case 55:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined, [[10, 52], [18, 36, 40, 48], [41,, 43, 47]]);
  }));

  return function readCSV(_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}();