import mongoose from 'mongoose'

const MONGODB_CONNECTION_STRING: string = process.env.MONGODB_CONNECTION_STRING || ''
const MONGODB_DATABASE_NAME: string = process.env.MONGODB_DATABASE_NAME || ''

export const connectToMongoDB = () => {
    mongoose.connect(MONGODB_CONNECTION_STRING, { dbName: MONGODB_DATABASE_NAME })
        .then(() => console.log('Connected to MongoDB'))
        .catch((err: Error) => console.error('Error connecting to MongoDB', err))
}