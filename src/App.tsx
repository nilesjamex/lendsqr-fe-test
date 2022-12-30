import "./App.scss";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Header from "./Layout/Header";
import Sidebar from "./Layout/Sidebar/index";
import Login from "./Components/Login/index";
import User from "./pages/User";
function App() {
  const [active, setactive] = useState<boolean>(false);
  const open = () => {
    setactive(!active);
  };
  return (
    <>
      {window.sessionStorage.getItem("user") === "authenticated" && (
        <Header open={open} />
      )}
      <div className="App">
        <div
          className={
            window.sessionStorage.getItem("user") === "authenticated"
              ? active
                ? "menu"
                : "menu__active"
              : ""
          }
        >
          {window.sessionStorage.getItem("user") === "authenticated" && (
            <Sidebar open={open} />
          )}
        </div>
        <div className="side">
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard">
                <Route path=":Id" element={<User />} />
              </Route>
            </Routes>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;

// const RouterPage = (
//   props: { pageComponent: JSX.Element } & RouteComponentProps
// ) => props.pageComponent;
