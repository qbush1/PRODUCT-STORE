import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

/*This holds the implementation for our NavBar*/
const Navbar = () => {

    /*This is a hook function, I think it basically accesses the live state of the program to 
    find/update some information and then it returns the current color mode, and function to change it*/
    const { colorMode, toggleColorMode } = useColorMode();

    /*If you ever get lost with how to use componenets can always look at their 
        keywords and features on chakra's website */

        /*Putting our Navbar in container makes sure it's always centered on the screen*/
    return (<Container maxW={"1140px"} px={4}>
        {/*Creates a FlexBox that we can add our items to*/}
        <Flex
        h={16}
        alignItems={"Center"}
        /*This gives us space between our items in our NavBar*/
        justifyContent={"space-between"}
        /* I'm pretty sure this adjusts the Navbar from a column to a row as screen size gets smaller*/
        flexDir={{
            base:"column",
            sm:"row"}}  
        >
            {/* This contains our Product Store text and uses a gradient, can see more how it works
            in Gradient section on chakras website */}
            <Text
                /*This is creating responsive font sizing for different screen sizes*/
                fontSize={{ base: "22", sm: "28"}}
                fontWeight={"bold"}
                textTransform={"uppercase"}
                textAlign={"center"}
                bgGradient={"linear(to-r, cyan.400, blue.500)"}
                bgClip={"text"}
            >
                {/*Links this text to our homepage*/}
                <Link to={"/"}>Product Store 🛒</Link>
            </Text>
            
            {/*Now we are trying to create the two buttons (create and night mode) in Navbar*/}
            <HStack spacing={2} alignItems={"center"}>
                {/* This links our '+' button to the '/create' page*/}
                <Link to={"/create"}>
                    <Button>
                        {/* Need to install react icons or chakra's icons to use this component (Put install in notes) */}
                        <PlusSquareIcon fontSize={20} />
                    </Button>
                </Link>
                {/*When button is clicked call our hook function above, depending on current color we can show different icons*/}
                <Button onClick={toggleColorMode}>
                    {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
                </Button>
            </HStack>

        </Flex>

    </Container>

    )
};

export default Navbar;