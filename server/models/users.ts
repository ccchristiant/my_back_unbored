import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    createdAt: Date,
    updatedAt: Date
});

export const User = mongoose.model("UserModel", UserSchema);