var express = require("express");
var router = express.Router();

// Load Item model
const Item = require("../models/Items");

// GET request 
// Getting all the items
router.get("/", function(req, res) {
    Item.find(function(err, items) {
        if (err) {
            console.log(err);
        } else {
            res.json(items);
        }
    })
});

// POST requests
// Add an item to db
router.post("/register", (req, res) => {

    const newItem = new Item({
        vendor: req.body.vendor,
        itemName: req.body.itemName,
        price: req.body.price,
        rating: req.body.rating,
        veg: req.body.veg,
        addons: req.body.addons,
        tags: req.body.tags,
        timesOrdered: 0
    });

    newItem.save()
        .then(item => {
            // console.log(item)
            console.log("Saved");
            res.status(200).json(item);
        })
        .catch(err => {
            return res.status(400).send(err);
        });

});

//Edit an existing item
router.route("/edit").post((req, res) => {
    console.log(req.body);

    let response = {
        val: ""
    };

    if (!req.body.password) {
        response.val = 0;
        res.json(response);
    } else {
        if (!req.body.itemName && !req.body.itemEmail && !req.body.batchName && !req.body.itemContactNumber && !req.body.age) {
            response.val = 1;
            res.json(response);
            console.log("Fill at least one of the blanks.")
        } else {
            if (req.body.itemName) {
                console.log("The changes have been made for the user.")
            }
            if (req.body.itemEmail) {
                console.log("The changes have been made for the user.")
            }
            if (req.body.itemContactNumber) {
                console.log("The changes have been made for the user.")
            }
            if (req.body.age) {
                console.log("The changes have been made for the user.")
            }
            if (req.body.batchName) {
                console.log("The changes have been made for the user.")
            }
            response.val = 2;
            res.json(response);
        }
    }

});

router.route("/addtowallet").post((req, res) => {
    console.log("Hello")
    console.log(req.body);

    let response = {
        val: ""
    };

    if (req.body.amountToBeAdded === 0) {
        response.val = 0;
        res.json(response);
    } else {
        Item.findOne({ loggedIn: true }, function(err, items) {
            if (err)
                console.log(err);
            else {
                console.log("Working");
                if (!items) {
                    console.log("Not logged in.");
                    response.val = 1;
                    res.json(response);
                } else {
                    const idRequired = items._id;
                    let finalAmount = parseInt(items.wallet) + parseInt(req.body.amountToBeAdded);
                    Item.findByIdAndUpdate(idRequired, { $set: { wallet: finalAmount } }, (err, doc) => {
                        if (err) return console.log(err);
                        response.val = 2;
                        res.json(response);
                    });
                }
            }
        });
    }
    console.log("In server", response);
});

module.exports = router;