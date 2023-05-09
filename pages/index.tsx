import CartIcon from "@/components/home/CartIcon";
import Landing from "@/components/home/Landing";
import Products from "@/components/home/Products";

import { fetchCategories } from "@/utils/fetchCategories";
import { fetchProducts } from "@/utils/fetchProducts";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

interface Props {
  categories: Category[];
  products: Product[];
}
export default function Home({ categories, products }: Props) {
  return (
    <>
      <main className="relative h-[200vh]">
        <Landing />
      </main>

      <Products categories={categories} products={products} />
      <CartIcon />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const categories = await fetchCategories();
  const products = await fetchProducts();

  //session for auth
  const session = await getSession(context);
  return {
    props: {
      categories,
      products,
      session,
    },
  };
};
