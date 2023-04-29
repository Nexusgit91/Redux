import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItem,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "../Features/cartSlice";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import "./Cart.css";
import ConfirmationModal from "../Modal/ConfirmationModal";
import { openModal, closeModal } from "../Features/modalSlice";

const CartContainer = () => {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);
  const { showModal } = useSelector((state) => state.modal);
  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  const calculateTotal = () => {
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total.toFixed(2);
  };

  return (
    <div className="cart-container">
      <ConfirmationModal
        showModal={showModal}
        closeModal={() => dispatch(closeModal())}
        action={handleClearCart}
      >
        Are you sure you want to clear the cart?
      </ConfirmationModal>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <Image
                  src={item.image}
                  alt={item.name}
                  thumbnail
                  style={{ width: "200px", heigth: "200px" }}
                />
              </td>
              <td>{item.name}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <Button
                  variant="light"
                  onClick={() => handleDecreaseQuantity(item.id)}
                >
                  -
                </Button>
                {item.quantity}
                <Button
                  variant="light"
                  onClick={() => handleIncreaseQuantity(item.id)}
                >
                  +
                </Button>
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">
              <Button
                variant="secondary"
                onClick={() => {
                  dispatch(openModal());
                }}
              >
                Clear Cart
              </Button>
            </td>
            <td>
              <strong>Total:</strong>
            </td>
            <td colSpan="2">
              <strong>${calculateTotal()}</strong>
            </td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
};

export default CartContainer;
