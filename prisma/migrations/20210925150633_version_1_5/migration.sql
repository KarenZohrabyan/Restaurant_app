/*
  Warnings:

  - You are about to drop the column `state` on the `Book` table. All the data in the column will be lost.
  - Added the required column `table_id` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "state",
ADD COLUMN     "table_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Table" (
    "id" SERIAL NOT NULL,
    "state" BOOLEAN NOT NULL,
    "bookings" TEXT[],

    CONSTRAINT "Table_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "Table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
