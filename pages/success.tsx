import Head from "next/head";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { BsCheck2Circle } from "react-icons/bs";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { MdShoppingCart } from "react-icons/md";
import { useRouter } from "next/router";
import Button from "@/components/ui/Button";
import { useMediaQuery } from "react-responsive";
import { GetServerSideProps } from "next";
import { fetchLineItems } from "@/utils/fetchLineItems";
import { useSession } from "next-auth/react";

interface Props {
  products: StripeProduct[];
}
const success = ({ products }: Props) => {
  const [mounted, setMounted] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const router = useRouter();
  const { session_id } = router.query;
  const subTotal = products.reduce(
    (prev, product) =>
      prev + (product.price.unit_amount / 100) * product.quantity,
    0
  );
  useEffect(() => {
    setMounted(true);
  }, []);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width:1024px)" });
  const showOrderSummaryCondition = isTabletOrMobile ? showOrderSummary : true;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Thank you! - Apple</title>
        <meta
          name="description"
          content="We've accepted your order, and we're getting it ready.  we will contact you soon."
        />
        <link rel="shortcut icon" href="/apple.png" type="image/x-icon" />
      </Head>

      <main className="mt-[13vh] lg:mt-[5vh] container grid grid-cols-1 lg:grid-cols-9">
        <section className="order-2 lg:col-span-5 mx-auto max-w-xl pb-12 lg:max-w-none  lg:pt-16  ">
          <div className="my-8 ml-4 flex space-x-4 lg:ml-14 xl:ml-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-black">
              <BsCheck2Circle className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm text-gray-600">
                Order #{session_id?.slice(-5)}
              </p>
              <h4 className="text-lg">
                Thank you{" "}
                {session ? (
                  <p className="capitalize inline-block">
                    {session.user?.name?.split(" ")[0]}
                  </p>
                ) : (
                  " Guest"
                )}
              </h4>
            </div>
          </div>
          <div className="mx-4 divide-y divide-gray-300 rounded-md border border-gray-300 p-4 lg:ml-2">
            <div className="space-y-2 pb-3">
              <p className="text-green-700 font-bold">
                Your order is confirmed
              </p>
              <p className="text-sm text-gray-600">
                We've accepted your order, and we're getting it ready. Come back
                to this page for updates on your shipment status.
              </p>
            </div>
            <div className="pt-3 text-sm">
              <p className="font-medium text-gray-600">
                Other tracking number:
              </p>
              <p>CNB21441622</p>
            </div>
          </div>
          <div className="my-4 mx-4 space-y-2 rounded-md border border-gray-300 p-4 lg:ml-2 ">
            <p>Order updates</p>
            <p className="text-sm text-gray-600">
              You'll get shipping and delivery updates by email and text.
            </p>
          </div>
          <div>
            <p className=" mx-4  lg:ml-2 ">
              Need help?{" "}
              <a
                href="mailto:taherabozeid91@gmail.com"
                className="text-blue-500"
              >
                Contact us
              </a>
            </p>
            {mounted && (
              <div className="mx-4 lg:mx-2 mt-5">
                <Button
                  title="Continue Shopping"
                  onClick={() => router.push("/")}
                  width={isTabletOrMobile ? "w-full" : undefined}
                  padding="py-4"
                />
              </div>
            )}
          </div>
        </section>
        {mounted && (
          <section className="overflow-y-scroll border-y border-l border-gray-300 bg-[#fafafa] lg:order-2 lg:col-span-4 lg:h-screen lg:border-y-0">
            <div
              className={`w-full ${
                showOrderSummaryCondition && "border-b "
              } border-gray-300 text-sm lg:hidden`}
            >
              <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-6">
                <button
                  type="button"
                  onClick={() => setShowOrderSummary(!showOrderSummary)}
                  className="flex items-center space-x-2"
                >
                  <MdShoppingCart className="h-6 w-6" />
                  <p>Show order summary</p>
                  {showOrderSummaryCondition ? (
                    <RiArrowUpSLine className="h-4 w-4" />
                  ) : (
                    <RiArrowDownSLine className="h-4 w-4" />
                  )}
                </button>
                <p className="text-xl font-medium text-black">
                  {formatter.format(subTotal)}
                </p>
              </div>
            </div>
            {showOrderSummaryCondition && (
              <div className="mx-auto max-w-xl divide-y divide-gray-300 border-gray-300 px-4 py-4 lg:mx-0 lg:max-w-lg lg:px-10 lg:py-16">
                <div className="space-y-4 pb-4">
                  {products.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center text-sm space-x-4 font-medium"
                    >
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-md border border-gray-300 bg-[#f1f1f1 text-xs] text-white ">
                        <div className="relative h-7 w-7 animate-bounce rounded-md">
                          <Image
                            src="/apple-black-logo.png"
                            alt="prodcut"
                            fill
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                        <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[gray] text-xs">
                          {p.quantity}
                        </div>
                      </div>
                      <p className="flex-1">{p.description}</p>
                      <p>{formatter.format(p.price.unit_amount / 100)}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-1 py-4">
                  <div className="flex justify-between text-sm">
                    <p className="text-[gray]">Subtotal</p>
                    <p className="font-medium">{formatter.format(subTotal)}</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-[gray]">Discount</p>
                    <p className="text-[gray]"></p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-[gray]">Shipping</p>
                    <p className="font-medium">{formatter.format(0)}</p>
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                  <p>Total</p>
                  <p className="flex items-center gap-x-2 text-xs text-[gray]">
                    USD
                    <span className="text-xl font-medium text-black">
                      {formatter.format(subTotal)}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </>
  );
};

export default success;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = query.session_id as string;
  const products = await fetchLineItems(sessionId);

  return {
    props: { products },
  };
};
