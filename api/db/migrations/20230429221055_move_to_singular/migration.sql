/*
  Warnings:

  - You are about to drop the `Games` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SortingGameWords` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Words` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Games" DROP CONSTRAINT "Games_userId_fkey";

-- DropForeignKey
ALTER TABLE "SortingGameWords" DROP CONSTRAINT "SortingGameWords_gameId_fkey";

-- DropForeignKey
ALTER TABLE "SortingGameWords" DROP CONSTRAINT "SortingGameWords_wordId_fkey";

-- DropTable
DROP TABLE "Games";

-- DropTable
DROP TABLE "SortingGameWords";

-- DropTable
DROP TABLE "Users";

-- DropTable
DROP TABLE "Words";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiresAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "wordsPerPhoneme" INTEGER NOT NULL,
    "phonemeOne" INTEGER NOT NULL,
    "phonemeTwo" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "gradeLevel" INTEGER NOT NULL,
    "phonemes" INTEGER[],
    "graphemes" TEXT[],
    "syllables" TEXT[],
    "sentences" TEXT[],

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SortingGameWord" (
    "id" SERIAL NOT NULL,
    "wordId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "current" BOOLEAN NOT NULL DEFAULT false,
    "testedGrapheme" TEXT NOT NULL,

    CONSTRAINT "SortingGameWord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Word_word_key" ON "Word"("word");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SortingGameWord" ADD CONSTRAINT "SortingGameWord_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SortingGameWord" ADD CONSTRAINT "SortingGameWord_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
