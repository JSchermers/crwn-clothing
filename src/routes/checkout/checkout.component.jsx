import "./../checkout/checkout.styles.scss";
// import { useContext } from "react";
// import { CartContext } from "../../context/cart.context";
import CheckOutItem from "../../components/checkout-item/checkout-item.component";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";


const CheckOut = () => {
    // const {cartItems, cartTotal} = useContext(CartContext);
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);



    return <div className="checkout-container">
        <h1>Checkout</h1>
        <div className="checkout-header">
            <div className="header-block">
                <span>Product</span>
            </div>
            <div className="header-block">
                <span>Description</span>
            </div>
            <div className="header-block">
                <span>Quantity</span>
            </div>   
            <div className="header-block">
                <span>Price</span>
            </div>
            <div className="header-block">
                <span>Remove</span>
            </div>
        </div>
        

        {cartItems.map((item) => {
               return <CheckOutItem key={item.id} cartitem={item} />            
            })}
        
        <span className="total">Total: {cartTotal}</span>
    </div>
}

export default CheckOut;