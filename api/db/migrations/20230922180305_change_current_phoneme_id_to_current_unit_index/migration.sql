/*
  Warnings:

  - You are about to drop the column `currentPhonemeId` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "currentPhonemeId",
ADD COLUMN     "currentUnitIndex" INTEGER;
