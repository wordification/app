-- CreateTable
CREATE TABLE "Games" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "wordsPerPhoneme" INTEGER NOT NULL,
    "phonemeOne" INTEGER NOT NULL,
    "phonemeTwo" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SortingGameWords" (
    "id" SERIAL NOT NULL,
    "wordId" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "current" BOOLEAN NOT NULL DEFAULT false,
    "testedGrapheme" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "SortingGameWords_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Games" ADD CONSTRAINT "Games_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SortingGameWords" ADD CONSTRAINT "SortingGameWords_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Words"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SortingGameWords" ADD CONSTRAINT "SortingGameWords_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
