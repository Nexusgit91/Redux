import CartContainer from "./Cart/CartContainer";
import { Provider, useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar/Navbar";
import { Modal } from "react-bootstrap";
import Modals from "./Modal/ConfirmationModal";

function App() {
  return (
    <>
      <Navbar />
      <CartContainer />
    </>
  );
}

export default App;
