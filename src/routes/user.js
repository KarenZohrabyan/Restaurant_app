const express = require("express");
const userController = require("../controllers/user");
const emailVal = require("email-validator");
const bcr = require("bcryptjs");
const { PrismaClient } = require(".prisma/client");

const router = express.Router();
const {user} = new PrismaClient();

// Register
router.use('/user', async(req, res, next) => {
    const email = req.body.email;
    if(!emailVal.validate(email)) {
        res.status(400).send({error: 'The email is not valid!', status: 400})
        // next(Err);
    } else {
        next();
    }
})

router.use('/user', async (req, res, next) => {
    const email = req.body.email;
    const ifUserExists = await user.findUnique({
        where: {
            email: email
        },
    })

    if(ifUserExists) {
        res.status(400).send({error: 'There is user with that email!', status: 400})
        // next(Err)
    } else {
        next();
    }
    
})
router.post('/user', userController.register);

// Login
router.use('/login', async (req, res, next) => {
    const {password, email} = req.body;
    const ifUserExists = await user.findUnique({
        where: {
            email: email
        },
    })

    if(!ifUserExists) {
        const Err = new Error('Your credentials are incorrect!');
        Err.status = 400;
        next(Err);
        throw Err;
    }

    const hash = await bcr.compare(password, ifUserExists.password);

    if(!hash) {
        const Err = new Error('Your credentials are incorrect!');
        Err.status = 400;
        next(Err);
        throw Err;
    }

    next();
})

router.post('/login', userController.login);

router.use('/users', async (req, res, next) => {
    const users = await user.findMany();
    for(let i = 0; i < users.length; i++) {
        delete users[i].password;
        delete users[i].token;
    }
    res.locals.users = users;
    next();
})

router.get('/users', async (req, res) => {
    const users = res.locals.users;
    res.send(users);
})

router.get('/orders', async (req, res) => {
    
})
module.exports = router;
