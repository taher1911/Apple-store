import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { AiOutlineShopping } from "react-icons/ai";

import { motion } from "framer-motion";

import { useSelector } from "react-redux";
import { cartLength } from "@/store/storeSlice";

import { signIn, signOut, useSession } from "next-auth/react";

const LINKS = [
  {
    id: 1,
    title: "Home",
    href: "/",
  },
  {
    id: 2,
    title: "Explore",
    href: "/explore",
  },
  {
    id: 3,
    title: "Support",
    href: "/support",
  },
  {
    id: 4,
    title: "Business",
    href: "/business",
  },
];

interface Props {
  show: Boolean;
  setShow: (pref: any) => void;
}
const Navbar = ({ show, setShow }: Props) => {
  const { pathname } = useRouter();
  const length = useSelector(cartLength);
  const { data: session } = useSession();
  // navbar show and hidden functionality
  useEffect(() => {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (prevScrollpos > currentScrollPos) {
        document.getElementById("nav-scroll").style.background = "#e7ecee";
        document.getElementById("nav-scroll").style.top = "0px";
      } else {
        document.getElementById("nav-scroll").style.top = "-60px";
      }
      prevScrollpos = currentScrollPos;
    };
  }, []);
  return (
    <nav
      className="fixed left-0 top-0 z-50 flex w-full  mx-auto justify-between items-center py-3 transition-all duration-500  md:px-0 bg-[#e7ecee] "
      id="nav-scroll"
    >
      <div className="container flex items-center justify-between">
        <div className="">
          <Link href="/">
            <div className="relative w-9 h-9  opacity-100 transition hover:opacity-80 cursor-pointer ">
              <Image
                src="/apple-black-logo.png"
                alt="apple-icon"
                fill
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
          </Link>
        </div>
        <ul className="hidden md:flex flex-1 items-center justify-center space-x-8">
          {LINKS.map((link) => (
            <motion.li
              key={link.id}
              initial={{
                x: "-3px",
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              transition={{ delay: link.id * 0.2 }}
            >
              <Link
                href={link.href}
                className={`${pathname === link.href && "active"} headerLink`}
              >
                {link.title}
              </Link>
            </motion.li>
          ))}
        </ul>
        <div className="flex items-center justify-center ">
          <Link href="/#products-container">
            <BsSearch className="text-[1.4rem] cursor-pointer" />
          </Link>
          <Link href="/checkout" className="mx-3 relative cursor-pointer">
            <AiOutlineShopping className="text-[1.7rem]" />
            {length > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center text-white  w-[18px] h-[18px] font-bold text-[12px] rounded-full gradient">
                {length}
              </span>
            )}
          </Link>
          {session ? (
            <button
              type="button"
              className="hidden md:inline-flex"
              onClick={() => signOut()}
            >
              Logout
            </button>
          ) : (
            <button
              type="button"
              className="hidden md:inline-flex"
              onClick={() => signIn()}
            >
              Login
            </button>
          )}

          <div
            className={`menu ${show ? "show" : ""} inline-flex md:hidden `}
            onClick={() => setShow((pref: Boolean) => !pref)}
          >
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
