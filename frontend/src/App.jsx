import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from "./components/common/Home";
import Show from "./components/common/Register";
import ShowLogin from "./components/common/Login";
import NavbarGeneral from "./components/headers/NavbarGeneral";
import NavbarBuyer from "./components/headers/NavbarBuyer"
import NavbarVendor from "./components/headers/NavbarVendor"
import UsersList from "./components/users/UsersList";
import AddToWallet from "./components/users/AddToWallet";
import VendorItem from "./components/users/VendorItem";
import ViewItems from "./components/users/ViewItems";
import ViewProducts from "./components/users/ViewProducts";
import BuyerProfile from "./components/users/BuyerProfile";
import VendorProfile from "./components/users/VendorProfile";

const Layout = (props) => {

  // let navbarValue = 1
  const [navbarValue, setNavbarValue] = useState(0)
  let buyersTemp, vendorsTemp;

  useEffect(() => {

    axios
      .get("http://localhost:4000/buyer")
      .then((response) => {
        buyersTemp = response.data
        buyersTemp.map((buyer, ind) => {
          if (buyer.loggedIn === true) {
            setNavbarValue(1)
            return navbarValue;
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
      
      axios
      .get("http://localhost:4000/vendor")
      .then((response) => {
        vendorsTemp = response.data;
        vendorsTemp.map((vendor, ind) => {
          if (vendor.loggedIn === true) {
            console.log(vendor.vendorName);
            // navbarValue = 2;
            setNavbarValue(2)
            return navbarValue;
          }
        });
      })
      .catch((error) => {
        console.log(error);
      }); 

  }, [props.id]);

  // console.log(navbarValue)

  return (
    <div>
        {(navbarValue === 0) ? <NavbarGeneral /> : ((navbarValue === 1) ? <NavbarBuyer /> : <NavbarVendor />)}
        <div className="container">
            <Outlet/>
        </div>
    </div>
  );
};

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="users" element={<UsersList />} />
            <Route path="register" element={<Show />} />
            <Route path="login" element={<ShowLogin />} />
            <Route path="addtowallet" element={<AddToWallet />} />
            <Route path="vendoritem" element={<VendorItem />} />
            <Route path="viewitems" element={<ViewItems />} />
            <Route path="viewproducts" element={<ViewProducts />} />
            <Route path="buyerprofile" element={<BuyerProfile />} />
            <Route path="vendorprofile" element={<VendorProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }

export default App;