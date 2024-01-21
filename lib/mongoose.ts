import mongoose from 'mongoose'

let isConnected = false; // variable to track the connect status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    
    if (!process.env.MONGODB_URI) return console.log('MONGODB_URL is not defined');
    
    if (isConnected) return console.log('Using existing database connection')
    
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        isConnected = true
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
    } finally {
    }
}

export const deleteCollection = async () => {
    try {
        if (!process.env.MONGODB_URI) return console.log('MONGODB_URL is not defined');
        // if (!mongoose.connection.dropCollection('products')) {
        //     console.log('Collection does not exist!')
        //     return false
        // }

        const collections = await mongoose.connection.db.listCollections().toArray();
        // console.log(collections)
        const collectionExists = collections.some((collection) => collection.name === 'products');

        if (collectionExists) {
            mongoose.connection.dropCollection('products')
            console.log('Collection dropped!')
            // return true
        } else {
            console.log(`Collection products does not exist.`);
        }
        // return false
        
        // return true
    } catch (error) {
        console.log(error)
    }
}