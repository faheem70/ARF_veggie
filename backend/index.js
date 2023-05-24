const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config()
const app = express()
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
app.use(cors())
app.use(express.json({ limit: "10mb" }))

const PORT = process.env.PORT || 4000

// mongodb connection

mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connect to Databse"))
    .catch((err) => console.log(err));

//schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    confirmPassword: String,
    image: String,
});

// 

const userModel = mongoose.model("user", userSchema);

app.get("/", (req, res) => {
    res.send("server is running");
})

//sign up
app.post("https://veggie-arf-uvgi.onrender.com/signup", async (req, res) => {
    console.log(req.body);
    const { email } = req.body;
    userModel.findOne({ email: email }).then((result) => {
        if (result) {
            res.send({ message: "Email id is already register", alert: false });
        } else if (result) {
            const data = userModel(req.body);
            const save = data.save();
            res.send({ message: "Successfully sign up", alert: true });
        }
    }).catch((err) => {
        console.log(err);
    });
});


// login

app.post("https://veggie-arf-uvgi.onrender.com/login", (req, res) => {
    // console.log(req.body);
    const { email } = req.body;
    userModel.findOne({ email: email }, (err, result) => {
        if (result) {
            const dataSend = {
                _id: result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                image: result.image,
            };
            console.log(dataSend);
            res.send({
                message: "Login is successfully",
                alert: true,
                data: dataSend,
            });
        } else {
            res.send({
                message: "Email is not available, please sign up",
                alert: false,
            });
        }
    });
});



//Product Section 

const productSchema = mongoose.Schema({
    name: String,
    category: String,
    image: String,
    price: String,
    description: String,
})

const productModel = mongoose.model("product", productSchema);

// save product

app.post('https://veggie-arf-uvgi.onrender.com/uploadProduct', async (req, res) => {
    console.log(req.body);
    const data = await productModel(req.body)
    const datasave = await data.save()
    res.send({ message: "Uplaod Successfully" });
})


app.get("https://veggie-arf-uvgi.onrender.com/product", async (req, res) => {
    const data = await productModel.find({})
    res.send(JSON.stringify(data))
})
/*****payment getWay */
console.log(process.env.STRIPE_SECRET_KEY)




app.post("/create-checkout-session", async (req, res) => {

    try {
        const params = {
            submit_type: 'pay',
            mode: "payment",
            payment_method_types: ['card'],
            billing_address_collection: "auto",
            shipping_options: [{ shipping_rate: "shr_1N0qDnSAq8kJSdzMvlVkJdua" }],

            line_items: req.body.map((item) => {
                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: item.name,
                            // images : [item.image]
                        },
                        unit_amount: item.price * 100,
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: item.qty
                }
            }),

            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,


        }


        const session = await stripe.checkout.sessions.create(params)
        // console.log(session)
        res.status(200).json({ sessionId: session.id })
    }
    catch (err) {
        res.status(err.statusCode || 500).json(err.message)
    }

})
app.listen(PORT, () => console.log("server is running at port :" + PORT));