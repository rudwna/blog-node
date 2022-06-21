import express, { json } from "express";
import { mongoose } from "mongoose";
import postsRoutes from "./routes/posts.routes.js";
import usersRoutes from "./routes/users.routes.js"
const { connect } = mongoose;

const app = express();
const port = 3000;

connect("mongodb://blog-node:blog-node@localhost:27017/blog-node");

app.use(json());
app.use("/posts", postsRoutes);
app.use("/users", usersRoutes)

app.listen(port, () => {
  console.log(`Blog running on port ${port}`);
});
