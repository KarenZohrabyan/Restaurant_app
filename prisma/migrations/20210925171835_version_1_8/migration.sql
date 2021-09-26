/*
  Warnings:

  - Added the required column `tableId` to the `TableOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TableOrder" ADD COLUMN     "tableId" INTEGER NOT NULL,
ALTER COLUMN "day" SET DATA TYPE VARCHAR(255);

-- AddForeignKey
ALTER TABLE "TableOrder" ADD CONSTRAINT "TableOrder_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
