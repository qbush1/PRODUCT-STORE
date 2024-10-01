//Making our code base more modular, moving all of our endpoints here instead of server.js
//The controller folder holds the code for the actual handeling of each of our endpoints
import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

//creates a new instance of express object
const router = express.Router();

//Creates endpoint for GETTING all of our products (router.post is heavily commented if confused)
router.get("/", getProducts)

//Create endpoint
//req holds information on the incoming request, res is used to send data back to the client
router.post("/", createProduct);

//Creating a new endpoint for updating fields of our products
//patch --> usually used for updating some but not all fields
//put --> usually used for updating all of the fields of your collection (they are interchangable)
router.put("/:id", updateProduct)

//Create a new endpoint so we can delete a product, the code works & looks very 
//similar to our creat a product (post) code above so can look at that if confused
//:id means that part of the string is dynamic and can be any value the user passes
router.delete("/:id", deleteProduct);

//now we can use router in other files
export default router;