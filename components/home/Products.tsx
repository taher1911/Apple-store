import React, { useEffect, useState } from "react";
import Product from "../ui/Product";

interface Props {
  categories: Category[];
  products: Product[];
}
const Products = ({ categories, products }: Props) => {
  const [value, setValue] = useState("2313c5df-f978-4560-a761-931cf81ba6a1");
  const [searchVal, setSearchVal] = useState("");
  const [Products, setProducts] = useState(products);

  useEffect(() => {
    const data = products.filter((el) => el.category._ref === value);
    setProducts(data);
  }, [value]);

  useEffect(() => {
    if (searchVal === "") {
      const data = products.filter(
        (el) => el.category._ref === "2313c5df-f978-4560-a761-931cf81ba6a1"
      );
      setProducts(data);
    } else {
      setValue("");
      const prods = products.filter(
        (el) =>
          el.title.toLowerCase().match(searchVal.trim()) ||
          el.slug.current.match(searchVal.trim())
      );
      setProducts(prods);
    }
  }, [searchVal]);

  return (
    <section
      className="bg-[#1b1b1b]  relative z-20 -mt-[100vh] min-h-screen pb-[20vh]"
      id="products-container"
    >
      <div className="container">
        <div className="space-y-5 py-8">
          <h2 className="text-center text-2xl font-medium tracking-wide text-white md:text-3xl lg:text-4xl">
            New Promos
          </h2>
          <ul className="tabs flex justify-center text-white ">
            {categories.map((category) => (
              <li
                key={category._id}
                className={`${
                  value === category._id ? "tab-colord-active bg-[#35383C]" : ""
                } px-[1.3rem] md:px-8 lg:px-10 py-3 rounded-tl-lg rounded-tr-lg transition-all duration-300  text-sm md:text-base lg:text-lg border-b-2 border-gray-800 tab-colord tracking-normal sm:tracking-wider`}
                onClick={() => setValue(category._id)}
              >
                {category.title}
              </li>
            ))}
          </ul>
          <div className="flex justify-center text-white">
            <input
              type="text"
              className="w-[95%] max-w-[565px] p-2 text-white font-normal border-b-2 border-gray-700 bg-transparent outline-none "
              placeholder="Search"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value.toLowerCase())}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
        {Products.length === 0 && (
          <p className="text-white text-center">Product not found.</p>
        )}
      </div>
    </section>
  );
};

export default Products;
