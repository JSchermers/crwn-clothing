import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg"
import "./cart-icon.styles.scss"
import { useContext } from "react"
import { CartContext } from "../../context/cart.context"

const CartIcon = () => {
    const {showCart, setShowCart, cartCount } = useContext(CartContext);

    const toggleSetShowCart = () => setShowCart(!showCart)

    return <div className="cart-icon-container" onClick={toggleSetShowCart}>
        <ShoppingIcon className="shopping-icon"/>
        <span className="item-count">{cartCount}</span>
    </div>
}

export default CartIcon