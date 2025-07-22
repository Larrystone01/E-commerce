import React, { useState } from "react";
import { useGlobalContext } from "../App";

const ProductDisplay = () => {
  const {
    products,
    activeProductId,
    setActiveProductId,
    numberOfOrder,
    setNumberOfOrder,
    activeProduct,
    handleThumbnailClick,
    handleDecrement,
    handleIncrement,
    handleNext,
    handlePrevious,
    isModalOpen,
    handleModal,
  } = useGlobalContext();
  // const [activeProductId, setActiveProductId] = useState(products[0].id);
  // const [orderNumber, setOrderNumber] = useState(0);
  // const activeProduct = products.find(
  //   (product) => product.id === activeProductId
  // );

  // const handleThumbnailClick = (productId) => {
  //   setActiveProductId(productId);
  // };

  // const handleNext = () => {
  //   const currentIndex = products.findIndex(
  //     (product) => product.id === activeProductId
  //   );
  //   const nextIndex = (currentIndex + 1) % products.length;
  //   setActiveProductId(products[nextIndex].id);
  // };

  // const handleIncrement = () => {
  //   setOrderNumber((prevNum) => prevNum + 1);
  // };

  // const handleDecrement = () => {
  //   setOrderNumber((prevNum) => (prevNum > 0 ? prevNum - 1 : 0));
  // };
  return (
    <>
      <div className=" pt-10 md:grid md:grid-cols-2 flex flex-col gap-15 md:gap-[150px] md:px-[100px]">
        <div className="product-side -m-5">
          <div
            className="product-img flex flex-col md:flex-none md:w-[440px] md:h-[440px] cursor-pointer relative justify-center md:static"
            onClick={handleModal}
          >
            <button
              className="bg-white group w-[50px] h-[50px] absolute left-3.5 flex justify-center items-center  p-3 rounded-[50%] cursor-pointer md:hidden"
              onClick={handlePrevious}
            >
              <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11 1 3 9l8 8"
                  stroke="#1D2026"
                  strokeWidth="3"
                  fill="none"
                  fillRule="evenodd"
                  className="group-hover:stroke-orange-600 transition-colors duration-300"
                />
              </svg>
            </button>
            <img src={activeProduct.img} alt="" className="md:rounded-xl" />
            <button
              className="bg-white group w-[50px] h-[50px] absolute right-3.5 flex justify-center items-center self-center p-3 rounded-[50%] cursor-pointer md:hidden"
              onClick={handleNext}
            >
              <svg width="13" height="18" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m2 1 8 8-8 8"
                  stroke="#1D2026"
                  strokeWidth="3"
                  fill="none"
                  fillRule="evenodd"
                  className="group-hover:stroke-orange-600 transition-colors duration-300"
                />
              </svg>
            </button>
          </div>
          <div className="products-thumbnails md:flex gap-6 mt-7 hidden">
            {products.map((product) => {
              const isActive = product.id === activeProductId;
              return (
                <div
                  className={`w-[100px] h-[100px] group relative cursor-pointer ${
                    isActive
                      ? "border-[3px] border-[hsl(26,100%,55%)] rounded-[8px] ov"
                      : ""
                  }`}
                  key={product.id}
                >
                  <img
                    src={product.imgthumbnail}
                    alt=""
                    onClick={() => handleThumbnailClick(product.id)}
                    className="rounded-[8px] hover:bg-white/70"
                  />
                  <div
                    className={`absolute inset-0 rounded-[8px] pointer-events-none transition-opacity duration-200 ${
                      isActive
                        ? "bg-white/80"
                        : "bg-white/0 group-hover:bg-white/60"
                    }`}
                  ></div>
                </div>
              );
            })}
            <button
              className="border w-[60px] h-[60px]"
              style={{ display: "none" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
        <div className="pricing-side flex flex-col justify-center gap-2">
          <h1 className="uppercase tracking-[0.2em] font-bold text-[hsl(220,14%,75%)] md:text-[12px]">
            sneaker company
          </h1>
          <h1 className="capitalize text-[45px] font-semibold leading-none mb-5">
            fall limited edition sneakers
          </h1>
          <p className="text-[hsl(220,14%,75%)] text-left mb-3">
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable outer sole, they'll withstand everything the
            weather can offer.
          </p>
          <div className="prices-discount flex justify-between md:block">
            <p className="price font-bold text-[25px] flex gap-3">
              <span>$125.00</span>
              <span className="bg-black text-white py-1 px-2 text-[12px] rounded-[5px] self-center">
                50%
              </span>
            </p>
            <p className="slash-price line-through text-[hsl(220,14%,75%)] md:text-[12px] mb-3">
              $250.00
            </p>
          </div>

          <div className="buttons-addToCart flex flex-col md:flex-row gap-3">
            <div className="plus-minus flex justify-between bg-[hsl(223,64%,98%)] md:py-3 py-5 px-3 w-full md:w-[150px] rounded-[10px]">
              <button className="cursor-pointer" onClick={handleDecrement}>
                <img src="/images/icon-minus.svg" alt="" />
              </button>
              <p className="select-none font-bold text-black">
                {numberOfOrder}
              </p>
              <button className="cursor-pointer" onClick={handleIncrement}>
                <img src="/images/icon-plus.svg" alt="" />
              </button>
            </div>
            <button
              className="bg-[hsl(26,100%,55%)] hover:bg-[hsl(25,100%,94%)] flex justify-center md:py-3 md:px-15 py-5 px-3 gap-3 rounded-[8px] text-black cursor-pointer mb-10 md:mb-0"
              onClick={handleIncrement}
            >
              <img src="/images/icon-cart-black.svg" alt="" />
              <span className="inline font-bold">Add to cart</span>
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal absolute flex justify-center items-center flex-col inset-0 h-[100svh] bg-black/60">
          <button
            className="ml-[365px] mb-[20px] group cursor-pointer"
            onClick={() => handleModal(false)}
          >
            <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg">
              <path
                d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
                fill="#FFFFFF"
                fill-rule="evenodd"
                className="group-hover:fill-orange-600 transition-colors duration-300"
              />
            </svg>
          </button>
          <div className="img flex relative">
            <button
              className="bg-white group w-[50px] h-[50px] absolute left-[-20px] flex justify-center items-center self-center p-3 rounded-[50%] cursor-pointer"
              onClick={handlePrevious}
            >
              <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11 1 3 9l8 8"
                  stroke="#1D2026"
                  strokeWidth="3"
                  fill="none"
                  fillRule="evenodd"
                  className="group-hover:stroke-orange-600 transition-colors duration-300"
                />
              </svg>
            </button>
            <img
              src={activeProduct.img}
              alt=""
              className="w-[390px] h-[390px] rounded-xl select-none"
            />
            <button
              className="bg-white group w-[50px] h-[50px] absolute right-[-20px] flex justify-center items-center self-center p-3 rounded-[50%] cursor-pointer"
              onClick={handleNext}
            >
              <svg width="13" height="18" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m2 1 8 8-8 8"
                  stroke="#1D2026"
                  strokeWidth="3"
                  fill="none"
                  fillRule="evenodd"
                  className="group-hover:stroke-orange-600 transition-colors duration-300"
                />
              </svg>
            </button>
          </div>
          <div className="products-thumbnails flex gap-6 mt-7">
            {products.map((product) => {
              const isActive = product.id === activeProductId;
              return (
                <div
                  className={`w-[70px] h-[70px] group relative cursor-pointer ${
                    isActive
                      ? "border-[3px] border-[hsl(26,100%,55%)] rounded-[8px] ov"
                      : ""
                  }`}
                  key={product.id}
                >
                  <img
                    src={product.imgthumbnail}
                    alt=""
                    onClick={() => handleThumbnailClick(product.id)}
                    className="rounded-[8px] hover:bg-white/70"
                  />
                  <div
                    className={`absolute inset-0 rounded-[8px] pointer-events-none transition-opacity duration-200 ${
                      isActive
                        ? "bg-white/80"
                        : "bg-white/0 group-hover:bg-white/60"
                    }`}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export const products = [
  {
    id: 1,
    img: "/images/image-product-1.jpg",
    imgthumbnail: "/images/image-product-1-thumbnail.jpg",
  },
  {
    id: 2,

    img: "/images/image-product-2.jpg",
    imgthumbnail: "/images/image-product-2-thumbnail.jpg",
  },
  {
    id: 3,
    img: "/images/image-product-3.jpg",
    imgthumbnail: "/images/image-product-3-thumbnail.jpg",
  },
  {
    id: 4,
    img: "/images/image-product-4.jpg",
    imgthumbnail: "/images/image-product-4-thumbnail.jpg",
  },
];

export default ProductDisplay;
