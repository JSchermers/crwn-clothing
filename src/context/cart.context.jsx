import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    
    const existingCartItem = cartItems.find((cartitem) => cartitem.id === productToAdd.id)

    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id 
        ? {...productToAdd, quantity: cartItem.quantity + 1} 
        : cartItem
        )
    }
    
    return [...cartItems, {...productToAdd, quantity: 1}]
}

// actual value for acces
export const CartContext = createContext({
    showCart: false,
    setShowCart: () => null,
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0
});

export const CartProvider = ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const [ cartItems, setCartItems ] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity
        }, 0)
        setCartCount(newCartCount)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }
    
    const value = {showCart, setShowCart, addItemToCart, cartItems, cartCount};



    useEffect(() => {
        // const unsubscribe = onAuthStateChangedListener((user) => {
        //     if(user) {
        //         createUserDocumentFromAuth(user);
        //     }
        //     setCurrentUser(user);
        // });

        // return unsubscribe
    }, [])

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}