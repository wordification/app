/*
  Warnings:

  - Added the required column `matchingGameType` to the `GameSetup` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MatchingGameType" AS ENUM ('MEMORY', 'GROUPING');

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "matchingGameType" "MatchingGameType";

-- AlterTable
ALTER TABLE "GameSetup" ADD COLUMN     "matchingGameType" "MatchingGameType" NOT NULL;
