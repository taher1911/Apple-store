import Image from "next/image";
import Link from "next/link";
import React from "react";

import { motion } from "framer-motion";

import Button from "../ui/Button";
import { useRouter } from "next/router";

const Landing = () => {
  const router = useRouter();
  return (
    <section className="sticky top-0 h-screen w-full   ">
      <div className="container h-full flex flex-col justify-end md:flex-row  md:items-center  ">
        <motion.div
          initial={{
            y: 30,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            delay: 1.5,
            duration: 0.4,
          }}
          className="mb-5 md:mb-0"
        >
          <h1 className="flex flex-col space-y-3 text-2xl leading-6 md:leading-10 font-semibold tracking-wide md:text-4xl lg:text-5xl xl:text-6xl">
            <span className="gradient bg-clip-text text-transparent">
              Powered
            </span>
            <span>By Intellect</span>
            <span>Driven By Values</span>
          </h1>
          <div className="flex items-center gap-7 mt-5">
            <Button
              title="Buy Now"
              onClick={() => router.push("/#products-container")}
            />
            <Link href="/#products-container" className="link colord-line">
              Learn More
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{
            y: 30,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            delay: 1.5,
          }}
          className="relative h-[450px] w-full max-w-[450px] transition-all duration-500 lg:h-[650px] lg:w-[600px] mx-auto"
        >
          <Image
            src="/header-image.webp"
            alt="iphone"
            fill
            style={{ objectFit: "contain" }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Landing;
