import { urlFor } from "@/sanity";
import Image from "next/image";
import React, { useRef } from "react";
import toast from "react-hot-toast";

import { useInView } from "framer-motion";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  addToCart,
  decreaseElement,
} from "../../store/storeSlice";

interface Props {
  item: Product;
}

const CheckoutProduct = ({ item }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const dispatch = useDispatch();
  const removeItemsHandler = () => {
    dispatch(removeFromCart({ id: item._id }));
    toast.error(`${item.title} removed from basket`, {
      position: "bottom-center",
    });
  };
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <div
      ref={ref}
      className="flex flex-col gap-x-4 border-b border-gray-300 pb-5 md:flex-row lg:items-center"
      style={{
        transform: isInView ? "none" : "translateY(80px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s ",
      }}
    >
      <div className="relative h-44 w-44">
        <Image
          src={urlFor(item.image[0]).url()}
          alt={item.title}
          fill
          style={{
            objectFit: "contain",
          }}
        />
      </div>
      <div className="flex flex-1 items-end lg:items-center">
        <div className="flex-1 space-y-4">
          <div className="flex flex-col gap-x-8 text-xl lg:flex-row lg:text-2xl">
            <h4 className="font-semibold lg:w-96">{item.title}</h4>
            <p className="flex items-center">
              <span
                className="p-2 border-r border-gray-300 bg-slate-300 cursor-pointer"
                onClick={() => dispatch(decreaseElement(item))}
              >
                <AiOutlineMinus />
              </span>
              <span className="p-2 px-4 text-[20px] ">{item.quantity}</span>
              <span
                className="p-2 border-l border-gray-300  bg-slate-300 cursor-pointer"
                onClick={() => dispatch(addToCart(item))}
              >
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
            Show product details
          </p>
        </div>
        <div className="flex flex-col items-end space-y-4">
          <h4 className="text-xl font-semibold lg:text-2xl">
            {formatter.format(item.price * item.quantity)}
          </h4>
          <button
            type="button"
            onClick={removeItemsHandler}
            className="text-blue-500 hover:underline"
          >
            Remove{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;
