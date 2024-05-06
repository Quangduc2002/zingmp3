/* eslint-disable react-hooks/exhaustive-deps */
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getHome } from "./Store/actions/Home";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHome());
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
