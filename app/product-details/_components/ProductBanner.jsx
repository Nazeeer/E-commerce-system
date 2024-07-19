import Image from "next/image";
import React from "react";

const ProductBanner = ({ product }) => {
  return (
    <div>
      {product?.attributes?.banner?.data?.attributes?.url ? (
        <Image
          src={product.attributes.banner.data.attributes.url}
          alt="product-details-banner"
          width={400}
          height={400}
          className="rounded-lg mx-auto"
        />
      ) : (
        <div className="w-[400px] h-[299px] mx-auto bg-slate-200 rounded-lg animate-pulse"></div>
      )}
    </div>
  );
};

export default ProductBanner;
