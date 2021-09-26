/*
  Warnings:

  - You are about to drop the column `hour` on the `TableOrder` table. All the data in the column will be lost.
  - You are about to drop the column `minute` on the `TableOrder` table. All the data in the column will be lost.
  - Added the required column `from` to the `TableOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `TableOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TableOrder" DROP COLUMN "hour",
DROP COLUMN "minute",
ADD COLUMN     "from" VARCHAR(255) NOT NULL,
ADD COLUMN     "to" VARCHAR(255) NOT NULL;
