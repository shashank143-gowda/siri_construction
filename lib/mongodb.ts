import { Db, MongoClient } from 'mongodb'

const options = {}
let clientPromise: Promise<MongoClient> | undefined

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('Missing MONGODB_URI environment variable.')

  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri, options).connect()
    }
    return global._mongoClientPromise
  }

  if (!clientPromise) clientPromise = new MongoClient(uri, options).connect()
  return clientPromise
}

export async function getDb(): Promise<Db> {
  const mongoClient = await getClientPromise()
  return mongoClient.db()
}
