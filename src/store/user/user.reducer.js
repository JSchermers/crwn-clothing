import { USER_ACTION_TYPES } from "./user.types";

const initial_State = {
    currentUser: null,
    isLoading: false,
    error: null
}

export const userReducer = (state = initial_State, action) => {
    const {type, payload} = action;
    
    switch(type) {
        case USER_ACTION_TYPES.SIGN_IN_SUCCES:
        return {
            ...state,
            currentUser: payload,
        }
        case USER_ACTION_TYPES.SIGN_OUT_SUCCES:
            return {
                ...state,
                currentUser: null
            }

        case USER_ACTION_TYPES.SIGN_OUT_FAILED: 
        case USER_ACTION_TYPES.SIGN_IN_FAILED:
        case USER_ACTION_TYPES.SIGN_UP_FAILED:
        return {
            ...state,
            error: payload
        }

        default:
           return state
    }
}