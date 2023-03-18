var express = require("express");
var router = express.Router();

// Load vendor model
const Vendor = require("../models/Vendors");
const Item = require("../models/Items");
const Product = require("../models/Products");

// Getting all the vendors
router.get("/", function(req, res) {
    Vendor.find(function(err, vendors) {
        if (err) {
            console.log(err);
        } else {
            res.json(vendors);
        }
    })
});

// Add a vendor to db
router.route("/register").post((req, res) => {

    const newVendor = new Vendor({
        vendorName: req.body.vendorName,
        vendorEmail: req.body.vendorEmail,
        shopName: req.body.shopName,
        vendorContactNumber: req.body.vendorContactNumber,
        openingTime: req.body.openingTime,
        closingTime: req.body.closingTime,
        vendorPassword: req.body.vendorPassword,
        date: req.body.date,
        loggedIn: req.body.loggedIn
    });

    newVendor.save()
        .then(vendor => {
            console.log("Saved");
            res.status(200).json(vendor);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send(err);
        });
});

// Login API
router.route("/login").post((req, res) => {
    console.log(req.body);

    let response = {
        val: ""
    };

    if (!req.body.vendorEmail || !req.body.vendorPassword) {
        console.log("Why is this coming up?")
        response.val = 0;
        console.log("Empty Fields.");
        res.json(response);
    } else {
        Vendor.findOne({ vendorEmail: req.body.vendorEmail }, function(err, vendors) {
            if (err) {
                console.log(err);
                console.log("Rubbish.");
            } else {
                console.log("Working");
                if (!vendors) {
                    //Not found
                    console.log("Not registered.");
                    response.val = 1;
                    res.json(response);
                } else {
                    if (req.body.vendorPassword === vendors.vendorPassword) {
                        const idRequired = vendors._id;
                        Vendor.findByIdAndUpdate(idRequired, { $set: { loggedIn: true } }, (err, doc) => {
                            if (err) return console.log(err);
                        });
                        console.log("You're in!");
                        response.val = 3;
                        res.json(response);
                    } else {
                        console.log("Not your account!");
                        response.val = 2;
                        res.json(response);
                    }
                }
            }
        });
    }
});

// Logout API
router.route("/logout").post((req, res) => {
    console.log(req.body);

    let response = {
        val: ""
    };

    Vendor.findOne({ vendorName: req.body.vendorName }, function(err, vendors) {
        if (err)
            console.log(err);
        else {
            console.log("Working");
            const idRequired = vendors._id;
            Vendor.findByIdAndUpdate(idRequired, { $set: { loggedIn: false } }, (err, docs) => {
                if (err) return console.log(err);
                else console.log("Delete: ", docs);
            });
            console.log("You're logged out!");
            response.val = 1;
            res.json(response);
        }
    });
});

// Edit the details of a vendor
router.route("/edit").post((req, res) => {
    console.log(req.body);

    let response = {
        val: ""
    }

    Vendor.findOne({ loggedIn: true }, (err, vendor) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Working till here.");
            if (!req.body.password) {
                response.val = 0;
                res.json(response);
            } else {
                if (!req.body.vendorName && !req.body.vendorEmail && !req.body.shopName && !req.body.vendorContactNumber && !req.body.openingTime && !req.body.closingTime) {
                    response.val = 1;
                    res.json(response);
                    console.log("Fill at least one of the blanks.")
                } else {
                    if (req.body.vendorName) {
                        const idRequired = vendor._id;
                        Vendor.findByIdAndUpdate(idRequired, { $set: { vendorName: req.body.vendorName } }, (err, docs) => {
                            if (err) return console.log(err);
                            else console.log("Delete: ", docs);
                        });
                        console.log("The changes have been made for the user.")
                    }
                    if (req.body.vendorEmail) {
                        const idRequired = vendor._id;
                        Vendor.findByIdAndUpdate(idRequired, { $set: { vendorEmail: req.body.vendorEmail } }, (err, docs) => {
                            if (err) return console.log(err);
                            else console.log("Delete: ", docs);
                        });
                        console.log("The changes have been made for the user.")
                    }
                    if (req.body.vendorContactNumber) {
                        const idRequired = vendor._id;
                        Vendor.findByIdAndUpdate(idRequired, { $set: { vendorContactNumber: req.body.vendorContactNumber } }, (err, docs) => {
                            if (err) return console.log(err);
                            else console.log("Delete: ", docs);
                        });
                        console.log("The changes have been made for the user.")
                    }
                    if (req.body.openingTime) {
                        const idRequired = vendor._id;
                        Vendor.findByIdAndUpdate(idRequired, { $set: { openingTime: req.body.openingTime } }, (err, docs) => {
                            if (err) return console.log(err);
                            else console.log("Delete: ", docs);
                        });
                        console.log("The changes have been made for the user.")
                    }
                    if (req.body.closingTime) {
                        const idRequired = vendor._id;
                        Vendor.findByIdAndUpdate(idRequired, { $set: { closingTime: req.body.closingTime } }, (err, docs) => {
                            if (err) return console.log(err);
                            else console.log("Delete: ", docs);
                        });
                        console.log("The changes have been made for the user.")
                    }
                    if (req.body.shopName) {
                        const idRequired = vendor._id;
                        Vendor.findByIdAndUpdate(idRequired, { $set: { shopName: req.body.shopName } }, (err, docs) => {
                            if (err) return console.log(err);
                            else console.log("Delete: ", docs);
                        });
                        console.log("The changes have been made for the user.")
                    }
                    response.val = 2;
                    res.json(response);
                }
            }
        }
    })
});

