import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import timestamp from 'mongoose-timestamp';
import { CRUD } from '@util';

const userSchema = new mongoose.Schema({
  email: {
    type: String
  },
  name: {
    type: String
  },
  user_fb_id: {
    type: String
  },
  gender: {
    type: String,
    default: ''
  },
  dob: {
    type: String,
    default: ''
  },
  age: {
    type: String,
    default: ''
  },
  seeking: {
    type: String,
    default: ''
  },
  interested: {
    type: String
  },
  work_info: {
    type: String
  },
  college_info: {
    type: String
  },
  fb_account: {
    type: String
  },
  insta_account: {
    type: String
  },
  twitter_account: {
    type: String
  },
  mobile: {
    type: String
  },
  latitude: {
    type: String,
    default: '00.000000'
  },
  longitude: {
    type: String,
    default: '00.000000'
  },
  images: [{
    type: String
  }],
  date: {
    type: String
    // type: Date,
    // default: Date.now
  },
  status: {
    type: String,
    default: 'active'
  },
  profile: {
    type: String,
    default: 'incomplete'
  },
  delete: {
    type: String,
    default: 0
  },
  country: {
    type: String,
    default: ''
  },
  countrycode: {
    type: String,
    uppercase: true
  },
  index: {
    type: Number
  }
});

userSchema.plugin(uniqueValidator);
userSchema.plugin(timestamp);

const userModel = mongoose.model('User', userSchema);
const userCrud = new CRUD(userModel);

export {
  userModel,
  userCrud
};
