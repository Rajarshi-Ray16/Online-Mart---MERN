import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { useNavigate, BrowserRouter as Router, Route, Link } from "react-router-dom";

const VendorItem = (props) => {
  
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const setShow = ( numValue ) => {
    if (numValue === 0) {
      setShowAdd(false);
      setShowEdit(false);
      setShowDelete(false);
    }
    else if (numValue === 1) {
      setShowAdd(true);
      setShowEdit(false);
      setShowDelete(false);
    }
    else if (numValue === 2) {
      setShowAdd(false);
      setShowEdit(true);
      setShowDelete(false);
    }
    else if (numValue === 3) {
      setShowAdd(false);
      setShowEdit(false);
      setShowDelete(true);
    }
  }

  return (
    <Grid align="center">
      <Grid item xs={3}>
        <Autocomplete
          id="combo-box-demo"
          options={["Add", "Edit", "Delete"]}
          getOptionLabel={(option) => option}
          onChange={(e, value) => value === "Add" ? setShow(1) : (value === "Edit" ? setShow(2): (value === "Delete" ? setShow(3) : setShow(0)))}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select the change you wish to make"
              variant="outlined"
              placeholder="Add, Edit, or Delete"
            />
          )}
        />
        <br/>
        {showAdd ? <AddItem />: (showEdit ? <EditItem /> : (showDelete ? <DeleteItem /> : <div></div>))}
      </Grid>
    </Grid>
  )
}


