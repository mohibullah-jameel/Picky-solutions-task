import { Bars3Icon } from "@heroicons/react/24/solid";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const Header: FC = () => {
  const navigate = useNavigate();
  const handleCartClick = () => navigate("/cart");
  const handleHomeClick = () => navigate("/");

  return (
    <header>
      <div className="grid grid-cols-3 items-center px-10 py-7">
        <Bars3Icon className="h-8 w-8 cursor-pointer" />
        <h1
          className="text-4xl text-center font-bold cursor-pointer"
          onClick={handleHomeClick}
        >
          My {""}
          <span className="underline decoration-6 decoration-orange-600 ">
            COMMERCE
          </span>{" "}
          Store
        </h1>
        <div className="flex items-center space-x-3 justify-end">
          <button
            className="hidden md:block bg-slate-600 text-white px-4 lg:px-8 rounded-full py-2 lg:py-4"
            onClick={handleCartClick}
          >
            Cart
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
