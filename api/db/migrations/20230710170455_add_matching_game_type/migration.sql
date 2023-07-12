-- CreateEnum
CREATE TYPE "MatchingGameType" AS ENUM ('MEMORY', 'GROUPING');

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "matchingGameType" "MatchingGameType";

-- UpdateTable
UPDATE "Game"  SET "matchingGameType" = 'MEMORY' WHERE "matchingGameType" IS NULL;

-- AlterTable
ALTER TABLE "GameSetup" ADD COLUMN     "matchingGameType" "MatchingGameType";

-- UpdateTable
UPDATE "GameSetup"  SET "matchingGameType" = 'MEMORY' WHERE "matchingGameType" IS NULL;

-- AlterTable
ALTER TABLE "GameSetup"
ALTER COLUMN "matchingGameType" SET NOT NULL,
ALTER COLUMN "matchingGameType" SET DEFAULT 'MEMORY';