import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import "./navigation.styles.scss";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { useSelector } from "react-redux";
// import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
// import { CartContext } from "../../context/cart.context";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectShowCart } from "../../store/cart/cart.selector";

const Navigation = () => {

  const currentUser = useSelector(selectCurrentUser)
  const showCart = useSelector(selectShowCart)

  // const { currentUser } = useContext(UserContext);

  // const signOutHandler = async() => {
  //   await signOutUser();
  //   setCurrentUser(null);

  // }
    return <Fragment>
      <div className="navigation">
        <Link className="logo-container" to={"/"}>
            <CrwnLogo className="logo" />
        </Link>
        <nav className="">
            <ul className="nav-links-container">
                <li><Link className="{nav-link}" to={"/shop"}>Shop</Link></li>
                {currentUser ? <span className="{nav-link}" onClick={signOutUser}>SignOut</span> : <li><Link className="{nav-link}" to={"/auth"}>SignIn</Link></li>  }
                <CartIcon/>
            </ul>
        {showCart && <CartDropdown/> }
        </nav>
      </div>
      <Outlet/>
    </Fragment>
  }

  export default Navigation