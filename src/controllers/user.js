const {PrismaClient} = require(".prisma/client");
const bcr = require("bcryptjs");
const {user} = new PrismaClient();
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
    const {firstname, lastname, password, email} = req.body;

    const salt = await bcr.genSalt(8);
    const hashedPassword = await bcr.hash(password, salt);
    const token = jwt.sign({ email }, process.env.code, { expiresIn: '1 day'});

    const User = await user.create({
        data: {
            firstname,
            lastname,
            password: hashedPassword,
            email,
            token,
        }
    });

    res.json(User);
}

const login = async (req, res) => {
    const {password, email} = req.body;
    const token = jwt.sign({ email }, process.env.code, { expiresIn: '1 day'});
    await user.update({
        where: {
            email,
        },
        data: {
            token: token,
        }
    })
    const data = jwt.verify(token, process.env.code);
    res.send({token});
}



module.exports = {
    register: register,
    login: login,
}