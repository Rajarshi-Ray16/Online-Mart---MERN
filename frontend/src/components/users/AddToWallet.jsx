import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import { useNavigate } from "react-router-dom";

const AddToWallet = (props) => {

  const [amountToBeAdded, setAmountToBeAdded] = useState();

  const navigate = useNavigate();

  const onChangeAmountToBeAdded = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      setAmountToBeAdded(event.target.value);
    }
  }

  const resetInputs = (event) => {
    setAmountToBeAdded("");
  }

  const onSubmit = (event) => {
    event.preventDefault();

    const addAmount = {
      amountToBeAdded: amountToBeAdded
    };
    
    axios
      .post("http://localhost:4000/buyer/addtowallet", addAmount)
      .then(res => {
        console.log("Response", res.data);
        if (res.data.val === 0) {
          console.log("Empty Fields.");
          alert("Please enter email and password");
        } else if (res.data.val === 1) {
          console.log("Not logged in.");
          alert("You do not belong here.");
          navigate("/");
        } else if (res.data.val === 2) {
          console.log("Added to wallet!");
          alert("Amount added to wallet!");
          navigate("/");
        }
    });

    // alert("Amount added to wallet!")
    resetInputs();
  }

  return (
    <Grid container align={"center"} spacing={2}>
      {/* <Grid item xs={12} >
        <TextField
            label="Email"
            variant="outlined"
            value={buyerEmail}
            onChange={onChangeBEmail}
        />
      </Grid> */}
      <Grid item xs={12} >
        <TextField
            label="Amount to be Added"
            variant="outlined"
            value={amountToBeAdded}
            onChange={onChangeAmountToBeAdded}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained" 
          onClick={onSubmit}
        >
          Add to Wallet
        </Button>
      </Grid>
    </Grid>
  )
}

export default AddToWallet;