import { CATEGORY_ACTION_TYPES } from "./category.types";

const initial_State = {
    categories: [],
    isLoading: false,
    error: null
}

export const categoriesReducer = (state = initial_State, action = { }) => {
    const {type, payload} = action;
    
    switch(type) {

        case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START:
            return {...state, isLoading: true}

        case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCES:

        return {
            ...state,
            categories: payload,
            isLoading: false
        }
        case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAIL:

        return {
            ...state,
            isLoading: false,
            error: payload
        }

        default:
           return state
    }
}