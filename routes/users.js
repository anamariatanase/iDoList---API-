const express = require('express');
const bcrypt = require('bcryptjs')
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv/config');
const User = require('../models/User');
const { findOne } = require('../models/User');


router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err })
    }
});


router.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(200).send({
            message: "user not found"
        })
    }
    if (!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(200).send({
            message: "invalid credentials"
        })
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY)
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    res.json({
        message: "success"
    })
});


router.post('/signup', async (req, res) => {

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.lastName,
            app_background: req.body.app_background,
            lists: req.body.lists
        });
        const savedUser = await user.save();
        const { password, ...data } = savedUser.toJSON()
        res.json(data);
    } catch (err) {
        res.json({ message: err });
    }
});


router.get('/user', async (req, res) => {
    try {
        const cookie = req.cookies['jwt'];
        const claims = jwt.verify(cookie, process.env.JWT_KEY);
        if (!claims) {
            return res.status(401).send({
                message: "unauthenticated"
            })
        }
        const user = await User.findOne({ _id: claims._id });
        const {password,...data} = user.toJSON()
        res.send(data)
    } catch (err) {
        res.json({ message: err })
    }
});


router.get('/:username', async (req, res) => {
    try {
        const user = User.findById(req.params.username);
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
});


router.delete('/:username', async (req, res) => {
    try {
        const removedUser = await User.deleteOne({ username: req.params.username });
        res.json(removedUser)
    } catch (err) {
        res.json({ message: err });
    }
});


router.patch('/:username', async (req, res) => {
    try {
        const updatedUser = await User.updateOne({ username: req.params.username }, {
            $set: {
                firstName: req.body.firstName,
            }
        });
        res.json(updatedUser);
    } catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;