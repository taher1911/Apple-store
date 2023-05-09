import Image from "next/image";
import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { MdShoppingCart } from "react-icons/md";

import { urlFor } from "../../sanity";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/storeSlice";

import toast from "react-hot-toast";

import { cartItemWithId } from "../../store/storeSlice";

interface Props {
  product: Product;
}
const Product = ({ product }: Props) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const isInView = useInView(ref);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const addProductHandler = () => {
    // console.log(cartItemWithId(product._id))

    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart`, {
      position: "bottom-center",
    });
  };
  return (
    <div
      ref={ref}
      style={{
        transform: isInView ? "none" : "translateY(80px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s ",
      }}
      className="flex h-fit   select-none flex-col space-y-3 rounded-xl bg-[#35383c] p-8 md:h-[500px] md:p-10"
    >
      <div className="relative h-64 w-full md:h-72">
        <Image
          src={urlFor(product.image[0]).url()}
          alt={product.title}
          fill
          style={{
            objectFit: "contain",
          }}
        />
      </div>

      <div className="flex flex-1 items-center justify-between space-x-3">
        <div className="space-y-2 text-xl text-white md:text-2xl">
          <p>{product.title}</p>
          <p> {formatter.format(product.price)}</p>
        </div>
        <div className="product-buy-button" onClick={addProductHandler}>
          <MdShoppingCart className="h-8 w-8 text-white" />
        </div>
      </div>
    </div>
  );
};

export default Product;
