import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


const BuyerProfile = (props) => {
  
  const navigate = useNavigate();

  let buyersTemp, foundBuyer;
  const [buyerFound, setBuyerFound] = useState();

  useEffect(() => {
    axios
    .get("http://localhost:4000/buyer")
    .then(response => {
      buyersTemp = response.data;
      buyersTemp.forEach(buyer => {
        if (buyer.loggedIn === true) {
          setBuyerFound(buyer)
        }
      });
      // alert("You do not have permission to access this page");
      // navigate("/");
    })
    .catch((error) => {
      console.log(error);
    });

  }, [props.id]);
  
  return (
    <div>
        <Grid container>
          <Grid item lg={12}>
            <h3>Buyer Details</h3>
            <Paper>
              {(() => {
                if (buyerFound) {
                  return (
                    <Table size="small" align={"center"}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Contact Number</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Age</TableCell>
                          <TableCell>Batch Name</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>{buyerFound.buyerName}</TableCell>
                          <TableCell>{buyerFound.buyerContactNumber}</TableCell>
                          <TableCell>{buyerFound.buyerEmail}</TableCell>
                          <TableCell>{buyerFound.age}</TableCell>
                          <TableCell>{buyerFound.batchName}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  )
                } else {
                  return (
                    <Table size="small" align={"center"}></Table>
                  )
                }
              })()}
            </Paper>
          </Grid>
          <br/>
          {/* <Grid item lg={12} md={6} xs={12}>
            <Button variant="contained">
                Edit
            </Button>
          </Grid> */}
        </Grid>
      </div>
    );
  }
    
export default BuyerProfile;