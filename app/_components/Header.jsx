"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import { Cart } from "./Cart";
import { CartContext } from "../_context/CartContext";
import CartApis from "../_utils/CartApis";
export const Header = () => {
  const { user } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const { cart, setCart } = useContext(CartContext);
  useEffect(() => {
    setIsLoggedIn(window.location.href.toString().includes("sign-in"));
  }, []);
  const getCartItems = () => {
    CartApis.getUserCartItems(user.primaryEmailAddress.emailAddress).then(
      (response) => {
        console.log("response from cart items", response.data.data);
        response.data.data.forEach((item) => {
          setCart((oldCart) => [
            ...oldCart,
            {
              id: item.id,
              product: item.attributes.products.data[0],
            },
          ]);
        });
      }
    );
  };
  useEffect(() => {
    user && getCartItems();
  }, [user]);
  return (
    !isLoggedIn && (
      <header className="bg-white shadow-md">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 ">
          <Image src="/logo.svg" alt="logo" width={40} height={40} />

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a
                    className="text-gray-300 transition hover:text-black"
                    href="#"
                  >
                    {" "}
                    Home{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-300 transition hover:text-black"
                    href="#"
                  >
                    {" "}
                    Explore{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-300 transition hover:text-black"
                    href="#"
                  >
                    {" "}
                    Projects{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-300 transition hover:text-black"
                    href="#"
                  >
                    {" "}
                    About Us{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-300 transition hover:text-black"
                    href="#"
                  >
                    {" "}
                    Contact Us{" "}
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              {!user ? (
                <div className="sm:flex sm:gap-4">
                  <a
                    className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white hover:text-black"
                    href="/sign-in"
                  >
                    Login
                  </a>

                  <a
                    className="hidden rounded-md  px-5 py-2.5 text-sm font-medium text-black shadow hover:text-white hover:bg-black focus:outline-none focus:ring  sm:w-auto sm:block"
                    href="#"
                  >
                    Register
                  </a>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <h2 className="flex items-center gap-1 cursor-pointer">
                    <ShoppingCart onClick={() => setOpenCart(!openCart)} />(
                    {cart.length})
                  </h2>
                  <UserButton afterSignOutUrl="/" />
                  {openCart && <Cart />}
                </div>
              )}

              <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                <span className="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    )
  );
};
