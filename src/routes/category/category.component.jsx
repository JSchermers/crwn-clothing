import "./category.styles.scss"
import { useParams } from "react-router-dom"
import { useState, useEffect, Fragment } from "react";
// import { CategoriesContext } from "../../context/categories.context";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";
import ProductCard from "../../components/product-card/product-card.component";


const Category = () => {
    const {category} = useParams();
    const categoriesMap  = useSelector(selectCategoriesMap); 

    const [products, setProducts ] = useState(categoriesMap[category]);

    console.log("render/re-rendering category component")

    useEffect(() => {
        console.log("effect fired calling setproducts")
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return <Fragment>
        <h2 className="category-item-title">{category.toUpperCase()}</h2>
        <div className="category-item-container">
        {
            products && products.map((product) => <ProductCard key={product.id} product={product}/>)
        }
    </div></Fragment>
}

export default Category