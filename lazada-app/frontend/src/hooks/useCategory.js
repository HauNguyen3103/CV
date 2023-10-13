import {useState, useEffect} from "react";
import  axios from 'axios';


export default function useCategory() {
    const [products, setProducts] = useState([]);

    // get cat 
    const getProducts = async () => {
        try {
            const data = await axios.get('http://localhost:3001/api/customer/product/get-all');
            setProducts(data?.data.data);

        } catch (error) {
            console.log(error)
        }
    }


   useEffect(() => {
        getProducts()
   },[])


   return products;
}
