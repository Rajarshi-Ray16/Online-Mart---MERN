import React, { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";

const ShowLogin = (props) => {

  const [showBuyer, setShowBuyer] = useState(false);
  const [showVendor, setShowVendor] = useState(false);

  const setShow = ( boolValue ) => {
    if (boolValue) {
      setShowBuyer(true);
      setShowVendor(false);
    }
    else {
      setShowBuyer(false);
      setShowVendor(true);
    }
  }

  return (
    <Grid align="center">
      <Grid item xs={3}>
        <Autocomplete
          id="combo-box-demo"
          options={["Vendor", "Buyer"]}
          getOptionLabel={(option) => option}
          onChange={(e, value) => value === "Buyer" ? setShow(true): setShow(false)}

          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Member Type"
              variant="outlined"
              placeholder="Buyer or Vendor"
            />
          )}
        />
        <br/>
        {showBuyer ? <LoginBuyer />: (showVendor ? <LoginVendor /> : <div></div>)}
      </Grid>
    </Grid>

  )
}

const LoginBuyer = (props) => {

  // alert("Working.")
  
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPassword, setBuyerPassword] = useState("");
  const navigate = useNavigate();

  // function navigate(thePage) {
  //   const nav = useNavigate();
  //   nav(thePage);
  //   window.location.reload(false);
  // };
  
  const onChangeBEmail = (event) => {
    setBuyerEmail(event.target.value);
  };
  
  const onChangeBuyerPassword = (event) => {
    setBuyerPassword(event.target.value);
  }
  
  const resetInputs = () => {
    setBuyerEmail("");
    setBuyerPassword("");
  };
  
  const onSubmit = (event) => {
    event.preventDefault();
    
    const findBuyer = {
      buyerEmail: buyerEmail,
      buyerPassword: buyerPassword
    };
    
    // This creates data that is present externally 
    axios
      .post("http://localhost:4000/buyer/login", findBuyer)
      .then(res => {
        // alert("Logging In.")
        console.log("Response", res.data);
        if (res.data.val === 0) {
            console.log("Empty Fields.");
            alert("Please enter email and password.");
        } else if (res.data.val === 1) {
          console.log("Not Registered.");
          alert("You are not registered. Register Now!");
        } else if (res.data.val === 2) {
          console.log("Incorrect Password.");
          alert("Incorrect Password! Try again.");
        }
        if (res.data.val === 3) {
          console.log("Found");
          alert("Logged in.")
          navigate("/");
          window.location.reload();
        }
      });
      resetInputs();
  };
  
  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Customer Email"
          variant="outlined"
          value={buyerEmail}
          onChange={onChangeBEmail}
          />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password"
          variant="outlined"
          value={buyerPassword}
          onChange={onChangeBuyerPassword}
          />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Log In
        </Button>
      </Grid>
    </Grid>
  );
};


const LoginVendor = (props) => {
  const [vendorEmail, setVendorEmail] = useState("");
  const [vendorPassword, setVendorPassword] = useState("");
  const navigate = useNavigate();

  const onChangeVEmail = (event) => {
    setVendorEmail(event.target.value);
  };

  const onChangeVendorPassword = (event) => {
    setVendorPassword(event.target.value);
  }

  const resetInputs = () => {
    setVendorEmail("");
    setVendorPassword("");
  };

  const onSubmit = (event) => {
    event.preventDefault();
    
    // This creates data that is present externally 
    const findVendor = {
      vendorEmail: vendorEmail,
      vendorPassword: vendorPassword
    };
    
    // This creates data that is present externally 
    axios
      .post("http://localhost:4000/vendor/login", findVendor)
      .then(res => {
        // alert("Logging In.")
        console.log("Response", res.data);
        if (res.data.val === 0) {
            console.log("Empty Fields.");
            alert("Please enter email and password.");
        } else if (res.data.val === 1) {
          console.log("Not Registered.");
          alert("You are not registered. Register Now!");
        } else if (res.data.val === 2) {
          console.log("Incorrect Password.");
          alert("Incorrect Password! Try again.");
        }
        if (res.data.val === 3) {
          console.log("Found");
          alert("Logged in.")
          navigate("/");
          window.location.reload();
        }
      });
      resetInputs();
  };

  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Vendor Email"
          variant="outlined"
          value={vendorEmail}
          onChange={onChangeVEmail}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password"
          variant="outlined"
          value={vendorPassword}
          onChange={onChangeVendorPassword}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Log In
        </Button>
      </Grid>
    </Grid>
  );
};

export default ShowLogin;