import { useReducer } from "react";
import { createContext, useEffect } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find((cartitem) => cartitem.id === cartItemToRemove.id);

    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id 
    ? {...cartItemToRemove, quantity: cartItem.quantity - 1} 
    : cartItem
    )

}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)
}

export const CART_ACTIONS = {
    UPDATE_CART_ITEMS: "UPDATE_CART_ITEMS",
    SET_SHOW_CART: "SET_SHOW_CART"
}

const initial_State = {
    showCart: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const cartReducer = (state, action) => {
    const { type, payload} = action

    switch(type) {
        // case CART_ACTIONS.SET_CART_COUNT:
        //     return {
        //         ...state,
        //         cartCount: payload
        //     }
   
        // case CART_ACTIONS.SET_CART_TOTAL:
        //     return {
        //         ...state,
        //         cartTotal: payload
        //     }

        case CART_ACTIONS.UPDATE_CART_ITEMS: 
            return {
                ...state,
                ...payload
            }
        case CART_ACTIONS.SET_SHOW_CART:
            return {
                ...state,
                showCart: payload
            }

        default:
            throw new Error (`Unhandled type from ${type} reducer`);
    }
}


// actual value for acces
export const CartContext = createContext({
    showCart: false,
    setShowCart: () => null,
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    deleteItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});


export const CartProvider = ({children}) => {
    // const [showCart, setShowCart] = useState(false);
    const [state, dispatch] = useReducer(cartReducer, initial_State);
    const {cartItems, cartCount, cartTotal, showCart} = state;

    const setShowCart = () => {
        dispatch(createAction(CART_ACTIONS.SET_SHOW_CART, !showCart))
    }

    // const [ cartItems, setCartItems ] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);

    // useEffect(() => {
    //     const newCartCount = cartItems.reduce((total, cartItem) => {
    //         return total + cartItem.quantity
    //     }, 0)
    //     setCartCount(newCartCount)
    // }, [cartItems])

    // useEffect(() => {
    //     const newCartTotal = cartItems.reduce((total, cartItem) => {
    //         return total + cartItem.quantity * cartItem.price
    //     }, 0)
    //     setCartTotal(newCartTotal)
    // }, [cartItems])


    const updateCartItemsReducer = (newCartItems) => {
        const newCartTotal = newCartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity * cartItem.price
        }, 0)

        const newCartCount = newCartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity
        }, 0)

        dispatch(createAction(CART_ACTIONS.UPDATE_CART_ITEMS, {
            cartTotal: newCartTotal,
            cartCount: newCartCount,
            cartItems: newCartItems
        }))      
    }

    const addItemToCart = (productToAdd) => {
       const newCartItems = addCartItem(cartItems, productToAdd);
       updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems)
    }

    const deleteItemFromCart = (cartItemToRemove) => {
        const newCartItems = clearCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems)
    }
    
    const value = {showCart, setShowCart, addItemToCart, cartItems, cartCount, removeItemFromCart, deleteItemFromCart, cartTotal};



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