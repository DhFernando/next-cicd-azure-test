import mongoose from 'mongoose';

export async function connect() {
    try {
        mongoose.connect(`mongodb+srv://hdilshanfernando11:24w3iPNzl5VXQM1P@cluster1.mjwgcya.mongodb.net/`);
        // process.env.MONGO_URI!
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
        
    }


}