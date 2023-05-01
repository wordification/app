/*
  Warnings:

  - You are about to drop the `_completeGames` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_completeGames" DROP CONSTRAINT "_completeGames_A_fkey";

-- DropForeignKey
ALTER TABLE "_completeGames" DROP CONSTRAINT "_completeGames_B_fkey";

-- DropTable
DROP TABLE "_completeGames";

-- CreateTable
CREATE TABLE "_completedGames" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_completedGames_AB_unique" ON "_completedGames"("A", "B");

-- CreateIndex
CREATE INDEX "_completedGames_B_index" ON "_completedGames"("B");

-- AddForeignKey
ALTER TABLE "_completedGames" ADD CONSTRAINT "_completedGames_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_completedGames" ADD CONSTRAINT "_completedGames_B_fkey" FOREIGN KEY ("B") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;
