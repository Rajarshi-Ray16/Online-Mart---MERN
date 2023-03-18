import React, { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const VendorDispatch = (props) => {

  const [state, setState] = useState([]);
  const [dispatchProduct, setDispatchProduct] = useState(false);

  
  const componentDidMount = (event) => {
      const newUser = {
        username: localStorage.getItem("username")
      };
      if(localStorage.getItem("type")!=="vendor")
      {
        alert("You do not have permission to access this page")
        this.props.history.push("/");
      }
      // this.setState({ username: newUser.username });
      axios
        .post("http://localhost:4000/dispatchviewVendorProduct", newUser)
        .then(response => {
          this.setState({ prods: response.data });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  const dispatchprod = (prod_id) => {
    const newProd = {
      id: prod_id
    };
    axios
      .post("http://localhost:4000/dispatchVendorProduct", newProd)
      .then(response => {
        console.log(response.data)
        this.componentDidMount()
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  return (
      <div>        
        <h1>{localStorage.getItem("username")}'s Products</h1>
        <Table className="Table Table-striped">
          <TableHead>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Price</TableHead>
              {/* <TableHead>Quantity</TableHead> */}
              <TableHead>Quantity Ordered</TableHead>
              {/* <TableHead>Quantity Remaining</TableHead> */}
              {/* <TableHead>Status</TableHead> */}
              <TableHead>Dispatch</TableHead>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.prods.map((p, i) => {
              return (
                <TableRow>
                  <TableCell>{p.productname}</TableCell>
                  <TableCell>{p.price}</TableCell>
                  {/* <TableCell>{p.quantity}</TableCell> */}
                  <TableCell>{p.quantity_ordered}</TableCell>
                  {/* <TableCell>{p.quantity_remaining}</TableCell> */}
                  {/* <TableCell>{p.status}</TableCell> */}
                  <TableCell className="del-cell">
                  <Button variant="warning" className="btn btn-primary" value="X" onClick={()=>{this.dispatchprod(p._id);}}>Dispatch</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
}

export default VendorDispatch;