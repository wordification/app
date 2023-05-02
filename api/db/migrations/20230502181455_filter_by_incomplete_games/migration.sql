/*
  Warnings:

  - You are about to drop the `_completedGames` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_completedGames" DROP CONSTRAINT "_completedGames_A_fkey";

-- DropForeignKey
ALTER TABLE "_completedGames" DROP CONSTRAINT "_completedGames_B_fkey";

-- DropTable
DROP TABLE "_completedGames";

-- CreateTable
CREATE TABLE "_incompleteGames" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_incompleteGames_AB_unique" ON "_incompleteGames"("A", "B");

-- CreateIndex
CREATE INDEX "_incompleteGames_B_index" ON "_incompleteGames"("B");

-- AddForeignKey
ALTER TABLE "_incompleteGames" ADD CONSTRAINT "_incompleteGames_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_incompleteGames" ADD CONSTRAINT "_incompleteGames_B_fkey" FOREIGN KEY ("B") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;
