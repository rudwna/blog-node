import mongoose from "mongoose";
const { Schema: _Schema, model } = mongoose;

const Schema = _Schema;

const postSchema = new Schema(
  {
    name: String,
    status: Number,
    content: String,
  },
  { versionKey: false }
);

const Post = model("Post", postSchema);

export default Post;
