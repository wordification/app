-- CreateTable
CREATE TABLE "GameRulesToUser" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "wordsPerPhoneme" INTEGER NOT NULL,
    "phonemes" INTEGER[],
    "userId" INTEGER NOT NULL,

    CONSTRAINT "GameRulesToUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameRulesToUser" ADD CONSTRAINT "GameRulesToUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
