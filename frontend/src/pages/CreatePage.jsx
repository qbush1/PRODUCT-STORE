/*This is the UI with functionality for the Create product page*/
import { VStack, Container, Box, Heading, useColorModeValue, Input, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product.js";


const CreatePage = () => {
    
    /*States are a little confusing but this basically a function that returns a value
    and a way to update that value, in our case a product and a function to create a new product.
    This will be dynamically updated when recieving user input and can reflect changes to our UI*/
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    });
    //import useToast() from chakra AI to get little notification that pops up
    const toast = useToast();
    
    //Importing our createProduct function so we can create products in this page
    const {createProduct} = useProductStore();
    
    /*This function handles when our user clicks create product button, it 
     *will utilize our global state creatProduct function*/
    const handleAddProduct = async() => {
        const {success,message} = await createProduct(newProduct);
        if (!success) {
          toast({
            title:"Error",
            description: message,
            status: "error",
            isClosable: true
          });
        } else {
          toast({
            title:"Success",
            description: message,
            status: "success",
            isClosable: true
          });
        }
        setNewProduct({ name: "", price: "", image: ""});
    };

            {/* Use a container to make sure it is always in center*/}
    return <Container maxW={"container.sm"}>
        {/* Creates a vertical stack with spacing of 8 */}
        <VStack
        spacing={8}
        >   
            {/* Need our Header, can put it as a h1 element with size, textAlign, and margin bottom tags*/}
            <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                Create New Product
            </Heading>

            {/*Creating the Box that will hold our product form*/}
            <Box
              /*This is the styling for our box element, can look at chakra's website for 
              how each element can be styled and what each command does */
              w={"full"} bg={useColorModeValue("white", "gray.800")}
              p={6} rounded={"lg"} shadow={"md"}
            >
                <VStack spacing={4}>
                    {/*These input tags create a text box for user to input text, we can take their input
                      *and use the hook command above to update the state of our product 
                      *using setNewProduct functionfor each of our fields*/}
                    <Input 
                      placeholder= "Product Name"
                      name= "name"
                      value= {newProduct.name}
                      /*I think we are just using a lambda function whenever user types(onChange will be activated)
                       *then take the event (e) and update newProduct's name field to e.target.value(user typed value)*/
                      onChange={ (e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                    <Input 
                      placeholder= "Price"
                      name= "price"
                      type="number"
                      value= {newProduct.price}
                      onChange={ (e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    />
                    <Input 
                      placeholder= "Image URL"
                      name= "image"
                      value= {newProduct.image}
                      onChange={ (e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    />
                    {/*handleAddProduct function is defined above and what we want when our user inputs data and clicks the button*/}
                    <Button colorScheme="blue" onClick={handleAddProduct} w="full">Add Product</Button>
                </VStack>
            </Box>

        </VStack>
    </Container>
};

export default CreatePage;