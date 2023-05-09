import Head from "next/head";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { cart, cartTotal } from "@/store/storeSlice";
import { useSelector } from "react-redux";
import Button from "@/components/ui/Button";
import CheckoutProduct from "@/components/checkout/CheckoutProduct";
import { Stripe } from "stripe";
import { fetchPostJSON } from "@/utils/api-helpers";
import getStripe from "@/utils/get-stripejs";

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const items = useSelector(cart);
  const total = useSelector(cartTotal);

  const router = useRouter();

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const createCheckoutSession = async () => {
    setLoading(true);
    const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
      "/api/checkout_sessions",
      {
        items,
      }
    );

    //internal server error handler
    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message);
      return;
    }

    //redirect to checkout
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.id,
    });
    console.warn(error.message);

    setLoading(false);
  };
  return (
    <>
      <Head>
        <title>Checkout - Apple</title>
        <meta
          name="description"
          content="You can check out now and get your product with a great discount."
        />
        <link rel="shortcut icon" href="/apple.png" type="image/x-icon" />
      </Head>
      <main className="mt-[10vh] mx-auto max-w-5xl pb-24  min-h-screen">
        <div className="px-5">
          <h1 className="text-2xl font-semibold lg:text-3xl text-center">
            {items.length > 0 ? "Review your bag." : "Your bag is empty."}
          </h1>
          <p className="my-3 text-center">Free delivery and free returns.</p>
          {items.length === 0 && (
            <div className="flex justify-center">
              {" "}
              <Button
                title="Continue Shopping"
                onClick={() => router.push("/")}
              />
            </div>
          )}
          {items.length > 0 && (
            <div>
              {items.map((item) => (
                <CheckoutProduct key={item._id} item={item} />
              ))}
              <div className="my-12 mt-6 mx-auto max-w-3xl">
                <div className="divide-y divide-gray-300">
                  <div className="pb-4">
                    <div className="flex justify-between">
                      <p>Subtotal</p>
                      <p>{formatter.format(total)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Shipping</p>
                      <p>FREE</p>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex flex-col gap-x-1 lg:flex-row">
                        Estimated tax for:
                        <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
                          Enter zip code
                        </p>
                      </div>
                      <p>$ -</p>
                    </div>
                  </div>
                  <div className="flex justify-between pt-4 text-xl font-semibold">
                    <h1>Total</h1>
                    <h4>{formatter.format(total)}</h4>
                  </div>
                </div>
                <div className="my-14 space-y-4">
                  <h4 className="text-xl font-semibold">
                    How would you like to chekout ?
                  </h4>
                  <div className="flex flex-col gap-4 md:flex-row">
                    <div className="order-2 flex flex-1 flex-col items-center rounded-xl bg-gray-200 p-8 py-12 text-center">
                      <h4 className="mb-4 flex flex-col text-xl font-semibold">
                        <span>Pay Monthly</span>
                        <span>With Apple Card</span>
                        <span>$283.16/mo. at 0% APR</span>
                      </h4>
                      <Button title="Check Out with Apple Card Monthly Installments" />
                      <p className="mt-2 max-w-[240px] text-[13px]">
                        $0.00 due today, which includes applicable full-price
                        items, down papyments, shipping, and taxes.
                      </p>
                    </div>
                    <div className="md:order-2 flex flex-1 flex-col items-center space-y-8 rounded-xl bg-gray-200 p-8 py-12 text-center">
                      <h4
                        className="mb-4 flex flex-col text-xl font-semibold
                        "
                      >
                        Pay in full
                        <span>{formatter.format(total)}</span>
                      </h4>
                      <Button
                        title="Check Out"
                        width="w-full"
                        loading={loading}
                        onClick={createCheckoutSession}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Checkout;
