import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setShowCart = (boolean) => createAction(CART_ACTION_TYPES.SET_SHOW_CART, boolean)

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

export const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)
}

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.UPDATE_CART_ITEMS, newCartItems);
 }

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
     const newCartItems = removeCartItem(cartItems, cartItemToRemove);
     return createAction(CART_ACTION_TYPES.UPDATE_CART_ITEMS, newCartItems);
 }

export const deleteItemFromCart = (cartItems, cartItemToRemove) => {
     const newCartItems = clearCartItem(cartItems, cartItemToRemove);
     return createAction(CART_ACTION_TYPES.UPDATE_CART_ITEMS, newCartItems);
 }