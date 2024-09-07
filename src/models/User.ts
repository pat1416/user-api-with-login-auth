
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";
import Joi from 'joi';
import { IUser } from '../types';
const userSchema = new mongoose.Schema({
  name: {
     type: String, 
     required: true 
    },
  email: {
     type: String,
      required: true,
       unique: true },
  age: { type: Number },
  password:{
    type:String,
    unique:true,
    required:true
  }
});
userSchema.methods.generateAuthToken = function () {
  console.log("asgp",process.env.JWTPRIVATEKEY)
  const token = jwt.sign({ _id: this._id },"testing1234564");
  return token;
};



export const validate = (user:IUser) => {
  const schema = Joi.object({
      name: Joi.string().required(),
      age: Joi.number().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
  });
  return schema.validate(user);
};
const User = mongoose.model('User', userSchema);

export default User