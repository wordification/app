/*
  Warnings:

  - Added the required column `type` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GameType" AS ENUM ('SORTING', 'MATCHING');

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "type" "GameType" NOT NULL;
