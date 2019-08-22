'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.questionCrud = exports.questionModel = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _utility = require('../../utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var questionSchema = new _mongoose2.default.Schema({
  question: {
    type: String,
    required: true
  },
  category: {
    type: String, // Basic or Deep
    lowercase: true,
    trim: true,
    required: true
  },
  type: {
    type: String, // Subjective Objective
    lowercase: true,
    trim: true,
    required: true
  },
  owner: {
    type: String
  },
  option1: {
    type: String,
    default: ''
  },
  option2: {
    type: String,
    default: ''
  },
  option3: {
    type: String,
    default: ''
  },
  option4: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: 'active'
  }
});

questionSchema.plugin(_mongooseUniqueValidator2.default);
questionSchema.plugin(_mongooseTimestamp2.default);

var questionModel = _mongoose2.default.model('questionModel', questionSchema);
var questionCrud = new _utility.CRUD(questionModel);

exports.questionModel = questionModel;
exports.questionCrud = questionCrud;