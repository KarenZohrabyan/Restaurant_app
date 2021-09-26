/*
  Warnings:

  - You are about to drop the `TableMealsOrders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TableMealsOrders" DROP CONSTRAINT "TableMealsOrders_mealOrderId_fkey";

-- DropForeignKey
ALTER TABLE "TableMealsOrders" DROP CONSTRAINT "TableMealsOrders_tableOrderId_fkey";

-- DropTable
DROP TABLE "TableMealsOrders";
