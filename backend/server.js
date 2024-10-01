import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js";
import path from "path";

//This allows us to read the content of our .env file which is where our database access information is stored
dotenv.config();

//Creates an Express application named app, this allows us to use express commands from this variable
const app = express();

//Get our port value from our .env file (common practice)
const PORT = process.env.PORT || 4000;

const __dirname = path.resolve();

//this allows us to accept JSON formatted data in the req.body
app.use(express.json());

//Now the application is looking for endpoints that all start with /api/products
//but it is going into our productRoutes to find the correct action (create, delete, etc)
//By putting the code dealing with specific product routes in a different folder in cleans up our server.js
app.use("/api/products", productRoutes);

/*Need to check what environment we are in (production or development) if we are in the production
 *stage we want to set our 'dist' folder (this is the folder that is created when we do npm run build on our
 *react applicaiton) as our static assests. __dirname tells us to go into the root, then the string tells
 us where to find our dist folder in our files */
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    
    //If we send any requests(*), other than "/api/products" we need to be able to render our React 
    //application, then we return our index.html which contains our React applicaiton
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}


//Tells the Express app to start a server listening to port 4000
app.listen(PORT, () => {
    //calls connectDB function from db.js file which basically is connecting our database as soon as our server starts
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});