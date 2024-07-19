"use client";
import Image from "next/image";
import React from "react";
import { ScanQrCode } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
const ProductItem = ({ product }) => {
  const { user } = useUser();
  const router = useRouter();
  const handelAddToCart = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
    }
  };
  return (
    <Link
      href={`/product-details/${product.id}`}
      className="p-1 rounded-lg hover:border hover:shadow-md hover:duration-500 hover:-translate-y-6 hover:cursor-pointer"
    >
      <Image
        src={product.attributes.banner.data.attributes.url}
        width={400}
        height={350}
        alt="banner-card"
        className="rounded-t-lg w-full h-[300px] object-cover"
      />

      <div className="relative border  border-gray-100 bg-white p-6">
        <div className="flex justify-between items-center  ">
          <h3 className=" text-lg  font-medium text-gray-900">
            {product.attributes.title}
          </h3>

          {product.attributes.instantDelivery ? (
            <span className="whitespace-nowrap    bg-black text-white px-3 py-1.5 text-xs font-medium">
              New
            </span>
          ) : (
            <span className="whitespace-nowrap bg-red-700 text-white px-3 py-1.5 text-xs font-medium">
              Sold
            </span>
          )}
        </div>

        <div className="flex justify-between mt-3">
          <p className="mt-1.5 text-sm text-gray-700 flex gap-1 items-center hover:text-red-800">
            <ScanQrCode className="w-4 h-4  " /> {product.attributes.category}
          </p>
          <p className="mt-1.5 text-sm text-gray-700">
            ${product.attributes.price}
          </p>
        </div>

        <form className="mt-4">
          <button
            onClick={handelAddToCart}
            className="block w-full rounded bg-black text-white p-4 text-sm font-medium transition hover:scale-105 hover:bg-red-800"
          >
            Buy It
          </button>
        </form>
      </div>
    </Link>
  );
};

export default ProductItem;
