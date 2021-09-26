-- CreateTable
CREATE TABLE "TableMealsOrders" (
    "tableOrderId" INTEGER NOT NULL,
    "mealOrderId" INTEGER NOT NULL,

    CONSTRAINT "TableMealsOrders_pkey" PRIMARY KEY ("tableOrderId","mealOrderId")
);

-- AddForeignKey
ALTER TABLE "TableMealsOrders" ADD CONSTRAINT "TableMealsOrders_tableOrderId_fkey" FOREIGN KEY ("tableOrderId") REFERENCES "TableOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TableMealsOrders" ADD CONSTRAINT "TableMealsOrders_mealOrderId_fkey" FOREIGN KEY ("mealOrderId") REFERENCES "MealOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
