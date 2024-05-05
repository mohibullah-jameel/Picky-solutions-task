import { FC, useEffect } from "react";
import { fetchProductsAsync } from "../globalState/productSlice/productSlice";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../globalState/store";
import ProductCard from "../components/product/ProductCard";
import Filters from "../components/Filters/Filters";
import { Product } from "../types/types";
import Loader from "../components/loader/Loader";
import Error from "../components/Error/Error";

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading, error } = useAppSelector(
    (state: RootState) => state?.product
  );

  const filters = useAppSelector((state: RootState) => state?.filter);

  const shouldDisplay = (product: Product) => {
    let matchSearchText =
      filters.searchText === ""
        ? true
        : product.title.toLowerCase().includes(filters.searchText);
    let matchCategory =
      filters.category === ""
        ? true
        : product.category.toLowerCase().includes(filters.category);

    return matchSearchText && matchCategory;
  };

  const filteredData = products.filter((product) => shouldDisplay(product));

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, []);

  return (
    <>
      <Filters />
      {isLoading ? (
        <Loader />
      ) : (
        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10 gap-10">
            {filteredData.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </main>
      )}

      {error ? <Error /> : ""}
    </>
  );
};

export default Home;
