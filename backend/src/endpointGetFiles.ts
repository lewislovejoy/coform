import {Request, Response} from "express";
import {getUserUploads} from "./database";

export default async function getFiles(req: Request, res: Response) {
  console.log('Get user: ' + req.query.userId)
  if (req.query.userId) {
    res.json(await getUserUploads(req.query.userId.toString()))
  }
  else {
    // error
  }
}
