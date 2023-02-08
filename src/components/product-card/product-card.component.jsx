import "../product-card/product-card.styles.scss"
import Button from "../button/button.component";
// import { useContext } from "react";
// import { CartContext } from "../../context/cart.context";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";


const ProductCard = ({product}) => {
    const {name, price, imageUrl} = product; 
    const cartItems = useSelector(selectCartItems)
    // const { addItemToCart } = useContext(CartContext);
    const dispatch = useDispatch()

    const addProductToCart = () => {
        dispatch(addItemToCart(cartItems, product))
    }

    return <div className="product-card-container">
        <img src={imageUrl} alt={name}/>
        <div className="footer">
            <span className="name">{name}</span>
            <span className="price">{price}</span>
        </div>
        <Button buttonType="inverted" onClick={addProductToCart}>Add to Card</Button>
    </div>
}   

export default ProductCard