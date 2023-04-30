/*
  Warnings:

  - You are about to drop the `SortingGameWord` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `currentWordId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SortingGameWord" DROP CONSTRAINT "SortingGameWord_gameId_fkey";

-- DropForeignKey
ALTER TABLE "SortingGameWord" DROP CONSTRAINT "SortingGameWord_wordId_fkey";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "currentWordId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "SortingGameWord";

-- CreateTable
CREATE TABLE "_allGames" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_completeGames" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_allGames_AB_unique" ON "_allGames"("A", "B");

-- CreateIndex
CREATE INDEX "_allGames_B_index" ON "_allGames"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_completeGames_AB_unique" ON "_completeGames"("A", "B");

-- CreateIndex
CREATE INDEX "_completeGames_B_index" ON "_completeGames"("B");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_currentWordId_fkey" FOREIGN KEY ("currentWordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_allGames" ADD CONSTRAINT "_allGames_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_allGames" ADD CONSTRAINT "_allGames_B_fkey" FOREIGN KEY ("B") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_completeGames" ADD CONSTRAINT "_completeGames_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_completeGames" ADD CONSTRAINT "_completeGames_B_fkey" FOREIGN KEY ("B") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;
