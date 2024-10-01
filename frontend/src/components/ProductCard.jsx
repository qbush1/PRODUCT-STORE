/*This file contains the UI and actual implementation for each of the buttons
 *on our Product card objects*/
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";
import { Box,HStack, Heading, IconButton, Image, Input, Modal, ModalBody, 
    ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useColorModeValue, 
    useDisclosure, useToast, VStack, ModalFooter, Button } from "@chakra-ui/react";
import { useState } from "react";

const ProductCard = ({product}) => {

    /*Creates a new state, basically starts as our current product, then we can use
     *the setUpdatedProduct method to update our product which will be reflected in the
     *updatedProduct variable */
    const[updatedProduct, setUpdatedProduct] = useState(product);

    //This gives us different textColor and background for light and dark mode
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    
    /*This whole functionality of calling a productStore function then getting the data
     *that's returned, if success give good toast and if false give error toast
     *is all outlines in the CreatePage file */
    const {deleteProduct, updateProduct} = useProductStore();
    const toast = useToast();

    //Need this for our modal, it's outlined what it does and why we need it in chakra
    const { isOpen, onOpen, onClose } = useDisclosure();

    //Called when delete button is pressed
    const handleDeleteProduct = async(pid) => {
        const {success, message} = await deleteProduct(pid);
        if (!success) {
            toast({
              title:"Error",
              description: message,
              status: "error",
              duration: 3000,
              isClosable: true
            });
          } else {
            toast({
              title:"Success",
              description: message,
              status: "success",
              duration: 3000,
              isClosable: true
            });
          }
    };
    
    //called when update button is pressed
    const handleUpdateProduct = async(pid, updatedProduct) => {
        const {success,message} = await updateProduct(pid, updatedProduct);
        onClose();
        if (!success) {
            toast({
              title:"Error",
              description: message,
              status: "error",
              duration: 3000,
              isClosable: true
            });
          } else {
            toast({
              title:"Success",
              description: "Product updated successfully",
              status: "success",
              duration: 3000,
              isClosable: true
            });
          }
    }

    return (
        /*Styling for the overall look of our product cards*/
        <Box
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{ transform: "translateY(-5px)", shadow: "x1" }}
        bg={bg}
        >   
            {/*Our image element access some info from the product parameter*/}
            <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />

            <Box p={4}>
            <Heading as="h3" size="md" mb={2}>
                {product.name}
            </Heading>
            <Text fontWeight="bold" fontSize="x1" color={textColor} mb={4}>
                ${product.price}
            </Text>

            {/*Put our buttons in a horizontal stack so they are next to eachother*/}
            <HStack spacing={2}>
                <IconButton icon={<EditIcon />} onClick= {onOpen} colorScheme="blue" />
                
                {/*This calls our handleDeleteProduct function when clicked and inputs that products ID as a prameter*/}
                <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} 
                colorScheme="red" />
            </HStack>
            </Box>
        
        {/*This creates the popup modal UI that shows up when user wants to update an item
          *all of the documentation on how this works is on chakra's site*/}
        <Modal isOpen={isOpen} onclose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>UpdateProduct</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                {/*This holds 3 spots for input with the same placeholder and names from CreatePage*/}
                <VStack spacing={4}>
                    <Input 
                      placeholder= "Product Name"
                      name= "name"
                      value={updatedProduct.name}
                      onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value })}
                    />
                    <Input 
                      placeholder= "Price"
                      name= "price"
                      type="number"
                      value={updatedProduct.price}
                      onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value })}
                    />
                    <Input 
                      placeholder= "Image URL"
                      name= "image"
                      value={updatedProduct.image}
                      onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value })}
                    />
                </VStack>
               </ModalBody>

                {/*Creates the update and cancel buttons in modal*/}
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
                        Update
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>


            </ModalContent>
          </Modal>
        </Box>
    )
};

export default ProductCard;