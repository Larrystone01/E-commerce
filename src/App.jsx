import { createContext, useContext, useState, useEffect } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import ProductDisplay from "./components/ProductDisplay";
import { products } from "./components/ProductDisplay";

export const GlobalContext = createContext({});

export function useGlobalContext() {
  return useContext(GlobalContext);
}

function App() {
  const [active, setActive] = useState(1);
  const [activeProductId, setActiveProductId] = useState(products[0].id);
  const [numberOfOrder, setNumberOfOrder] = useState(() => {
    try {
      const saved = localStorage.getItem("cartQuantity");
      return saved ? parseInt(saved, 10) : 0;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return 0;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cartQuantity", numberOfOrder.toString());
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [numberOfOrder]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [cartItem, setCartItem] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const activeProduct = products.find(
    (product) => product.id === activeProductId
  );

  const handleThumbnailClick = (productId) => {
    setActiveProductId(productId);
  };

  const handleNext = () => {
    const currentIndex = products.findIndex(
      (product) => product.id === activeProductId
    );
    const nextIndex = currentIndex + 1;
    setActiveProductId(products[nextIndex].id);
  };

  const handlePrevious = () => {
    // Get the index of the active product from the array, this returns a digit
    const currentIndex = products.findIndex(
      (product) => product.id === activeProductId
    );
    // This subtract one from the current Index to give us the index we intend to go to
    const previousIndex = currentIndex - 1;

    //So we extract the ID at that index from the array (products) and set it to setActiveProductId that updates our ProductId
    setActiveProductId(products[previousIndex].id);
  };

  const handleIncrement = () => {
    setNumberOfOrder((prevNum) => prevNum + 1);
  };

  const handleDecrement = () => {
    setNumberOfOrder((prevNum) => (prevNum > 0 ? prevNum - 1 : 0));
  };
  const handleActive = (linkId) => {
    setActive(linkId);
  };

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };
  const handleModal = () => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;
    setIsModalOpen(!isModalOpen);
  };
  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const removeFromCart = () => {
    setNumberOfOrder(0); // Clear all quantity
  };

  return (
    <GlobalContext.Provider
      value={{
        active,
        handleActive,
        isCartOpen,
        handleCartToggle,
        setIsCartOpen,
        setActive,
        products,
        activeProductId,
        setActiveProductId,
        numberOfOrder,
        setNumberOfOrder,
        activeProduct,
        handleThumbnailClick,
        handleNext,
        handlePrevious,
        handleIncrement,
        handleDecrement,
        isModalOpen,
        setIsModalOpen,
        handleModal,
        isOpen,
        handleMenuToggle,
        removeFromCart,
      }}
    >
      <div className="container mx-auto px-5">
        <Navbar />
        <ProductDisplay />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
