import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["Homme", "Femme", "Autre"], required: true },
    birthdate: { type: Date, required: true},
    createdAt: Date,
    updatedAt: Date,
}, {
    versionKey: false,
});

export const User = mongoose.model("User", UserSchema);