// Delete an account
router.route("/delete").post((req, res) => {
    console.log(req.body);

    let response = {
        val: ""
    }

    Vendor.findOne({ loggedIn: true }, function(err, vendors) {
        if (err)
            console.log(err);
        else {
            if (!req.body.vendorPassword) {
                response.val = 0;
                console.log("Enter your password to delete your account!");
                return res.json(response);
            } else {
                if (!(vendors.vendorPassword === req.body.vendorPassword)) {
                    console.log("The password is incorrect!");
                    response.val = 1;
                    res.json(response);
                } else {
                    console.log("Working");
                    const idRequired = vendors._id;
                    Vendor.findByIdAndUpdate(idRequired, { $set: { loggedIn: false } }, (err, docs) => {
                        if (err) return console.log(err);
                        else console.log("Updated: ", docs);
                    });
                    console.log("You're logged out!");
                    Vendor.findByIdAndDelete(idRequired, (err, docs) => {
                        if (err) return console.log(err);
                        else console.log("Deleted: ", docs);
                    });
                    console.log("The account has been deleted.");
                    response.val = 2;
                    res.json(response);
                }
            }
        }
    });
});

// Getting all the items
router.get("/items", function(req, res) {
    Item.find(function(err, items) {
        if (err) {
            console.log(err);
        } else {
            res.json(items);
        }
    })
});

// Add an item to db
router.post("/additem", (req, res) => {

    console.log(req.body)

    const newItem = new Item({
        vendor: req.body.shopName,
        itemName: req.body.itemName,
        price: req.body.price,
        rating: req.body.rating,
        veg: req.body.veg,
        addons: req.body.addons,
        tags: req.body.tags
    });

    console.log(newItem);

    newItem.save()
        .then(item => {
            console.log("Saved");
            res.status(200).json(item);
        })
        .catch(err => {
            console.log("There is an error");
            return res.status(400).send(err);
        });

});

// Edit the details of an item
router.route("/edititem").post((req, res) => {
    console.log(req.body);

    let response = {
        val: ""
    };

    if (req.body.itemName === "") {
        response.val = 3;
        res.json(response);
    } else {
        Item.findOne({ itemName: req.body.itemName }, (err, item) => {
            if (!req.body.price && !req.body.veg && !req.body.addons && !req.body.addonsAdd && !req.body.addonsDelete && !req.body.tags && !req.body.tagsAdd && !req.body.tagsDelete) {
                response.val = 1;
                res.json(response);
                console.log("Fill at least one of the blanks.")
            } else {
                console.log(item);
                const idRequired = item._id;
                if (req.body.price) {
                    Item.findByIdAndUpdate(idRequired, { $set: { price: req.body.price } }, (err, docs) => {
                        if (err) return console.log(err);
                        else console.log("Delete: ", docs);
                    });
                    console.log("The changes have been made for the item.");
                }
                if (req.body.veg) {
                    Item.findByIdAndUpdate(idRequired, { $set: { veg: req.body.veg } }, (err, docs) => {
                        if (err) return console.log(err);
                        else console.log("Delete: ", docs);
                    });
                    console.log("The changes have been made for the item.");
                }
                if (req.body.addons) {
                    Item.findByIdAndUpdate(idRequired, { $set: { addons: req.body.addons } }, (err, docs) => {
                        if (err) return console.log(err);
                        else console.log("Delete: ", docs);
                    });
                    console.log("The changes have been made for the item.");
                }
                if (req.body.addonsAdd) {
                    let finalAddons = item.addons.concat(req.body.addonsAdd);
                    Item.findByIdAndUpdate(idRequired, { $set: { addons: finalAddons } }, (err, docs) => {
                        if (err) return console.log(err);
                        else console.log("Delete: ", docs);
                    });
                    console.log("The changes have been made for the item.");
                }
                if (req.body.addonsDelete) {
                    let finalAddons = item.addons;
                    let bodyArray = req.body.addonsDelete;
                    bodyArray.forEach((addon) => {
                        const index = finalAddons.indexOf(addon);
                        if (index > -1) {
                            finalAddons.splice(index, 1);
                        }
                    });
                    Item.findByIdAndUpdate(idRequired, { $set: { addons: finalAddons } }, (err, docs) => {
                        if (err) return console.log(err);
                        else console.log("Delete: ", docs);
                    });
                    console.log("The changes have been made for the item.");
                }
                if (req.body.tags) {
                    Item.findByIdAndUpdate(idRequired, { $set: { tags: req.body.tags } }, (err, docs) => {
                        if (err) return console.log(err);
                        else console.log("Delete: ", docs);
                    });
                    console.log("The changes have been made for the item.");
                }
                if (req.body.tagsAdd) {
                    let finalTags = item.tags.concat(req.body.tagsAdd);
                    Item.findByIdAndUpdate(idRequired, { $set: { tags: finalTags } }, (err, docs) => {
                        if (err) return console.log(err);
                        else console.log("Delete: ", docs);
                    });
                    console.log("The changes have been made for the item.");
                }
                if (req.body.tagsDelete) {
                    let finalTags = item.tags;
                    let bodyArray = req.body.tagsDelete;
                    bodyArray.forEach((tag) => {
                        const index = finalTags.indexOf(tag);
                        if (index > -1) {
                            finalTags.splice(index, 1);
                        }
                    });
                    Item.findByIdAndUpdate(idRequired, { $set: { tags: finalTags } }, (err, docs) => {
                        if (err) return console.log(err);
                        else console.log("Delete: ", docs);
                    });
                    console.log("The changes have been made for the item.");
                }
                response.val = 2;
                res.json(response);
            }
        })
    }
});

