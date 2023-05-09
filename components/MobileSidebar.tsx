import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// import { fadeIn, mobileLinksContainer } from "../utils/motion";

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

import { motion, AnimatePresence } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";

interface Props {
  show: Boolean;
  setShow: (pref: any) => void;
}
const MobileSidebar = ({ show, setShow }: Props) => {
  const { pathname } = useRouter();
  const { data: session } = useSession();

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          className="fixed w-screen h-screen left-0 top-0 z-40 bg-[#e7ecee] flex flex-col justify-around md:hidden transition-all"
          initial={{ opacity: 0, left: 200 }}
          animate={{ opacity: 1, left: 0 }}
          transition={{
            duration: 0.3,
            ease: "linear",
            damping: 10,
            stiffness: 1000,
          }}
          exit={{ opacity: 0, left: 200, transition: { delay: 1.3 } }}
        >
          <ul className="flex flex-col w-[80%] mx-auto gap-5">
            {LINKS.map((link) => (
              <motion.li
                initial={{ y: "-10px", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.2,
                  delay: link.id * 0.2,
                  type: "tween",
                }}
                exit={{
                  transition: { delay: link.id * 0.2 },
                  y: "-10px",
                  opacity: 0,
                }}
                key={link.id}
                onClick={() => setShow(!show)}
              >
                <Link
                  href={link.href}
                  className={`${
                    pathname === link.href && "active"
                  } headerLink inline-flex w-full`}
                >
                  {link.title}
                </Link>
              </motion.li>
            ))}
          </ul>
          {session ? (
            <motion.button
              type="button"
              className="mt-10"
              initial={{ y: "10px", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.2,
                delay: 1,
                type: "tween",
                ease: "easeInOut",
              }}
              exit={{
                transition: { delay: 1, ease: "easeInOut" },
                y: "10px",
                opacity: 0,
              }}
              onClick={() => signOut()}
            >
              Logout
            </motion.button>
          ) : (
            <motion.button
              type="button"
              className="mt-10"
              initial={{ y: "10px", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.2,
                delay: 1,
                type: "tween",
                ease: "easeInOut",
              }}
              exit={{
                transition: { delay: 1, ease: "easeInOut" },
                y: "10px",
                opacity: 0,
              }}
              onClick={() => signIn()}
            >
              Login
            </motion.button>
          )}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;
