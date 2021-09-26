/*
  Warnings:

  - You are about to drop the column `state` on the `Table` table. All the data in the column will be lost.
  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BookToTable` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `price` to the `Table` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_user_id_fkey";

-- DropForeignKey
ALTER TABLE "_BookToTable" DROP CONSTRAINT "_BookToTable_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToTable" DROP CONSTRAINT "_BookToTable_B_fkey";

-- AlterTable
ALTER TABLE "Table" DROP COLUMN "state",
ADD COLUMN     "price" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "Book";

-- DropTable
DROP TABLE "_BookToTable";

-- CreateTable
CREATE TABLE "UserOrder" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "price" VARCHAR(255) NOT NULL,

    CONSTRAINT "UserOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TableOrder" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,
    "month" VARCHAR(255) NOT NULL,
    "day" INTEGER NOT NULL,
    "hour" INTEGER NOT NULL,
    "minute" INTEGER NOT NULL,

    CONSTRAINT "TableOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TableUserOrder" (
    "userOrderId" INTEGER NOT NULL,
    "tableOrderId" INTEGER NOT NULL,

    CONSTRAINT "TableUserOrder_pkey" PRIMARY KEY ("userOrderId","tableOrderId")
);

-- AddForeignKey
ALTER TABLE "UserOrder" ADD CONSTRAINT "UserOrder_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TableUserOrder" ADD CONSTRAINT "TableUserOrder_userOrderId_fkey" FOREIGN KEY ("userOrderId") REFERENCES "UserOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TableUserOrder" ADD CONSTRAINT "TableUserOrder_tableOrderId_fkey" FOREIGN KEY ("tableOrderId") REFERENCES "TableOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
