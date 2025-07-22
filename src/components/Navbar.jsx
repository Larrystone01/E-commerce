import React, { useContext, useState } from "react";
import { GlobalContext, useGlobalContext } from "../App";

const Navbar = () => {
  const {
    active,
    setActive,
    handleActive,
    isCartOpen,
    setIsCartOpen,
    numberOfOrder,
    activeProduct,
    handleCartToggle,
    isOpen,
    handleMenuToggle,
    removeFromCart,
  } = useGlobalContext();

  //Same as the one above
  // const { active, setActive, handleActive, isCartOpen, setIsCartOpen } =
  //   useContext(GlobalContext);

  return (
    <div>
      <nav className="container md:px-6 pt-6 relative">
        <div className="nav-container flex justify-between md:border-b border-b-[hsl(220,14%,75%)] pb-7">
          <div className="logos-links flex flex-row-reverse items-center md:flex md:flex-row gap-4 md:gap-15">
            <div>
              <img src="/images/logo.svg" alt="" />
            </div>
            <button
              className="hamburger md:hidden cursor-pointer"
              onClick={handleMenuToggle}
            >
              <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16 12v3H0v-3h16Zm0-6v3H0V6h16Zm0-6v3H0V0h16Z"
                  fill="#69707D"
                  fillRule="evenodd"
                />
              </svg>
            </button>
            <ul
              className={`${
                isOpen ? "flex" : "hidden"
              } navlinks md:static z-30 md:z-0 fixed top-0 left-0 flex-col h-full bg-white w-[75%] px-7 py-5 gap-6 text-black font-bold md:font-normal md:text-[16px] text-2xl self-center md:flex md:flex-row`}
            >
              {isOpen && (
                <button
                  onClick={() => {
                    handleMenuToggle(false);
                  }}
                  className="mb-7"
                >
                  <svg
                    width="14"
                    height="15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
                      fill="#69707D"
                      fill-rule="evenodd"
                    />
                  </svg>
                </button>
              )}
              {navlinks.map((link) => {
                const isActive = link.id === active;
                return (
                  <li
                    key={link.id}
                    className={`${
                      isActive
                        ? "md:border-b-2 md:border-solid md:border-b-[hsl(26,100%,55%)]"
                        : ""
                    } `}
                  >
                    <a
                      href="#"
                      className="relative pb-2 text-black md:text-[hsl(220,14%,75%)] md:hover:text-[hsl(220,13%,13%)]"
                      onClick={() => {
                        handleActive(link.id);
                      }}
                    >
                      {link.name}
                      <span className="after:content-[''] after:absolute after:w-[10px] after:h-[2px] after:left-0 after:bottom-0 bg-[hsl(26,100%,55%)] after:block"></span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <div
              className={`${
                isOpen ? "block" : "hidden"
              } fixed bg-black/70 inset-0 h-full z-20`}
            ></div>
          </div>
          <div className="cart-profile flex md:items-center gap-4 md:gap-10">
            <div
              className="self-center relative cursor-pointer"
              onClick={handleCartToggle}
            >
              <img src="/images/icon-cart.svg" alt="" />
              <span
                className={`absolute top-0 right-0 text-[10px] align-super w-[15px] h-[15px] text-center ${
                  numberOfOrder > 0 ? "bg-[hsl(26,100%,55%)]" : ""
                } text-white rounded-[6px]`}
              >
                {numberOfOrder > 0 ? numberOfOrder : ""}
              </span>
            </div>
            <div className="md:h-[50px] md:w-[50px] h-[30px] w-[30px] rounded-full cursor-pointer hover:border hover:border-[hsl(26,100%,55%)]">
              <img src="/images/image-avatar.png" alt="" />
            </div>
          </div>
          {isCartOpen && (
            <div className="absolute md:right-5 md:top-20 top-30 z-10 w-full p-6 bg-white shadow-xl rounded-xl min-h-[300px] md:min-h-[255px] md:max-w-[350px] mx-auto">
              <h2 className="border-b pb-8 font-bold">Cart</h2>
              {numberOfOrder > 0 ? (
                <>
                  <div className="flex gap-4 items-center mt-9">
                    <img
                      src={activeProduct.img}
                      alt=""
                      className="w-[50px] h-[50px]"
                    />
                    <div className="flex flex-col gap-0 justify-center">
                      <h1 className="capitalize text-[16px] text-[hsl(220,14%,75%)] leading-none self-center md:leading-none font-medium md:mb-1">
                        fall limited edition sneakers
                      </h1>
                      <p className="text-[hsl(220,14%,75%)]">
                        $125 x {numberOfOrder}{" "}
                        <span className="ml-3 font-bold text-black">
                          ${125 * numberOfOrder}
                        </span>
                      </p>
                    </div>
                    <button onClick={removeFromCart}>
                      <img src="/images/icon-delete.svg" alt="" />
                    </button>
                  </div>
                  <button className="bg-[hsl(26,100%,55%)] w-full py-2 px-8 rounded-[10px] mt-6 font-bold">
                    Checkout
                  </button>
                </>
              ) : (
                <div className="flex justify-center items-center min-h-[50px]">
                  <h1>Your Cart is empty</h1>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

const navlinks = [
  { name: "Collections", id: 1 },
  { name: "Men", id: 2 },
  { name: "Women", id: 3 },
  { name: "About", id: 4 },
  { name: "Contact", id: 5 },
];

export default Navbar;
