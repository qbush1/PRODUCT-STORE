/*Making our codebase more modular:
 * This product 'controller' file holds our API handling for each specific
 * action we have (create, delete, etc) for our product collection.
 * This cleans up our code in our product.route.js file
 * All of the constants in here have comments describing their use in the
 * product.route.js file
*/
import Product from "../models/product.model.js";
import mongoose from "mongoose";


export const getProducts = async (req,res) => {
    try {
        //passing an empty object to .find() function tells them 
        //to fetch all of the products we have in the database
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch(error) {
        console.log("error in fetching products:", error.messgae);
        res.status(500).json({ success: false, messgae: "Server Error" });

    }
};

export const createProduct = async (req,res) => {
    //user will send this data
    const product = req.body;

    //! keyword is being used to check that each of the fields are not empty, if they are give error message
    if (!product.name || !product.price || !product.image) {
        //sets res status to 400 (indicates bad request), then it returns a responce to the user in json format
        //Our json responce includes success: false field and a descriptive message to the user
        return res.status(400).json({success:false, message: "Please provide all fields" });
    }

    //if we pass this if statement, user gave all of the info we need for a new product
    //use Product object from our product.model function and input info from request
    const newProduct = new Product(product);

    try {
        //wait for our newProduct to be saved to our database
        await newProduct.save();
        //201 code means something created, returns success: true and the data of the newProduct
        res.status(201).json({ success: true, data: newProduct}); 
    } catch (error) {
        //for debugging purposes:output a error
        console.error("Eror in Creating Product: ", error.message);
        //500 code means a server error as you can see from what we are returning as a message
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const product = req.body;

    //user tries to pass an id that doesn't exist we can give a 404 error
    //Realistically they will be using our frontend interface so the ID should always exist
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id"});
    }
    try {
        //The final param {new:true} returns the doc after it was updated instead of it's default which is before
        //need id, then the fields we want to update, here we just put the entire product object
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({ success: true, data: updatedProduct});
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

export const deleteProduct = async (req, res) => {
    //id comes from the id used in the :id section of string
    const {id} = req.params;

    //user tries to pass an id that doesn't exist we can give a 404 error
    //Realistically they will be using our frontend interface so the ID should always exist
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id"});
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch(error) {
        res.status(500).json({ success: false, message: "Server Error"});
    }
};