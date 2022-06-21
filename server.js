import express, { json } from "express";
import { mongoose } from "mongoose";
import postsRoutes from "./routes/posts.routes.js";
import usersRoutes from "./routes/users.routes.js"
const { connect } = mongoose;

const app = express();
const port = 3000;
app.locals.secret = "MIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEAn97SXWWRg0UtiyubqD0qs/gN/INchADOst4MaacdY9desX77ikSrwTjx8nB/6tHNmKxFO49JJPa5GHZqvog0CwIDAQABAkBqmLYHlFur/Ypai18klHROv40D28rqMWehGDGKmOUd1kT3fO7g+BbHDkCFTnASQjHoBIrcye6bqpdEONrrtSuRAiEAzgCtRIV+dorPH51AOwuSmJqdyGzdq1kw0sCueUZlhDcCIQDGq90T+u0t6wKEaDMDsADWbM0OTHIFbuwXTXU0T2tMzQIgQgwNgW6bgT438hbkxQmM0sif1eaxm4JZGPkV92QOoDkCIQChu7e2VEhRYUgjUlB1aArGhLxKL6GDGtHIBp6rfxvy4QIhALhEp36vyKKOO5YZhm4SzPeZUO7H5cTvgHGWjadPj68d"

connect("mongodb://blog-node:blog-node@localhost:27017/blog-node");

app.use(json());
app.use("/posts", postsRoutes);
app.use("/users", usersRoutes)

app.listen(port, () => {
  console.log(`Blog running on port ${port}`);
});
