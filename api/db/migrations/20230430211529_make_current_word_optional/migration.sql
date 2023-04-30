-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_currentWordId_fkey";

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "currentWordId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_currentWordId_fkey" FOREIGN KEY ("currentWordId") REFERENCES "Word"("id") ON DELETE SET NULL ON UPDATE CASCADE;
