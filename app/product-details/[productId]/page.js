"use client";
import { BreadCrumb } from "../../_components/BreadCrumb";
import ProductApis from "../../_utils/ProductApis";
import React, { useEffect, useState } from "react";
import ProductBanner from "../_components/ProductBanner";
import { ProductInfo } from "../_components/ProductInfo";
import { ProductList } from "../../_components/ProductList";
import { usePathname } from "next/navigation";

function ProductDetails({ params }) {
  const path = usePathname();
  const [productDetails, setProductDetails] = useState([]);
  const [productSameCategory, setProductSameCategory] = useState([]);
  const getProductById_ = () => {
    ProductApis.getProductById(params.productId).then((response) => {
      //   console.log("product item ", response.data.data);
      setProductDetails(response.data.data);
      getProductsByCategory_(response.data.data);
    });
  };
  const getProductsByCategory_ = (product) => {
    ProductApis.getProductsByCategory(product.attributes.category).then(
      (response) => {
        console.log(response.data.data);
        setProductSameCategory(response.data.data);
      }
    );
  };
  useEffect(() => {
    getProductById_();
  }, [params.productId]);
  return (
    <div className="px-10 md:px-28 py-8">
      <BreadCrumb path={path} />
      <div className="mt-10  grid grid-cols-1 gap-5 sm:gap-0 sm:grid-cols-2 justify-around">
        <ProductBanner product={productDetails} />
        <ProductInfo product={productDetails} />
      </div>
      <div>
        <h2 className="mt-24 text-xl mb-4">Similar Products</h2>
        <ProductList productList={productSameCategory} />
      </div>
    </div>
  );
}

export default ProductDetails;
