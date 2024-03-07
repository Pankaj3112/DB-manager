import React from "react";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { useRecoilValue } from "recoil";
import { userSelector } from "./recoil";
import Navbar from "./components/Navbar";

function App() {
  const user = useRecoilValue(userSelector);

  return (
    <>
      <Toaster />
      {user ? (
        <>
          <Navbar /> 
		  <Dashboard />
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
