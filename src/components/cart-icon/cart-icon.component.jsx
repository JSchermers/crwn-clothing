import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg"
import "./cart-icon.styles.scss"
import { selectCartCount, selectShowCart } from "../../store/cart/cart.selector";
import { setShowCart } from "../../store/cart/cart.action";
// import { useContext } from "react"
// import { CartContext } from "../../context/cart.context"

const CartIcon = () => {
    // const {showCart, setShowCart, cartCount } = useContext(CartContext);
    // const {showCart, setShowCart, cartCount } = useSelector(CartContext);
    const dispatch = useDispatch()
    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectShowCart)

    const toggleSetShowCart = () => dispatch(setShowCart(!isCartOpen))

    return <div className="cart-icon-container" onClick={toggleSetShowCart}>
        <ShoppingIcon className="shopping-icon"/>
        <span className="item-count">{cartCount}</span>
    </div>
}

export default CartIcon