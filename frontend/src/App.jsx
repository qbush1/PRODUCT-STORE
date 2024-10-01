import { Routes, Route } from "react-router-dom"
import { Box, useColorModeValue } from "@chakra-ui/react";
import CreatePage from "./pages/CreatePage"
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";

function App() {

  return (
    /* Giving Box this min height makes sure it takes up the whole screen 
     *Can hover over useColorModeValue function to see how it works by putting it here it 
     changes the entire background of the application when changing light and dark modes*/
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      {/*Putting NavBar above the routes means whatever page we are on we can always see it*/}
      <Navbar /> 
      {/* Holds the different routes users can be directed to (different pages)*/}
      <Routes>
        {/* This tells us that when user is at home page ("/") they should see the HomePage component */}
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
      
    </Box>
  );
}

export default App
