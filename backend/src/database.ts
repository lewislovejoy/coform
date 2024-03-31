const Db = require('mongodb')

console.log('connect to mongo: ' + process.env.MONGO)

const client = new Db.MongoClient(process.env.MONGO)

const DB_NAME = 'newco'
const COLLECTION_NAME = 'uploads'

let globalDB: typeof Db;

const getDatabase = async () => {
  if(!globalDB) {
    await client.connect()
    globalDB = client.db(DB_NAME)
  }
  return globalDB
}

export const getUserUploads = async (userId: string) => {
  const db = await getDatabase()
  const vectorCollection = db.collection(COLLECTION_NAME)

  return await vectorCollection.find({ userId }).limit(5).toArray()
}

export const addFileToDatabase = async (userId: string, newFile: any) => {
  const db = await getDatabase()
  const vectorCollection = db.collection(COLLECTION_NAME)

  await vectorCollection.insertOne({
    userId,
    ...newFile
  });

  return vectorCollection.find({ userId }).limit(5).toArray()
}
