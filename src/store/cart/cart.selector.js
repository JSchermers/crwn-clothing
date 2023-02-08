import { createSelector } from "reselect"

const selectCartReducer = state => state.cart

export const selectCartItems = createSelector([selectCartReducer], (cart) => cart.cartItems)
export const selectShowCart = createSelector([selectCartReducer], (cart) => cart.showCart);
export const selectCartCount = createSelector([selectCartItems], (cartitems) => cartitems.reduce((total, cartItem) => 
    total + cartItem.quantity
, 0));
export const selectCartTotal = createSelector([selectCartItems], (cartitems) => cartitems.reduce((total, cartItem) => 
    total + cartItem.quantity * cartItem.price
, 0));

// const newCartTotal = newCartItems.reduce((total, cartItem) => {
//     return total + cartItem.quantity * cartItem.price
// }, 0)

// const newCartCount = newCartItems.reduce((total, cartItem) => {
//     return total + cartItem.quantity
// }, 0)