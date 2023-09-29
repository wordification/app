
-- AlterTable
ALTER TABLE "Game" RENAME COLUMN "wordsPerPhoneme" TO "wordsPerUnit";
ALTER TABLE "Game" ADD COLUMN     "graphemes" TEXT[];

-- AlterTable
ALTER TABLE "GameSetup" RENAME COLUMN "wordsPerPhoneme" TO "wordsPerUnit";
ALTER TABLE "GameSetup" ADD COLUMN     "graphemes" TEXT[];
