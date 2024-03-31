import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import fileUpload from 'express-fileupload';

dotenv.config()

import getFiles from "./endpointGetFiles";
import addFile from "./endpointAddFile";

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.get("/getFiles", getFiles );
app.post("/addFile", addFile);
