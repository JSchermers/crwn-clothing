import { takeLatest, all , call , put } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import { fetchCategoriesSuccess, fetchCategoriesFail } from "./category.actions";

import { CATEGORY_ACTION_TYPES } from "./category.types";





// This code is an asynchronous function that dispatches an action to start fetching categories, then attempts to get the categories and documents from an API. If successful, it dispatches an action to indicate success and passes the categories array. If unsuccessful, it dispatches an action to indicate failure and passes the error.
// export const fetchCategoriesAsync = () => async (dispatch) => {
//     dispatch(fetchCategoriesStart())
//     try {
//         const categoriesArray = await getCategoriesAndDocuments("categories");
//         dispatch(fetchCategoriesSuccess(categoriesArray))
//     }
//     catch (error) {
//         dispatch(fetchCategoriesFail(error))
//     }
// }

export function* fetchCategoriesAsync () {
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments, "categories");
        yield put(fetchCategoriesSuccess(categoriesArray))
    }
    catch (error) {
        yield put(fetchCategoriesFail(error))
    }
}

export function* onFetchCategories(){
    // only listen to the latest.. f.e. when more are firing
    yield takeLatest(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}


export function* categoriesSaga() {
    yield all([call(onFetchCategories)])
}