/*
  Warnings:

  - You are about to drop the column `phonemeOne` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `phonemeTwo` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "phonemeOne",
DROP COLUMN "phonemeTwo",
ADD COLUMN     "phonemes" INTEGER[];
