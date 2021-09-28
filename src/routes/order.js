const express = require("express");
const { PrismaClient } = require(".prisma/client");
const auth = require("../middleware/auth");
const { mealType, tableType } = require("../utility/types");
const { getFreeHoursOfTable, setHours, setTime } = require("../utility/hours");
const { ifTableIsAvailable } = require("../controllers/order");

const hours = [];
setHours(hours);

const router = express.Router();
const client = new PrismaClient();

router.get("/table", auth, async (req, res) => {
  const table = req.body;
  const tableOrders = await client.tableOrder.findMany({
    where: {
      AND: [
        {
          tableId: table.tableId,
        },
        {
          month: table.month,
        },
        {
          day: table.day,
        },
      ],
    },
  });

  getFreeHoursOfTable(tableOrders, hours);
  const availabeHours = setTime(hours);
  res.send({ Availabe_Hours: availabeHours });
  setHours(hours);
});

router.get("/tables", auth, async (req, res) => {
  const tables = await client.table.findMany();
  res.status(200).send(tables);
});

router.post("/order", auth, async (req, res, next) => {
  const orders = req.body;
  const tables = req.body.tables;

  try {
    await ifTableIsAvailable(orders.tables);

    const order = await client.userOrder.create({
      data: {
        user_id: res.locals.user.id,
        price: 0,
      },
    });

    let orderPrice = 0;
    for (let i = 0; i < tables.length; i++) {
      const meals = orders.tables[i].meals;
      Object.assign(tableType.tableOrder.create, tables[i]);
      const searchTable = await client.table.findUnique({
        where: {
          id: tableType.tableOrder.create.tableId,
        },
      });
      tableType.tableOrder.create.price = +searchTable.price;
      delete tableType.tableOrder.create.meals;
      orderPrice += tableType.tableOrder.create.price;

      await client.userOrder.update({
        where: {
          id: order.id,
        },
        data: {
          price: tableType.tableOrder.create.price,
          tableOrders: {
            create: [tableType],
          },
        },
      });

      for (let j = 0; j < meals.length; j++) {
        const bookedMeal = await client.meal.findUnique({
          where: {
            id: meals[j].mealId,
          },
        });
        Object.assign(mealType.mealOrder.create, meals[j], bookedMeal);
        delete mealType.mealOrder.create.id;
        orderPrice += +bookedMeal.price * +mealType.mealOrder.create.count;
        await client.userOrder.update({
          where: {
            id: order.id,
          },
          data: {
            price: orderPrice,
            mealOrders: {
              create: [mealType],
            },
          },
        });
      }
    }
    // console.log(orderPrice);

    res.setHeader("Content-Type", "application/json");
    res.status(200).send(orders.tables);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