// Delete an item
router.route("/deleteitem").post((req, res) => {
    console.log(req.body);

    let response = {
        val: ""
    };

    Item.findOne({ itemName: req.body.itemName }, function(err, items) {
        if (err)
            console.log(err);
        else {
            console.log("Working");
            const idRequired = items._id;
            Vendor.findByIdAndDelete(idRequired, (err, docs) => {
                if (err) return console.log(err);
                else console.log("Deleted: ", docs);
            });
            response.val = 1;
            res.json(response);
        }
    });

});

// Getting all the products
router.get("/products", function(req, res) {
    Product.find(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    })
});

// Update the status of a product
router.route("/updateproductstatus").post((req, res) => {
    console.log(req.body);

    let response = {
        val: ""
    };

    if (req.body.productID === "") {
        response.val = 1;
        res.json(response);
    } else {
        Product.findOne({ _id: req.body.productID }, (err, product) => {
            if (err) return console.log(err);
            else {
                console.log(product);
                const idRequired = product._id;
                if (req.body.status === "Placed") {
                    if (req.body.vendorResponse === "update") {
                        Product.findByIdAndUpdate(idRequired, { $set: { status: "Accepted" } }, (err, docs) => {
                            if (err) return console.log(err);
                            else console.log("Delete: ", docs);
                        });
                        Item.findOne({ itemName: req.body.productName }, function(err3, item) {
                            if (err3) {
                                console.log(err3)
                            } else {
                                idRequired = item._id;
                                finalAmount = parseInt(item.timesOrdered) + 1;
                                Item.findByIdAndUpdate(idRequired, { $set: { timesOrdered: finalAmount } }, (err4, doc2) => {
                                    if (err4) return console.log(err4);
                                    else return console.log("Here: ", doc2)
                                });
                            }
                        });
                    } else if (req.body.vendorResponse === "reject") {
                        Product.findByIdAndUpdate(idRequired, { $set: { status: "Rejected" } }, (err, docs) => {
                            if (err) return console.log(err);
                            else console.log("Delete: ", docs);
                        });
                    } else if (req.body.vendorResponse === "cancel") {
                        Product.findByIdAndUpdate(idRequired, { $set: { status: "Cancelled" } }, (err, docs) => {
                            if (err) return console.log(err);
                            else console.log("Delete: ", docs);
                        });
                    }
                }

                if (req.body.status === "Accepted") {
                    Product.findByIdAndUpdate(idRequired, { $set: { status: "Cooking" } }, (err, docs) => {
                        if (err) return console.log(err);
                        else console.log("Delete: ", docs);
                    });
                    console.log("The changes have been made for the item.");
                } else if (req.body.status === "Cooking") {
                    Product.findByIdAndUpdate(idRequired, { $set: { status: "Ready for Pickup" } }, (err, docs) => {
                        if (err) return console.log(err);
                        else console.log("Delete: ", docs);
                    });
                    console.log("The changes have been made for the item.");
                } else if (req.body.status === "Ready for Pickup") {
                    Product.findByIdAndUpdate(idRequired, { $set: { status: "Completed" } }, (err, docs) => {
                        if (err) return console.log(err);
                        else console.log("Delete: ", docs);
                    });
                    console.log("The changes have been made for the item.");
                }

                response.val = 2;
                res.json(response);
            }
        })
    }
});

module.exports = router;