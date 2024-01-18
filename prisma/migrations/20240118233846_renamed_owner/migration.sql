/*
  Warnings:

  - You are about to drop the column `ownerId` on the `TrainSession` table. All the data in the column will be lost.
  - Added the required column `userId` to the `TrainSession` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TrainSession" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "TrainSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TrainSession" ("category", "date", "id") SELECT "category", "date", "id" FROM "TrainSession";
DROP TABLE "TrainSession";
ALTER TABLE "new_TrainSession" RENAME TO "TrainSession";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
