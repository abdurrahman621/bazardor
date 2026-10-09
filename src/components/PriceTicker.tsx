import { useEffect, useState } from "react"



const priceTicker=()=>{
    const[products,setproducts]=useState<product[]>([]);

    useEffect(()=>{
        const loadProducts=async()={
            try {
                const data =await getProducts();
                setproducts(data)
            }catch(error){
                console.error("price ticker load failed",error);
            }   
        }
        loadProducts()
    },[])
    
    const formatPrice=(price:number)
    price.toLocaleString("bn-BD")
    
    if(products.length===0){
        return null
    }
    
}