
import User from "../models/User"
import express from "express"
import bcrypt from "bcrypt"
import Joi from "joi"
import { IUser } from "../types"

const router = express.Router();

router.post("/", async (req:any, res:any) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Invalid email or password");

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword)
            return res.status(400).send("Invalid email or password");
  //@ts-ignore
        const token = user?.generateAuthToken();
        res.send(token);
    } catch (error) {
        console.log(error);
        res.send("An error occured");
    }
});

const validate = (user:IUser) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(user);
};

export default  router;