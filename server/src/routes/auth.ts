import express from "express";
import { User } from "../../models/users";

const router = express.Router();

router.post('/test/', async (req, res) => {
    const data = {
        username: req.body.username,
        password: req.body.password 
    }
    const user = new User(data)
    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(501).send("Failed");
    }
})

export {router as auth}