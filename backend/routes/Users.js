// var express = require("express");
// var router = express.Router();

// // Load User model
// const Buyer = require("../models/Buyers");
// const Vendor = require("../models/Vendors");

// // GET request 
// // Getting all the buyers
// router.get("/", function(req, res) {
//     Buyer.find(function(err, buyers) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			res.json(buyers);
// 		}
// 	})
// });

// // GET request 
// // Getting all the vendors
// router.get("/vendors", function(req, res) {
//     Vendor.find(function(err, vendors) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			res.json(vendors);
// 		}
// 	})
// });

// // POST requests
// // Add a buyer to db
// router.post("/register", (req, res) => {
//     const newBuyer = new Buyer({
//         buyerName: req.body.buyerName,
//         buyerEmail: req.body.buyerEmail,
//         age: req.body.age,
//         buyerContactNumber: req.body.buyerContactNumber,
//         batchName: req.body.batchName
//     });

//     newBuyer.save()
//         .then(buyer => {
//             console.log("Saved");
//             res.status(200).json(buyer);
//         })
//         .catch(err => {
//             res.status(400).send(err);
//         });
// });

// // Add a vendor to db
// router.post("/registerVendor", (req, res) => {
//     const newVendor = new Vendor({
//         vendorName: req.body.vendorName,
//         vendorEmail: req.body.vendorEmail,
//         shopName: req.body.shopName,
//         vendorContactNumber: req.body.vendorContactNumber,
//         openingTime: req.body.openingTime,
//         closingTime: req.body.closingTime
//     });

//     newVendor.save()
//         .then(vendor => {
//             res.status(200).json(vendor);
//         })
//         .catch(err => {
//             res.status(400).send(err);
//         });
// });

// // Login API
// router.post("/login", (req, res) => {
//     console.log("Here");
//     console.log(req.body);
//     let response = {
//         val: "",
//         type: ""
//     };
//     if (!req.body.email || !req.body.password) {
//         response.val = 0;
//         res.json(response);
//     } else {
//         User.findOne({ email: req.body.email }, function(err, users) {
//             if (err)
//                 console.log(err);
//             else {
//                 if (!users) {
//                     //Not found
//                     console.log("Not registered.");
//                     response.val = 1;
//                     res.json(response);
//                 } else {
//                     users.comparePassword(req.body.password, (err, isMatch) => {
//                         if (err) {
//                             throw err;
//                         }
//                         console.log(req.body.password, isMatch);
//                         if (isMatch) {
//                             currentuser = req.body.email;
//                             response.val = 3;
//                             response.type = users.type;
//                             res.json(response);
//                         } else {
//                             response.val = 2;
//                             res.json(response);
//                         }
//                     });
//                 }
//             }
//         });
//     }
//     console.log("In server.", response);
// });

// module.exports = router;