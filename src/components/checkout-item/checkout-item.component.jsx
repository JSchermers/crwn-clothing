import "./checkout-item.styles.scss"
// import { useContext } from "react"
// import { CartContext } from "../../context/cart.context"

import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { addItemToCart, removeItemFromCart, deleteItemFromCart, clearCartItem } from "../../store/cart/cart.action";


const CheckOutItem = ({cartitem}) => {
    // const {deleteItemFromCart,  addItemToCart, removeItemFromCart} = useContext(CartContext)
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems)
    const { name, imageUrl, price, quantity } = cartitem;

    const clearItemFromCartHandler = () => dispatch(deleteItemFromCart(cartItems, cartitem));

    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartitem))
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartitem))

    return <div className="checkout-item-container">
        <div className="image-container"> 
        <img src={imageUrl} alt={name}/>
        </div>
        <span className="name">{name}</span>
        <span className="quantity">
            <div className="arrow" onClick={removeItemHandler}>&#10094;</div>
            <span className="value">{quantity}</span>
            <div className="arrow" onClick={addItemHandler}>&#10095;</div>
            </span>

        <span className="price">{price}</span>
        <div onClick={clearItemFromCartHandler} className="remove-button">&#10005;</div>
    </div>
}

export default CheckOutItem