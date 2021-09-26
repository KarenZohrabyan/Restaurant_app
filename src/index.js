const express = require("express");
const User = require("./routes/user");
const Order = require("./routes/order");
const auth = require("./middleware/auth");
const {meals, tables} = require("./dataForTesting/data")

const { PrismaClient } = require(".prisma/client");
const client = new PrismaClient();

require('dotenv').config({path:"env"});

const app = express();
const port = 5000;

app.use(express.json());

app.use('/api/users', User);
app.use('/api/orders', Order);

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(err));
})

app.get('/fillData', async (req, res) => {
    meals.forEach(async (item) => {
        await client.meal.create({
            data: {
                price: item.price,
                name: item.name
            }
        })
    }),
    tables.forEach(async (item) => {
        await client.table.create({
            data: {
                price: item.price
            }
        })
    })
})

app.listen(port,async () => {
    console.log('Server is runing');
})