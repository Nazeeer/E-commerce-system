"use client";
import React, { useEffect, useState } from "react";
import { ProductList } from "./ProductList";
import ProductApis from "../_utils/ProductApis";
import { MoveRight } from "lucide-react";
const ProductSection = () => {
  const [productList, setProductList] = useState([]);
  const getLatestProducts_ = () => {
    ProductApis.getLatestProducts().then((response) => {
      console.log(response.data.data);
      setProductList(response.data.data);
    });
  };

  useEffect(() => {
    getLatestProducts_();
  }, []);
  return (
    <div className="px-10 md:px-20">
      <div className="flex justify-between items-center">
        <h2 className="my-4 text-2xl">Our Latest Products</h2>
        <a href="" className="flex">
          <MoveRight /> View All Collection
        </a>
      </div>
      <ProductList productList={productList} />
    </div>
  );
};

export default ProductSection;
