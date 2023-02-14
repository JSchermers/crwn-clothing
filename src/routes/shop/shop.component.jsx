import { useEffect } from "react"
import {Routes, Route } from 'react-router-dom'
import { useDispatch } from "react-redux";
import {getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils"
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { setCategories} from "../../store/categories/category.actions";
// import { fetchCategoriesAsync } from "../../store/categories/category.actions";
import { fetchCategoriesStart } from "../../store/categories/category.actions";



const Shop = () => {
    // redux thunk
    const dispatch = useDispatch();
    useEffect(() => {
        // const getCategoriesMap = async() => {
        //     // const categoriesArray = await getCategoriesAndDocuments("categories")
        //     // console.log(categoriesArray)
        //     dispatch(setCategories(fetchCategoriesAsync()));
        // }
        // getCategoriesMap();

        // redux thunk
        // dispatch(fetchCategoriesAsync());
        dispatch(fetchCategoriesStart())
    }, [])
    


    return <Routes>
        <Route index element={<CategoriesPreview/>} />
        <Route path=":category" element={<Category/>} />
    </Routes>
}

export default Shop