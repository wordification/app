/*
  Warnings:

  - You are about to drop the column `wordsPerUnit` on the `GameSetup` table. All the data in the column will be lost.
  - Added the required column `wordsPerUnitBuilding` to the `GameSetup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wordsPerUnitSorting` to the `GameSetup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameSetup" DROP COLUMN "wordsPerUnit",
ADD COLUMN     "wordsPerUnitBuilding" INTEGER NOT NULL,
ADD COLUMN     "wordsPerUnitSorting" INTEGER NOT NULL;
