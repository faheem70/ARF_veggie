const mongoose = require("mongoose")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const validator = require("validator");
const dotenv = require("dotenv").config()
const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("not valid email");
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
    },
    Image: String,
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});

// 



userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);

        if (this.confirmPassword) {
            this.confirmPassword = await bcrypt.hash(this.confirmPassword, 12);
        }
    }
    next();
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;