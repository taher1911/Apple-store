import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { useSelector } from "react-redux";
import { cart, cartTotal, cartLength } from "@/store/storeSlice";

const CartIcon = () => {
  const length = useSelector(cartLength);
  const total = useSelector(cartTotal);

  if (length === 0) return null;

  return (
    <Link href="/checkout" title="Chekout">
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-gray-300">
        {length > 0 && (
          <span className="absolute -right-2 -top-2 z-50 flex h-7 w-7 items-center justify-center rounded-full gradient text-[10px] text-white">
            {length}
          </span>
        )}
        <AiOutlineShopping className="headerIcon h-7 w-7" />
      </div>
    </Link>
  );
};

export default CartIcon;
