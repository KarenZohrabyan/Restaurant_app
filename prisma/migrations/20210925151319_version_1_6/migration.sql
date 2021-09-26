/*
  Warnings:

  - You are about to drop the column `table_id` on the `Book` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_table_id_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "table_id";

-- CreateTable
CREATE TABLE "_BookToTable" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookToTable_AB_unique" ON "_BookToTable"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToTable_B_index" ON "_BookToTable"("B");

-- AddForeignKey
ALTER TABLE "_BookToTable" ADD FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToTable" ADD FOREIGN KEY ("B") REFERENCES "Table"("id") ON DELETE CASCADE ON UPDATE CASCADE;
