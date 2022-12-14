import express from "express";
import { User } from "../../mongo/User";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post('/register/', async (req, res) => {
    const data = {
        username: req.body.username,
        email: req.body.email,
        gender: req.body.gender,
        birthdate: req.body.birthdate,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
    }
    const user = new User(data)
    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(501).send("Failed");
    }
})

router.post('/login/', async (req, res) => {
    const query = await User.findOne({email: req.body.email});
    try {
        if (bcrypt.compareSync(req.body.password, query?.password as string) === true) {
            res.send(query);
        } else {
            res.status(501).send("Bad email or password");
        }
    } catch (err: any) {
        res.status(501).send(err.message);
    }
})

export { router as Auth }