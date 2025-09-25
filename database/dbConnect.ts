import mongoose from "mongoose"


const connectionString = process.env.MONGODB_URI

if (!connectionString) {

  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  )
}


const MONGODB_URI: string = connectionString

type MongooseConnection = {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseConnection: MongooseConnection | undefined
}

const cached: MongooseConnection =
  global.mongooseConnection ?? (global.mongooseConnection = { conn: null, promise: null })

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts)
  }

  try {
    cached.conn = await cached.promise
  } catch (error) {
    cached.promise = null
    throw error
  }

  return cached.conn
}

export default dbConnect
