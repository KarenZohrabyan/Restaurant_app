const jwt = require("jsonwebtoken");
const { PrismaClient } = require(".prisma/client");
require('dotenv').config({path:"../../env"});

const {user} = new PrismaClient();

const auth = async (req, res, next) => {
    const code = process.env.code;
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, code);
        const User = await user.findUnique({
            where: {
                email: data.email
            },
        })
        res.locals.user = User;
        if(token !== User.token) {
            throw new Error();
        }
        next();
    } catch (error) {
        res.status(401).send({error: 'Authentication error!', status: 401})
    }
}

module.exports = auth;