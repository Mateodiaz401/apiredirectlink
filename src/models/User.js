const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema, model } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true },
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        console.log(error);
        throw new Error("Error al codificar la contraseña");
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};


module.exports = model('User', userSchema);