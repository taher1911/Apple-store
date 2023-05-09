import React from "react";
import Link from "next/link";
interface Props {
  title: string;
  onClick?: () => void;
  loading?: boolean;
  width?: string;
  padding?: string;
}
const Button = ({ title, onClick, loading, width, padding }: Props) => {
  return (
    <button
      type="button"
      className={` ${
        width ? width : "w-auto"
      } ${padding} box-border relative z-10 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 gradient rounded-md cursor-pointer group hover:scale-[1.01] ease focus:outline-none`}
      onClick={onClick}
    >
      <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-3 bg-white opacity-10 group-hover:translate-x-0"></span>
      <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-3 bg-white opacity-10 group-hover:translate-x-0"></span>
      <span className="relative z-20 flex items-center text-sm">
        <svg
          className="relative w-5 h-5 mr-2 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          ></path>
        </svg>
        {loading ? "Loading..." : title}
      </span>
    </button>
  );
};

export default Button;
