import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";
/* */
const HomePage = () => {

    //Import global state to access all products
    const {fetchProducts,products} = useProductStore();
    
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);
    console.log("Products", products)
    
    return (
        <Container maxW='container.x1' py={12}>
            <VStack spacing={8}>
            {/*Just text styling for our Current Products Header*/}
            <Text
                fontSize={"30"}
                fontWeight={"bold"}
                bgGradient={"linear(to-r, cyan.400, blue.500)"}
                bgClip={"text"}
                textAlign={"center"}
            >
                Current Products 🚀
            </Text>

            {/*This is where we will create our product cards, using simpleGrid chakra objects*/}
            <SimpleGrid
                columns={{
                    base:1,
                    md:2,
                    lg:3,
                }}
                spacing={10}
                w={"full"}
                >
                    {/*I think this is mapping over all of our 'products' from global state and with each one we are going 
                    to be creating a ProductCard chakra element with the ID as a key(not sure exactly what that means) */}
                    {products.map((product) => (
                        <ProductCard key = {product._id} product={product} />
                    ))}

            </SimpleGrid>

            {/*This handles the case when we have no products and want the No Products Found message*/}
            {products.length === 0 && (
                <Text fontSize="x1" textAlign={"center"} fontWeight="bold" color="gray.500">
                No products found 😢 {" "}
                <Link to={"/create"}>
                    <Text as="span" color="blue.500" _hover={{ textDecoration: "underline" }}>
                        Create a product
                    </Text>
                </Link>
              </Text>
            )}
            </VStack>
        </Container>
    )
};

export default HomePage;