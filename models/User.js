import { Schema, model } from 'mongoose';

import { handleSaveError, setUpdateSetting } from './hooks.js';

import { emailRegepxp, themesList } from '../constants/user-constants.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: emailRegepxp,
    },
    avatarURL: {
      type: String,
      default: 'https://res.cloudinary.com/dgo1apgvd/image/upload/v1714867826/avatar/default.jpg',
    },
    theme: {
      type: String,
      enum: themesList,
      default: 'dark',
    },
    token: {
      type: String,
      default: null,
    },
    // verify: {
    //   type: Boolean,
    //   default: false,
    // },
    verificationToken: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSaveError);

userSchema.pre('findOneAndUpdate', setUpdateSetting);

userSchema.post('findOneAndUpdate', handleSaveError);

const User = model('user', userSchema);

export default User;
