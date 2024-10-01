import mongoose from 'mongoose';

//This async function will be running to connect to our database using the MONGO_URI in our .env file
//Because it is an async function we can use the await keyword as shown
//export keyword allows us to access this function from outside of this file using import keyword
export const connectDB = async () => {
    try{
        //'await' keyword pauses the execution of our function until the 'promise' is settled
        //other parts of the program will continue normally even if this is waiting
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);       //same as C, exit(1) means exit with failure, 0 means success
    }

}