const express = require('express');
const userModel = require('../Model/user.model.js');
const doctorModel = require('../Model/doctorModel.js');
const jwt = require('jsonwebtoken');
const router = express.Router();


router.get('/',async(req,res)=>{
    try{
        const data = await userModel.find();
        res.json(data);

    }catch(e){
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });

    }
})

router.get('/doctors',async(req,res)=>{
    try{
        const data = await doctorModel.find();
        res.json(data);

    }catch(e){
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });

    }
})
router.get('/doctor/:email',async(req,res)=>{
    const email = req.params.email;
    try {
        const user = await doctorModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }
        else{
            return res.status(200).json(user);
        }
    } catch (error) {
        res.status(400).json({message:error.message});
    }
})

router.post('/postDoctor',async(req,res)=>{
    const { name,hospital,specialist,availableTime,availableDays,fees,email} = req.body;

    if (!name || !hospital || !email || !specialist || !availableTime || !availableDays || !fees) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }
    const data = new doctorModel({
        name ,
        hospital ,
        specialist,
        availableDays ,
        availableTime,
        fees,
        email 
    });
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
})

router.post('/post',async(req,res)=>{
    const { firstName, lastName, email, password, isDoctor } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }
    const data = new userModel({
        firstName ,
        lastName ,
        email,
        password ,
        isDoctor 
    });
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Checking if the email exists in the database
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        // If the email is found, check if the provided password matches the stored password
        if (user.password === password) {
            const token = jwt.sign({ userId: user._id, email: user.email }, 'secret-key', { expiresIn: '1h' });
            res.status(200).json({ 
                userId: user._id,
                email,
                isAuthenticated : true,
                isDoctor:user.isDoctor,
                token,
                message: 'Email and password verified successfully' });
        } else {
            res.status(401).json({ message: 'Invalid password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;