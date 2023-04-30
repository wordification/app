/*
  Warnings:

  - Added the required column `numSyllables` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Word" ADD COLUMN     "numSyllables" INTEGER NOT NULL;
