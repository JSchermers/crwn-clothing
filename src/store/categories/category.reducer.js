import { CATEGORY_ACTION_TYPES } from "./category.types";

const initial_State = {
    categories: []
}

export const categoriesReducer = (state = initial_State, action = { }) => {
    const {type, payload} = action;
    
    switch(type) {
        case CATEGORY_ACTION_TYPES.SET_CATEGORIES:

        return {
            ...state,
            categories: payload
        }

        default:
           return state
    }
}