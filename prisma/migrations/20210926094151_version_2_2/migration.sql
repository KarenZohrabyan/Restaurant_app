/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Meal` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "MealUserOrder" (
    "userOrderId" INTEGER NOT NULL,
    "mealOrderId" INTEGER NOT NULL,

    CONSTRAINT "MealUserOrder_pkey" PRIMARY KEY ("userOrderId","mealOrderId")
);

-- CreateTable
CREATE TABLE "MealOrder" (
    "id" SERIAL NOT NULL,
    "mealId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "MealOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Meal_name_key" ON "Meal"("name");

-- AddForeignKey
ALTER TABLE "MealUserOrder" ADD CONSTRAINT "MealUserOrder_userOrderId_fkey" FOREIGN KEY ("userOrderId") REFERENCES "UserOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealUserOrder" ADD CONSTRAINT "MealUserOrder_mealOrderId_fkey" FOREIGN KEY ("mealOrderId") REFERENCES "MealOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealOrder" ADD CONSTRAINT "MealOrder_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
