import { createContext, useState, useEffect } from "react";


// actual value for acces
export const CartContext = createContext({
    showCart: false,
    setShowCart: () => null
});

export const CartProvider = ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const value = {showCart, setShowCart};

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