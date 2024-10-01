/*This file will contain our GLOBAL STATE and also some functions we can use
 *This is where we will have the functions that make requests to our API so we can
 *update our backend but also we will be able to update the frontend UI*/

//Library that lets us use this 'Global' state
import { create } from "zustand";

/*We are creating a global state that we can use with any components in our application.
 *parameter 'set' is the setter method, we are then returning an object
 *that contains */
export const useProductStore = create((set) => ({
    /*This is the state we have at this moment(empty array)
     *This array will hold all of the products we have in DB*/
    products: [],
    /*Then we have the set state function here*/ 
    setProducts: (products) => set({ products }),

    //This function will allow us to create a new product (we can send a request to our API) 
    //with the information we are given when it is called in the frontend then use the response
    createProduct: async (newProduct) => {
        //check if any of the fields necessary are not filled in
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message:"Please fill in all fields." };
        }

        //This shows how we are contacting our API for the create prodcut functionality
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newProduct),
        })
        //This waits for the response which is an object that contains if it's successful and a message
        const data = await res.json();
        //This updates the state of our UI live, I don't completely understand this JS to the best of my understanding
        //Sets our state, keeps all previous products (...) and then we can add the new product we just
        //from the data object returned from backend
        set((state) => ({ products: [...state.products, data.data] }));

        //return success state if the product was successfully created
        return { success: true, message:"Product created successfully" };
        },

        //This function fetches all of our products from our database through our API I am not going
        // to comment all of them as much but can check craete function if confused about a section
        fetchProducts: async () => {
            //This is the endpoint address for getting all products
            const res = await fetch("/api/products")
            const data = await res.json();
            set({ products: data.data })
        },

        //Deletes products from our database through inputting ID of product
        deleteProduct: async (pid) => {
            const res = await fetch(`/api/products/${pid}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if(!data.success) return { success: false, message: data.message };
            
            //complicated JS, basically deeltes the current product from the state
            //This line is what automatically updates your UI 
            set(state => ({products: state.products.filter(product => product._id !== pid) }));
            return { success: true, message: data.message };
        },

        //This is our update function, look above if confused, 
        //very similar format just different endpoint and goal
        updateProduct: async (pid, updatedProduct) => {
            const res = await fetch(`/api/products/${pid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            });
            const data = await res.json();
            if(!data.success) return { success: false, message: data.message };
           
            /*maps through all of products we have, if the product ID is equal to the ID we passed in(pid)
             *Then update that product's data with the returned data.data, if not keep the product the same
             *This updates the UI immediatly without needing to refresh */
            set(state => ({
                products: state.products.map((product) => (product._id === pid ? data.data : product)),
            }));
            return { success: true, message: data.message };
        },
}));
