import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./screens/Home/Home";
import Update from "./screens/Update/Update";
import Create from "./screens/Create/Create";
import Customer from "./screens/Customer/Customer";
import Header from "./components/header/Header";

function RoutesComponent() {
  return (
    <BrowserRouter>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/monitoring" element={<Home />} />
        <Route path="/monitoring/register" element={<Customer />} />
        <Route path="/monitoring/register/create" element={<Create />} />
        <Route
          path="/monitoring/register/edit/:customerId"
          element={<Update />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesComponent;
