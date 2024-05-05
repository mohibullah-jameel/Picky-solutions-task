import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FC, useEffect } from "react";
import { clearCart, getTotals } from "../globalState/cartSlice/CartSlice";
import { RootState } from "../globalState/store";
import { Product } from "../types/types";

const Cart: FC = () => {
  const cart = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="p-8">
      <h2 className="font-normal text-2xl text-center">Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="mt-8 text-center">
          <p>Your cart is currently empty</p>
          <div className="mt-4">
            <Link to="/" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span className="ml-1">Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-16">
          <div className=" hidden md:grid  grid-cols-4 gap-4 mb-4">
            <h3 className="text-sm font-medium">Product</h3>
            <h3 className="text-sm font-medium">Price</h3>
            <h3 className="text-sm font-medium">Quantity</h3>
            <h3 className="text-sm font-medium text-right">Total</h3>
          </div>
          <div>
            {cart.cartItems.map((cartItem: Product) => (
              <div
                className="grid grid-col-1 md:grid-cols-4 gap-4 border-t border-gray-200 py-4 items-center"
                key={cartItem.id}
              >
                <div className="flex items-center">
                  <img
                    src={cartItem.image}
                    alt={cartItem.title}
                    className="w-20 h-20 object-contain mr-4"
                  />

                  <div>
                    <h3 className="font-medium line-clamp-1">
                      {cartItem.title}
                    </h3>
                    <p className="text-sm line-clamp-2">
                      {cartItem.description}
                    </p>
                  </div>
                </div>
                <div className="text-base">${cartItem.price}</div>
                <div className="flex items-center">
                  <div className="border border-gray-300 rounded w-20 h-10 flex items-center justify-center">
                    {cartItem.cartQuantity}
                  </div>
                </div>
                <div className="text-base text-left md:text-right">
                  {/* @ts-ignore */}
                  ${cartItem.price * cartItem?.cartQuantity}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary flex flex-col md:flex-row item-center justify-between border-t border-gray-200 pt-8">
            <div className="flex items-center justify-start md:justify-center">
              <button
                className="mb-4 md:mb-0"
                onClick={() => handleClearCart()}
              >
                Clear cart
              </button>
            </div>

            <div className="cart-checkout md:w-64 max-w-full">
              <div className="subtotal flex justify-between text-lg">
                <span>Subtotal</span>
                <span className="amount font-semibold">
                  ${cart.cartTotalAmount}
                </span>
              </div>
              <p className="text-sm font-light my-2">
                Taxes and shipping calculated at checkout
              </p>
              <button className="w-full h-10 rounded-md font-normal tracking-wide bg-orange-500 text-white border-none outline-none cursor-pointer">
                Check out
              </button>
              <div className="continue-shopping mt-4">
                <a
                  href="/"
                  className="flex items-center text-gray-500 no-underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span className="ml-2">Continue Shopping</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
