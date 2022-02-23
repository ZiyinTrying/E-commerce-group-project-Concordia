import React, { createContext, useState, useEffect } from "react";

export const ItemsContext = createContext(null);

export const ItemsProvider = ({ children }) => {
    //variable to store data from fetch "/items"
    const [items, setItems] = useState(null);

    //variable to store items that are being added in the cart
    const [cartItems, setCartItems] = useState([]);

    //getting array with selected items from localStorage
    const [currentCart, setCurrentCart] = useState(() => { 
        const cart = localStorage.getItem("cartItems");
        return cart !== null ? JSON.parse(cart) : [];    
    }) 
    
    //variable that is in charge of reRendering when it's neccessary
    const [reRender, setReRender] = useState(false);

    useEffect(() => {
        const cart = localStorage.getItem("cartItems");
        cart !== null ? setCartItems(JSON.parse(cart)) : setCartItems([]); 
        cart !== null ? setCurrentCart(JSON.parse(cart)) : setCurrentCart([]); 
    }, [reRender])

    useEffect(() => {
        fetch('/items')
        .then(res => res.json())
        .then(data => {
            setItems(data.data)
        })
        .catch((err) => {
            console.log("error");
        });
    }, []);
    
    return (
        <ItemsContext.Provider value={{
            items,
            setItems,
            cartItems,
            setCartItems,
            currentCart,
            setCurrentCart,
            reRender, 
            setReRender
        }}>
            {children}
        </ItemsContext.Provider>
    )
}
