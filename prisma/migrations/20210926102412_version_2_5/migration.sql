/*
  Warnings:

  - Added the required column `count` to the `MealOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MealOrder" ADD COLUMN     "count" INTEGER NOT NULL;
