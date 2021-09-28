const { PrismaClient } = require(".prisma/client");
const { getFreeHoursOfTable, setHours, setTime } = require("../utility/hours");
const { ApiError } = require("../utility/error");

const client = new PrismaClient();
const hours = [];

const findTableOrders = async (item) => {
  const tableOrders = await client.tableOrder.findMany({
    where: {
      AND: [
        {
          tableId: item.tableId,
        },
        {
          month: item.month,
        },
        {
          day: item.day,
        },
      ],
    },
  });
  return tableOrders;
};

const ifTableIsAvailable = (tables) => {
  return new Promise(async (resolve, reject) => {
    setHours(hours);
    for(let i = 0; i < tables.length; i++) {
      const tableOrders = await findTableOrders(tables[i]);
      getFreeHoursOfTable(tableOrders, hours);
      if (+tables[i].from === +tables[i].to) {
        if (hours[+tables[i].to - 1] === "-") {
          let Err = new Error(
            `Table ${tables[i].tableId} is not availabe at that time ${tables[i].from} - ${tables[i].to}`
          );
          Err.status = 400;
          throw Err;
        }
      } else {
        for (let j = +tables[i].from; j < +tables[i].to; j++) {
          if (hours[j] === "-") {
            let Err = new Error(
              `Table ${tables[i].tableId} is not availabe at that!!!! time ${tables[i].from} - ${tables[i].to}`
            );
            Err.status = 400;
            reject(Err);
            // throw Err;
          }
        }
      }
      setHours(hours);
    }
    resolve(true);
  });
};



module.exports = {
  findTableOrders,
  ifTableIsAvailable,
};
