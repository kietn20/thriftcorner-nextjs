import mongoose from 'mongoose'

let isConnected = false; // variable to track the connect status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGODB_URL) return console.log('MONGODB_URL is not defined');

    if (isConnected) return console.log('Using existing database connection')

    try {
        await mongoose.connect(process.env.MONGODB_URL);

        isConnected = true
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
    }
}