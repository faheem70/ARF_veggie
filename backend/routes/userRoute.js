const express = require("express");
const router = new express.Router();
//const Stripe = require('stripe')
const User = require("../models/useModel");
var bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate")
const Product = require('../models/productModel');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const dotenv = require("dotenv").config()
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
    res.send("Server is running");
});

//sign up
/*router.post("/signup", async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.send({ message: "Email id is already registered", alert: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            password: hashedPassword,
            confirmPassword
            // other user data
        });

        const savedUser = await user.save();

        const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET_KEY);

        res.send({
            message: "Successfully sign up",
            alert: true,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


//api login
//api login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("Received login request for email:", email);
        const user = await User.findOne({ email });

        if (!user) {
            console.log("User not found:", email);
            return res.status(404).json({ message: "User not found" });
        }
        console.log("Entered Password (Trimmed):", password.trim());
        console.log("Stored Password (Trimmed):", user.password.trim());
        const isMatch = await bcrypt.compare(password.trim(), user.password.trim());
        console.log("Password Comparison Result:", isMatch);

        if (!isMatch) {
            console.log("Invalid password for user:", email);
            return res.status(422).json({ message: "Invalid details" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

        res.cookie("usercookie", token, {
            expires: new Date(Date.now() + 9000000),
            httpOnly: true
        });

        const userData = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            image: user.image,
        };

        res.status(200).json({
            message: "Login successful",
            alert: true,
            userData,
            token,
        });
    } catch (error) {
        console.log(error);
        console.log("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


*/

//Product Section



// save product

router.post('/uploadProduct', async (req, res) => {
    // console.log(req.body);
    const data = await Product(req.body)
    const datasave = await data.save()
    res.send({ message: "Uplaod Successfully" });
})


router.get("/product", async (req, res) => {
    const data = await Product.find({})
    res.send(JSON.stringify(data))
})
/*****payment getWay */



router.post("/create-checkout-session", async (req, res) => {
    try {
        const params = {
            submit_type: "pay",
            mode: "payment",
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            shipping_options: [{ shipping_rate: "shr_1NBHjfSBOVB47rxmhQothv6L" }],

            line_items: req.body.map((item) => {
                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: item.name,

                        },
                        unit_amount: item.price * 100,
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: item.qty,
                };
            }),

            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        };

        const session = await stripe.checkout.sessions.create(params);
        res.status(200).json({ sessionId: session.id });
    } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
    }
});


router.get("/validuser", authenticate, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.userId });
        res.status(201).json({ status: 201, user });
    } catch (error) {
        res.status(401).json({ status: 401, error });
    }
});


module.exports = router;