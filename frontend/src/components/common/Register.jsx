import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TimeField from 'react-simple-timefield';
import { useNavigate } from 'react-router-dom';

const Show = (props) => {
  const [showBuyer, setShowBuyer] = useState(false);
  const [showVendor, setShowVendor] = useState(false);

  const [buyers, setBuyers] = useState([]);
  const [vendors, setVendors] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {

    // navigate("/")
      
    axios
      .get("http://localhost:4000/buyer")
      .then((response) => {
        setBuyers(response.data);
        buyers.map((buyer, ind) => {
          if (buyer.loggedIn === true) {
            console.log(buyer.buyerName, " is already logged in.");
            alert("Someone is already logged in!");
            navigate("/");
            return ind;
          }
        })
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log("The search for logged in buyers is done.")
    // console.log("Starting the search for the vendors.")
    axios
      .get("http://localhost:4000/vendor")
      .then((response) => {
        setVendors(response.data)
        vendors.map((vendor, ind) => {
          if (vendor.loggedIn === true) {
            alert("Someone is already logged in!")
            navigate("/");
            return ind;
          }
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const setShow = ( numValue ) => {
    if (numValue === 0) {
      setShowBuyer(false);
      setShowVendor(false);
    }
    else if (numValue === 1) {
      setShowBuyer(true);
      setShowVendor(false);
    }
    else if (numValue === 2) {
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
          onChange={(e, value) => value === "Vendor" ? setShow(2) : (value === "Buyer" ? setShow(1): setShow(0))}

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
        {showBuyer ? <RegisterBuyer />: (showVendor ? <RegisterVendor /> : <div></div>)}
      </Grid>
    </Grid>

  )
}

const RegisterBuyer = (props) => {
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerContactNumber, setBuyerContactNumber] = useState("");
  const [age, setAge] = useState(0);
  const [batchName, setBatchName] = useState("");
  const [buyerPassword, setBuyerPassword] = useState("");

  const navigate = useNavigate()
  
  // function navigate(thePage) {
  //   const nav = useNavigate();
  //   nav(thePage);
  //   window.location.reload(false);
  // };

  const onChangeBuyerName = (event) => {
    setBuyerName(event.target.value);
  };

  const onChangeBEmail = (event) => {
    setBuyerEmail(event.target.value);
  };

  const onChangeAge = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      setAge(event.target.value);
    }
  };

  const onChangeBCN = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      setBuyerContactNumber(event.target.value);
    }
  };

  const onChangeBatchName = (event) => {
    setBatchName(event.target.value);
  };

  const onChangeBuyerPassword = (event) => {
    setBuyerPassword(event.target.value);
  }

  const resetInputs = () => {
    setBuyerName("");
    setBuyerEmail("");
    setBuyerContactNumber("");
    setAge(0);
    setBatchName("");
    setBuyerPassword("");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newBuyer = {
      buyerName: buyerName,
      buyerEmail: buyerEmail,
      age: age,
      buyerContactNumber: buyerContactNumber,
      batchName: batchName,
      buyerPassword: buyerPassword,
      date: Date.now(),
      wallet: 0,
      loggedIn: true
    };

    // alert("Done till here");

    // This creates data that is present externally 
    axios
      .post("http://localhost:4000/buyer/register", newBuyer)
      .then((response) => {
        console.log("Working till here.");
        alert("Created\t" + response.data.buyerName);
        console.log(response.data);
        navigate("/");
        window.location.reload();
      });

    resetInputs();
  };

  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12} >
        <TextField
          label="Name"
          variant="outlined"
          value={buyerName}
          onChange={onChangeBuyerName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email"
          variant="outlined"
          value={buyerEmail}
          onChange={onChangeBEmail}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Age"
          variant="outlined"
          value={age}
          onChange={onChangeAge}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Contact Number"
          variant="outlined"
          value={buyerContactNumber}
          onChange={onChangeBCN}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Batch Name"
          variant="outlined"
          value={batchName}
          onChange={onChangeBatchName}
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
          Register
        </Button>
      </Grid>
    </Grid>
  );
};


const RegisterVendor = (props) => {
  const [vendorName, setVendorName] = useState("");
  const [vendorEmail, setVendorEmail] = useState("");
  const [vendorContactNumber, setVendorContactNumber] = useState("");
  const [openingTime, setOpeningTime] = useState("00:00");
  const [closingTime, setClosingTime] = useState("00:00");
  const [shopName, setShopName] = useState("");
  const [vendorPassword, setVendorPassword] = useState("");

  const navigate = useNavigate();

  const onChangeVendorName = (event) => {
    setVendorName(event.target.value);
  };

  const onChangeVEmail = (event) => {
    setVendorEmail(event.target.value);
  };

  const onChangeVCN = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      setVendorContactNumber(event.target.value);
    }
  };

  const onChangeOT = (event) => {
    setOpeningTime(event.target.value);
  };

  const onChangeCT = (event) => {
    setClosingTime(event.target.value);
  };

  const onChangeShopName = (event) => {
    setShopName(event.target.value);
  };

  const onChangeVendorPassword = (event) => {
    setVendorPassword(event.target.value);
  }

  const resetInputs = () => {
    setVendorName("");
    setVendorEmail("");
    setVendorContactNumber("");
    setOpeningTime("00:00");
    setClosingTime("00:00");
    setShopName("");
    setVendorPassword("");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newVendor = {
      vendorName: vendorName,
      vendorEmail: vendorEmail,
      shopName: shopName,
      vendorContactNumber: vendorContactNumber,
      openingTime: openingTime,
      closingTime: closingTime,
      vendorPassword: vendorPassword,
      date: Date.now(),
      loggedIn: true
    };

    // This creates data that is present externally 
    axios
      .post("http://localhost:4000/vendor/register", newVendor)
      .then((response) => {
        console.log("Working till here.");
        alert("Created\t" + response.data.vendorName);
        console.log(response.data);
        navigate("/");        
        window.location.reload();
      });

    resetInputs();
  };

  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12} >
        <TextField
          label="Name"
          variant="outlined"
          value={vendorName}
          onChange={onChangeVendorName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email"
          variant="outlined"
          value={vendorEmail}
          onChange={onChangeVEmail}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Contact Number"
          variant="outlined"
          value={vendorContactNumber}
          onChange={onChangeVCN}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Shop Name"
          variant="outlined"
          value={shopName}
          onChange={onChangeShopName}
        />
      </Grid>
      <Grid item xs={12}>
        <TimeField
          label="Opening Time"
          colon=":"
          default="10:00"
          onChange={onChangeOT}
          input={<TextField label="Name" value={openingTime} variant="outlined" />}
        />
      </Grid>
      <Grid item xs={12}>
        <TimeField
          label="Closing Time"
          colon=":"
          default="10:00"
          onChange={onChangeCT}
          input={<TextField label="Name" value={closingTime} variant="outlined" />}
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
          Register
        </Button>
      </Grid>
    </Grid>
  );
};

export default Show;