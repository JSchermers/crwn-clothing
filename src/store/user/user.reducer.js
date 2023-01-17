import { USER_ACTION_TYPES } from "./user.types";

const initial_State = {
    currentUser: null
}

export const userReducer = (state = initial_State, action) => {
    const {type, payload} = action;
    
    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:

        return {
            ...state,
            currentUser: payload
        }

        default:
           return state
    }
}