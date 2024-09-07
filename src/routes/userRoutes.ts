import express from 'express';
//@ts-ignore
import User,{validate} from '../models/User.js'
import {auth} from '../middleware/auth'
import bcrypt from 'bcrypt'

 // Use `import` instead of `require`
import { transformResponse } from '../transformers/transformResponse.js';  // Ensure proper ES module syntax
// Create a new user
const router = express.Router();
router.post('/', async (req:any, res:any) => {

  try {

    const { error } = validate(req.body);
    
    if (error) res.status(400).send(transformResponse(null,error.details[0].message,400,false))
    const { name, email, age,password } = req.body;
    const newUser = new User({ name, email, age,password});
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
   
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
});


// Authenticated
router.get("/me", auth, async (req:any, res:any) => {
  try {
      const user = await User.findById(req.user._id).select("-password -__v");
      res.send(user);
  } catch (error) {
      console.log(error);
      res.send("An error occured");
  }
});

// Get all users
router.get('/', async (_:any, res:any) => {
  try {
    const users = await User.find();
res.status(200).json(transformResponse(users,"sucess",200,true))
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

// Get a user by ID
router.get('/:id', async (req:any, res:any) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user by ID
router.put('/:id', async (req:any, res:any) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a user by ID
router.delete('/:id', async (req:any, res:any) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      res.status(200).json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});


export default router