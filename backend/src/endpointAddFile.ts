import AWS from "aws-sdk";
import {Request, Response} from "express";
import {ManagedUpload} from "aws-sdk/lib/s3/managed_upload";

import {addFileToDatabase} from "./database";

import SendData = ManagedUpload.SendData;

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
});

const S3Upload = (userId: string, filename: string, fileContent: any) => new Promise<SendData>((resolve, reject) => {
  const params = {
    Bucket: process.env.BUCKET as string,
    Key: `public/${userId}/${filename}`,
    Body: fileContent,
    ACL: 'public-read'
  }

  s3.upload(params, async (err: Error, data: SendData) => {
    if (err) {
      reject(err)
      return
    }
    resolve(data)
  })
})

export default async function addFile(req: Request, res: Response) {
  const {userId, fileType} = req.query;
  const file: any = req.files?.file;
  if (userId && file.name) {
    try {
      const s3Data = {Location: 'none'} // await S3Upload(userId.toString(), file.filename, file.data)
      await addFileToDatabase(userId as string, {
        filename: file.name,
        fileType,
        s3: s3Data.Location
      })
      res.status(200).send()
    } catch(ex) {
      res.status(500).send('Failed to upload')
    }
  }
}
