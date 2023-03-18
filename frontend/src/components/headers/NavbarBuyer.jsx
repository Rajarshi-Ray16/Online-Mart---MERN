import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";

const NavbarBuyer = (props) => {

  const navigate = useNavigate();

  const [foundBuyer, setFoundBuyer] = useState("");
  let buyersTemp;
  
  useEffect((foundBuyer) => {
    axios
      .get("http://localhost:4000/buyer")
      .then(res => {
        buyersTemp = res.data
        buyersTemp.map((buyer, ind) => {
          if (buyer.loggedIn === true) {
            setFoundBuyer(buyer.buyerName)
          }
        });
      })
      .catch((error) => {
        console.log(error);
    });
  }, [props.id, foundBuyer]);
  
  function logout() {
  
    const toBeLoggedOut = {
      buyerName: foundBuyer
    }
  
    axios
      .post("http://localhost:4000/buyer/logout", toBeLoggedOut)
      .then(res => {
          console.log("Response", res.data)
          if (res.data.val === 1) {
              alert("Logged Out!")
              navigate("/")
              window.location.reload()
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
          <Button color="inherit" onClick={() => navigate("/viewitems")}>
            View Items
          </Button>
          <Button color="inherit" onClick={() => navigate("/buyerprofile")}>
            {foundBuyer}
          </Button>
          <Button color="inherit" onClick={() => navigate("/addtowallet")}>
            Wallet
          </Button>
          <Button color="inherit" onClick={() => logout()}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavbarBuyer;
