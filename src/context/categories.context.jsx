import { createContext, useState, useEffect } from 'react';
import Shop_Data from "../shop-data.js"
// import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';

// actual value for acces
export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    const value = {categoriesMap, setCategoriesMap};

    useEffect(() => {
        const getCategoriesMap = async() => {
            const categoryMap = await getCategoriesAndDocuments()
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
        // addCollectionAndDocuments("categories", Shop_Data)
        
        // const unsubscribe = onAuthStateChangedListener((user) => {
        //     if(user) {
        //         createUserDocumentFromAuth(user);
        //     }
        //     setCurrentUser(user);
        // });

        // return unsubscribe
    }, [])

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}