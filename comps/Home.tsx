"use client";
import { useMemo, useState } from "react";
import { BannerDataTypes, ProductsTypes } from "../app/page";
import FooterBanner from "../comps/FooterBanner";
import MainBanner from "./MainBanner";
import Products from "../app/Products";

interface HomeProps {
  products: ProductsTypes[];
  bannerData: BannerDataTypes[];
}

const Home = ({ products, bannerData }: HomeProps) => {
  const [sortOrder, setSortOrder] = useState<"low" | "high" | "">("");

  const sortedProducts = useMemo(() => {
    if (!Array.isArray(products)) return [] as ProductsTypes[];
    const copy = [...products];
    if (sortOrder === "low") {
      return copy.sort((a, b) => a.price - b.price);
    }
    if (sortOrder === "high") {
      return copy.sort((a, b) => b.price - a.price);
    }
    return copy;
  }, [products, sortOrder]);

  return (
    <main>
      {/* === MAIN BANNER  */}
      <MainBanner banner={bannerData[0]} />

      <section className="  mb-4 flex items-center flex-col">
        <h1
          className=" headTitle px-8 py-4 sm:py-2 sm:text-4xl text-2xl text-secondary
         font-sans font-extrabold sm:rounded-t-3xl"
        >
          Best Selling Headphones
        </h1>
        {/* <p className=" text-base text-secondary">Best in the Market</p> */}
      </section>

      {/* === SORT CONTROL */}
      <section className=" flex justify-end lg:mx-20 mb-2 px-4 overflow-x-hidden">
        <label className=" text-sm text-secondary mr-2 self-center" htmlFor="price-sort">
          Sort by price:
        </label>
        <select
          id="price-sort"
          className=" border border-lightGray text-secondary text-sm px-2 py-1 rounded"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "low" | "high" | "")}
        >
          <option value="">Default</option>
          <option value="low">low to high</option>
          <option value="high">high to low</option>
        </select>
      </section>

      {/* === SHOW PRODUCTS  */}
      <section
        className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3
       lg:mx-20 overflow-hidden
      "
      >
        {/* === MAP PRODUCTS  */}
        {sortedProducts?.map((products: ProductsTypes) => {
          return <Products key={products._id} products={products} />;
        })}
      </section>

      {/* ==== FOOTER BANNER  */}
      <FooterBanner bannerData={bannerData && bannerData[1]} />
    </main>
  );
};

export default Home;
