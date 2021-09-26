/*
  Warnings:

  - Changed the type of `price` on the `Table` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `price` on the `UserOrder` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Table" DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserOrder" DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;
