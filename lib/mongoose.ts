import mongoose from 'mongoose'

let isConnected = false; // variable to track the connect status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    
    if (!process.env.MONGODB_URI) return console.log('MONGODB_URL is not defined');
    
    if (isConnected) return console.log('Using existing database connection')
    
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
        
        isConnected = true
        console.log('MongoDB connected')
        // db.connection.dropCollection('products')
        // mongoose.connection.collections.products.drop()
    } catch (error) {
        console.log(error)
    } finally {
    }
}

export const deleteCollection = async () => {
    try {
        if (!process.env.MONGODB_URI) return console.log('MONGODB_URL is not defined');
        // const db = await mongoose.connect(process.env.MONGODB_URI);
        // db.connection.dropCollection('products')
        if (!mongoose.connection.dropCollection('products')) {
            console.log('Collection does not exist!')
            return false
        }
        console.log('Collection dropped!')
        return true
    } catch (error) {
        console.log(error)
    }
}