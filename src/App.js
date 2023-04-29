import CartContainer from "./Cart/CartContainer";
import { Provider, useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar/Navbar";
import { Modal } from "react-bootstrap";
import Modals from "./Modal/ConfirmationModal";
import { useEffect } from "react";
import { getCartItems } from "./Features/cartSlice";

function App() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.cart.status);

  // useEffect(() => {
  //   dispatch(getCartItems("name"));
  // }, [dispatch]);

  return (
    <>
      <Navbar />
      {status === "loading" ? (
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <CartContainer />
      )}
    </>
  );
}

export default App;
