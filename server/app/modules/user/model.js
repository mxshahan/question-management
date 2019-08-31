import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import timestamp from 'mongoose-timestamp';
import { CRUD } from '@util';

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  gender: {
    type: String
  },
  dob: {
    type: String
  },
  age: {
    type: String
  },
  seeking: {
    type: String
  },
  mobile: {
    type: String
  },
  latitude: {
    type: String
  },
  longitude: {
    type: String
  },
  images: {
    type: String
  },
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
    default: 'incompelte'
  },
  country: {
    type: String
  },
  countrycode: {
    type: String,
    uppercase: true
  },
  delete: {
    type: String,
    default: 0
  },
  index: {
    type: Number,
    default: 0
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
