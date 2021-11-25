const express = require('express');
const multer =  require('multer');
const uuidv4 =  require('uuidv4');
const mongoose = require('mongoose');
var bodyparser = require('body-parser');
const router = express.Router();
const FormPost = require('../models/formPost');


// Routes
router.post('/save', (req, res) => {
    var pp=req?.files?.profileImg;
    var dc=req?.files?.doc;
    pp.mv('public/doc'+pp.name, function(err){
        if(err){
            res.json({"status": "image not uploaded"})
        } else {
            const newFormPost = new FormPost({
                name: req.body.name,
                email: req.body.email,
                dob: req.body.dob,
                phoneNo: req.body.phNo,
                address: req.body.address,
                pinCode: req.body.pincode,
                profilePic: pp?.name,
                resume: dc?.name,
            });
            // // .save
            newFormPost.save((error) => {
                if (error) {
                    res.status(500).json({ 
                        msg: 'Sorry, internal server errors' 
                    });
                    return;
                }
                // BlogPost
                res.json({
                    msg: 'Your data has been saved!!!'
                });
            }) 
            res.json({"status": "record inserted successfully"}) 
        }
    })
});


module.exports = router;