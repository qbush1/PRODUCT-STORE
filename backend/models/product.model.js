//This file is creating our 'product' model (Creates a collection called 'Product')
import mongoose from 'mongoose';

//This creates the product outline or schema
const productSchema = new mongoose.Schema({
   //each of the following (name, price, image) is showing what we will need to create a product document in our DB
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
}, {
    //this makes sure when we create a product object it includes 'createdAt and updatedAt' fields
    timestamps: true
});

/*Now that we have a schema we can create our 'products' model in our mongoDB database 
* This is telling mongoose to create a model (Collection) called 'Product' and that
* it should follow the productSchema outline (basically each Product needs those fields)
* mongoose expects singular capital version of our product and will automatically update it
* to the plural non-capitalized version in our database ('products')
*/
const Product = mongoose.model('Product', productSchema);

//lets export this so we can use it in other files
export default Product;
