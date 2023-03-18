import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";

const NavbarVendor = (props) => {

  const navigate = useNavigate();

  const [foundVendor, setFoundVendor] = useState("");
  let vendorsTemp;

  useEffect((foundVendor) => {
    axios
      .get("http://localhost:4000/vendor")
      .then(res => {
        vendorsTemp = res.data
        vendorsTemp.map((vendor, ind) => {
          if (vendor.loggedIn === true) {
            setFoundVendor(vendor.vendorName)
          }
        });
      })
      .catch((error) => {
        console.log(error);
    });
  }, [props.id, foundVendor]);

  function logout() {

    const toBeLoggedOut = {
      vendorName: foundVendor
    }

    axios
      .post("http://localhost:4000/vendor/logout", toBeLoggedOut)
      .then(res => {
          console.log("Response", res.data)
          if (res.data.val === 1) {
              alert("Logged Out!");
              navigate("/");
              window.location.reload();
          }
      })
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Canteen Portal
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() => navigate("/viewproducts")}>
            View Products
          </Button>
          <Button color="inherit" onClick={() => navigate("/vendorprofile")}>
            {foundVendor}
          </Button>
          <Button color="inherit" onClick={() => navigate("/vendoritem")}>
            Add Item
          </Button>
          <Button color="inherit" onClick={() => logout()}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavbarVendor;
