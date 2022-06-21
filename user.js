import mongoose from "mongoose";
const { Schema: _Schema, model } = mongoose;

const Schema = _Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
  },
  { versionKey: false }
);

const User = model("User", userSchema);

export default User;
