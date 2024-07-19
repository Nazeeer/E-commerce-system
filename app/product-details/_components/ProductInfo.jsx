"use client";
import { AlertOctagon, BadgeCheck, ShoppingCart } from "lucide-react";
import React, { useContext } from "react";
import SkeletonProductInfo from "./SkeletonProductInfo";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import CartApis from "../../_utils/CartApis";
import { CartContext } from "../../_context/CartContext";
export const ProductInfo = ({ product }) => {
  const { user } = useUser();
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);
  console.log("user", user);
  const handelAddToCart = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      const data = {
        data: {
          username: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          products: [product.id],
        },
      };
      CartApis.addToCart(data)
        .then((response) => {
          console.log("cart created successfully");
          setCart((oldCart) => [
            ...oldCart,
            { id: response.data.data.id, product },
          ]);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };
  return (
    <div>
      {product.id ? (
        <div>
          <h2 className="text-[20px]">{product.attributes.title}</h2>
          <h2 className="text-[15px] mt-3 text-gray-400">
            {product.attributes.category}
          </h2>
          <h2 className=" text-[11px] mt-5 ">
            {product.attributes.discription[0].children[0].text}
          </h2>
          <h2 className="text-[11px] text-gray-400 flex items-center gap-2 mt-3">
            {product.attributes.instantDelivery ? (
              <BadgeCheck className="text-green-500 w-5 h-5" />
            ) : (
              <AlertOctagon className="text-red-500 w-5 h-5" />
            )}
            Eligible For Instant Delivery
          </h2>
          <h2 className=" text-[32px] mt-5 text-primary">
            $ {product.attributes.price}
          </h2>
          <button
            onClick={handelAddToCart}
            className="  flex items-center mt-5 gap-2  rounded bg-black text-white p-4 text-sm font-medium transition hover:scale-105 hover:bg-red-800  "
          >
            <ShoppingCart />
            Add To Card
          </button>
        </div>
      ) : (
        <SkeletonProductInfo />
      )}
    </div>
  );
};
