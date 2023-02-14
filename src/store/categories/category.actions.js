
import { createAction } from "../../utils/reducer/reducer.utils"
import { CATEGORY_ACTION_TYPES } from "./category.types";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export const fetchCategoriesStart = () => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START)

export const fetchCategoriesSuccess = (categoriesArray) => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCES, categoriesArray)

export const fetchCategoriesFail = (error) => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAIL, error)

// This code is an asynchronous function that dispatches an action to start fetching categories, then attempts to get the categories and documents from an API. If successful, it dispatches an action to indicate success and passes the categories array. If unsuccessful, it dispatches an action to indicate failure and passes the error.
export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCategoriesStart())
    try {
        const categoriesArray = await getCategoriesAndDocuments("categories");
        dispatch(fetchCategoriesSuccess(categoriesArray))
    }
    catch (error) {
        dispatch(fetchCategoriesFail(error))
    }
}