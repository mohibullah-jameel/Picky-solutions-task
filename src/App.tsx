import Header from "./components/header/Header";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import 'react-toastify/dist/ReactToastify.css';
import ErrorElement from "./components/Error/ErrorElement";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto">{<Outlet />}</div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorElement/> ,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer/>
    </>
  );
}

export default App;
