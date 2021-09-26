const express = require("express");
const { PrismaClient } = require(".prisma/client");
const auth = require("../middleware/auth");
const {mealType, tableType} = require("../utility/types");
const {getFreeHoursOfTable, setHours, setTime} = require("../utility/hours");

const hours = [];
setHours(hours);

const router = express.Router();
const client = new PrismaClient();

router.post('/order', auth, async (req, res) => {
    const orders = req.body;
    const order = await client.userOrder.create({
        data: {
            user_id: res.locals.user.id,
            price: 0,
        }
    });

    let orderPrice = 0;
    orders.tables.forEach(async (item) => {
        const meals = item.meals;
        const tableOrders = await client.tableOrder.findMany({
            where: {
                AND: [
                    {
                        tableId: item.tableId
                    },
                    {
                        month: item.month
                    },
                    {
                        day: item.day
                    }
                ]
            }
        })

        getFreeHoursOfTable(tableOrders, hours)
      
        let isFreeTime = true;
        if(+item.from === +item.to) {
            if(hours[+item.to - 1] === '-') {
                isFreeTime = false;
            }
        } else {
            for(let i = +item.from; i < +item.to; i++) {
                if(hours[i] === '-') {
                    isFreeTime = false;
                }
            }
        }
      
        setHours(hours)
        console.log(isFreeTime)
        if(isFreeTime) {
            // Table order 
            Object.assign(tableType.tableOrder.create, item);
            const searchTable = await client.table.findUnique({
                where: {
                    id: tableType.tableOrder.create.tableId
                }
            })
          
            tableType.tableOrder.create.price = +searchTable.price
            delete tableType.tableOrder.create.meals;
            orderPrice += tableType.tableOrder.create.price;

            await client.userOrder.update({
                where: {
                    id: order.id
                },
                data: {
                    price: tableType.tableOrder.create.price,
                    tableOrders: {
                        create: [tableType]
                    }
                }
            })

            // Meal Order
            meals.forEach(async (meal) => {
                const bookedMeal = await client.meal.findUnique({
                    where: {
                        id: meal.mealId
                    }
                })
                Object.assign(mealType.mealOrder.create, meal, bookedMeal);
                delete mealType.mealOrder.create.id
                orderPrice += ((+bookedMeal.price) * (+mealType.mealOrder.create.count));
                await client.userOrder.update({
                    where: {
                        id: order.id
                    },
                    data: {
                        price: orderPrice,
                        mealOrders: {
                            create: [mealType]
                        }
                    }
                })
            })

            orderPrice += item.price;
            res.status(200).send({msg: `You have successfully booked table`});
        } else {
                await client.userOrder.delete({
                    where: {
                        id: order.id
                    }
                });
            res.status(400).send(`Table ${item.tableId} is not availabe at that time`);
            throw new Error(`Table ${item.tableId} is not availabe at that time`)
        }

        setHours(hours)
    })
})

router.get('/table', auth, async (req, res) => {
    const table = req.body;
    const tableOrders = await client.tableOrder.findMany({
        where: {
            AND: [
                {
                    tableId: table.tableId
                },
                {
                    month: table.month
                },
                {
                    day: table.day
                }
            ]
        }
    });

    getFreeHoursOfTable(tableOrders, hours)
    const availabeHours = setTime(hours)
    res.send({Availabe_Hours:availabeHours})
    setHours(hours)
})

module.exports = router;





