const AddItem = (props) => {

  const navigate = useNavigate();

  const [foundVendor, setFoundVendor] = useState("");
  let vendorsTemp;
  
  const [itemNameAdd, setItemNameAdd] = useState();
  const [priceAdd, setPriceAdd] = useState();
  const [vegAdd, setVegAdd] = useState();
  const [addonsAdd, setAddonsAdd] = useState();
  const [tagsAdd, setTagsAdd] = useState();

  //Getting the shop name of who is logged in.
  useEffect((foundVendor) => {
    axios
      .get("http://localhost:4000/vendor")
      .then((response) => {
        vendorsTemp = response.data;
        vendorsTemp.map((vendor, ind) => {
          if (vendor.loggedIn === true) {
            setFoundVendor(vendor.shopName);
          }
        })
      })
      .catch((error) => {
        console.log(error);
      });   
  }, [])

  const onChangeItemNameAdd = (event) => {
    setItemNameAdd(event.target.value);
  };

  const onChangePriceAdd = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      setPriceAdd(event.target.value);
    }
  };

  const onChangeAddonsAdd = (event) => {
    setAddonsAdd(event.target.value.split(","));
  };

  const onChangeTagsAdd = (event) => {
    setTagsAdd(event.target.value.split(","));
  };

  const resetInputsAdd = () => {
    setItemNameAdd();
    setPriceAdd();
    setVegAdd();
    setAddonsAdd();
    setTagsAdd();
  };

  const onSubmitAdd = (event) => {
    event.preventDefault();

    const newItem = {
      shopName: foundVendor,
      itemName: itemNameAdd,
      price: priceAdd,
      rating: 0,
      veg: vegAdd,
      addons: addonsAdd,
      tags: tagsAdd
    };

    console.log(newItem);

    // This creates data that is present externally 
    axios
      .post("http://localhost:4000/vendor/additem", newItem)
      .then(response => {
        console.log("Saved.");
        alert("Item has been added!");
        console.log(response.data);
      });

    resetInputsAdd();
  };

  return (
    <div>
      <Grid container align="center" spacing={2}>
        <Grid item xs={12} >
          <TextField
            label="Item name"
            variant="outlined"
            value={itemNameAdd}
            onChange={onChangeItemNameAdd}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Price"
            variant="outlined"
            value={priceAdd}
            onChange={onChangePriceAdd}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            id="combo-box-demo"
            options={["Vegetarian", "Non-Vegetarian"]}
            getOptionLabel={(option) => option}
            onChange={(e, value) => value === "Non-Vegetarian" ? setVegAdd(false) : setVegAdd(true)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Edible Type"
                variant="outlined"
                placeholder="Vegetarian or Non-Vegetarian"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Add-ons (Separate by comma)"
            variant="outlined"
            value={addonsAdd}
            onChange={onChangeAddonsAdd}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Tags"
            variant="outlined"
            value={tagsAdd}
            onChange={onChangeTagsAdd}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={onSubmitAdd}>
            Add Item
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

const EditItem = (props) => {

  const [itemNameEdit, setItemNameEdit] = useState();
  const [priceEdit, setPriceEdit] = useState();
  const [vegEdit, setVegEdit] = useState();
  const [addonsEdit, setAddonsEdit] = useState();
  const [addonsEditAdd, setAddonsEditAdd] = useState();
  const [addonsEditDelete, setAddonsEditDelete] = useState();
  const [tagsEdit, setTagsEdit] = useState();
  const [tagsEditAdd, setTagsEditAdd] = useState();
  const [tagsEditDelete, setTagsEditDelete] = useState();

  const onChangeItemNameEdit = (event) => {
    setItemNameEdit(event.target.value);
  };

  const onChangePriceEdit = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      setPriceEdit(event.target.value);
    }
  };

  const onChangeAddonsEdit = (event) => {
    setAddonsEdit(event.target.value.split(","));
  };

  const onChangeAddonsEditAdd = (event) => {
    setAddonsEditAdd(event.target.value.split(","));
  };

  const onChangeAddonsEditDelete = (event) => {
    setAddonsEditDelete(event.target.value.split(","));
  };

  const onChangeTagsEdit = (event) => {
    setTagsEdit(event.target.value.split(","));
  };

  const onChangeTagsEditAdd = (event) => {
    setTagsEditAdd(event.target.value.split(","));
  };

  const onChangeTagsEditDelete = (event) => {
    setTagsEditDelete(event.target.value.split(","));
  };

  const resetInputsEdit = () => {
    setItemNameEdit();
    setPriceEdit();
    setVegEdit();
    setAddonsEdit();
    setAddonsEditAdd();
    setAddonsEditDelete();
    setTagsEdit();
    setTagsEditAdd();
    setTagsEditDelete();
  };

  const onSubmitEdit = (event) => {
    event.preventDefault();

    const editItem = {
      itemName: itemNameEdit,
      price: priceEdit,
      veg: vegEdit,
      addons: addonsEdit,
      addonsAdd: addonsEditAdd,
      addonsDelete: addonsEditDelete,
      tags: tagsEdit,
      tagsAdd: tagsEditAdd,
      tagsDelete: tagsEditDelete
    };

    // This creates data that is present externally 
    axios
      .post("http://localhost:4000/vendor/edititem", editItem)
      .then(response => {
        console.log("Working till here.");
        if (response.data.val === 1) {
          console.log("No fields have been filled.");
          alert("Please fill atleast one field.");
        } else if (response.data.val === 2) {
          console.log("Saved.");
          alert("Item has been edited!");
        } else if (response.data.val === 3) {
          console.log("Item name needs to be inputted.");
          alert("Please, input an item name.");
        }
        console.log(response.data);
      });

    resetInputsEdit();
  };

  return (
    <div>
      <Grid container align={"center"} spacing={2}>
        <Grid item xs={12} >
          <TextField
            label="Item name"
            variant="outlined"
            value={itemNameEdit}
            onChange={onChangeItemNameEdit}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Price"
            variant="outlined"
            value={priceEdit}
            onChange={onChangePriceEdit}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            id="combo-box-demo"
            options={["Vegetarian", "Non-Vegetarian"]}
            getOptionLabel={(option) => option}
            onChange={(e, value) => value === "Non-Vegetarian" ? setVegEdit(false) : setVegEdit(true)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Edible Type"
                variant="outlined"
                placeholder="Vegetarian or Non-Vegetarian"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Add-ons"
            variant="outlined"
            value={addonsEdit}
            onChange={onChangeAddonsEdit}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Add to existing Add-ons"
            variant="outlined"
            value={addonsEditAdd}
            onChange={onChangeAddonsEditAdd}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Remove from existing Add-ons"
            variant="outlined"
            value={addonsEditDelete}
            onChange={onChangeAddonsEditDelete}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Tags"
            variant="outlined"
            value={tagsEdit}
            onChange={onChangeTagsEdit}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Add to existing Tags"
            variant="outlined"
            value={tagsEditAdd}
            onChange={onChangeTagsEditAdd}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Remove from existing Tags"
            variant="outlined"
            value={tagsEditDelete}
            onChange={onChangeTagsEditDelete}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={onSubmitEdit}>
            Edit Item
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

const DeleteItem = (props) => {

  const [itemNameDelete, setItemNameDelete] = useEffect("");

  const onChangeItemNameDelete = (event) => {
    setItemNameDelete(event.target.value);
  };

  const resetInputsDelete = () => {
    setItemNameDelete("");
  };

  const onSubmitDelete = (event) => {
    event.preventDefault();

    const deleteItem = {
      itemName: itemNameDelete
    };

    // This creates data that is present externally 
    axios
      .post("http://localhost:4000/vendor/deleteitem", deleteItem)
      .then(response => {
        console.log("Working till here.");
        if (response.data.val === 1) {
          console.log("Deleted.");
          alert("Item has been deleted!");
        }
        console.log(response.data);
      });

    resetInputsDelete();
  };

  return (
    <div>
      <Grid container align={"center"} spacing={2}>
        <Grid item xs={12} >
          <TextField
            label="Item name"
            variant="outlined"
            value={itemNameDelete}
            onChange={onChangeItemNameDelete}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={onSubmitDelete}>
            Delete Item
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default VendorItem;