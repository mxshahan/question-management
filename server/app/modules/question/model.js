import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import timestamp from 'mongoose-timestamp';
import { CRUD } from '@util';

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
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
    type: String,
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

questionSchema.plugin(uniqueValidator);
questionSchema.plugin(timestamp);

const questionModel = mongoose.model('questionModel', questionSchema);
const questionCrud = new CRUD(questionModel);

export {
  questionModel,
  questionCrud
};
