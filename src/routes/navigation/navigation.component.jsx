import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import "./navigation.styles.scss";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"

const Navigation = () => {
    return <Fragment>
      <div className="navigation">
        <Link className="logo-container" to={"/"}>
            <CrwnLogo className="logo" />
        </Link>
        <nav>
            <ul className="nav-links-container">
                <li><Link className="{nav-link}" to={"/shop"}>Shop</Link></li>
            </ul>
        </nav>
      </div>
      <Outlet/>
    </Fragment>
  }

  export default Navigation