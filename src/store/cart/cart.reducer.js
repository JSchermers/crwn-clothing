import { CART_ACTION_TYPES } from "./cart.types"

export const cart_initial_State = {
    showCart: false,
    cartItems: [],
    // cartCount: 0,
    // cartTotal: 0
}

export const cartReducer = (state = cart_initial_State, action = {}) => {
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

        case CART_ACTION_TYPES.UPDATE_CART_ITEMS: 
            return {
                ...state,
                cartItems: payload
            }
        case CART_ACTION_TYPES.SET_SHOW_CART:
            return {
                ...state,
                showCart: payload
            }

        default:
            return state
    }
}