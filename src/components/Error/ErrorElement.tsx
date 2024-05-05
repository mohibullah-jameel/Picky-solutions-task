import { useNavigate } from "react-router-dom";

const ErrorElement = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/");
  return (
    <div className="h-screen flex flex-col gap-2 justify-center items-center">
      <div className="text-center ">
        <div className="text-2xl font-bold">404 Not Found</div>
        <div className="text-neutral-500 font-light mt-2">
          Looks like you are Lost
        </div>
      </div>

      <div className="w-48 mt-4">
        <button
          onClick={handleClick}
          className="rounded-lg hover:opacity-80 transition w-full bg-white border-orange-500 text-black border-2 py-3"
        >
          Home Page
        </button>
      </div>
    </div>
  );
};

export default ErrorElement;
