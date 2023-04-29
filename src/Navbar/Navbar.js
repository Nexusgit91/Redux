import React from "react";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import "./nav.css";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  //calculate the totla no of items in the cart
  const cartQuantity = cartItems.reduce(
    (accumulator, item) => accumulator + item.quantity,
    0
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          My Store
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/products">
                Products
              </a>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaShoppingCart size={30} />

                <span className="cart-quantity">{cartQuantity}</span>
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {cartItems.map((item) => (
                  <li key={item.id}>
                    <a className="dropdown-item" href="#">
                      {item.name} ({item.quantity})
                    </a>
                  </li>
                ))}
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="/cart">
                    View Cart
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
