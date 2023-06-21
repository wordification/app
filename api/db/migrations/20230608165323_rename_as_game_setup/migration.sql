/*
  Warnings:

  - You are about to drop the `GameRulesToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GameRulesToUser" DROP CONSTRAINT "GameRulesToUser_userId_fkey";

-- DropTable
DROP TABLE "GameRulesToUser";

-- CreateTable
CREATE TABLE "GameSetup" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "wordsPerPhoneme" INTEGER NOT NULL,
    "phonemes" INTEGER[],
    "userId" INTEGER NOT NULL,

    CONSTRAINT "GameSetup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameSetup" ADD CONSTRAINT "GameSetup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
