import { FC } from "react";
import { addToCart } from "../../globalState/cartSlice/CartSlice";
import { useDispatch } from "react-redux";
import { Product } from "../../types/types";

interface ProductProps {
  product: Product;
}

const ProductCard: FC<ProductProps> = ({ product }) => {
  const { image, title, description, price } = product;

  const dispatch = useDispatch();

  return (
    <article
      className="bg-white  flex flex-col rounded-lg shadow-lg cursor-pointer
    hover:scale-105 hover:shadow-xl  transition-all duration-200 ease-out"
    >
      <img
        src={image === null ? "/src/assets/placeholder.png" : image}
        alt={title}
        className="h-[320px] w-full object-contain rounded-t-lg shadow-md "
        loading="lazy"
      />

      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col p-5">
          <h2 className="font-bold line-clamp-1">{title}</h2>
          <footer className="text-xs pt-3 italic text-gray-400">
            <p className="line-clamp-3 text-left">{description} -</p>
          </footer>
          <div className="flex items-center justify-between text-base pt-3 font-semibold">
            <span>Price</span>
            <h4>$ {price}</h4>
          </div>
        </div>

        <button
          className="bg-orange-400 h-10 rounded-b-lg hover:bg-orange-500"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
