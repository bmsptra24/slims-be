/*
  Warnings:

  - You are about to drop the `Cover` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Cover";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publicationYear" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "linkPdf" TEXT,
    "coverId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Book" ("author", "coverId", "createdAt", "description", "id", "linkPdf", "publicationYear", "stock", "title") SELECT "author", "coverId", "createdAt", "description", "id", "linkPdf", "publicationYear", "stock", "title" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE UNIQUE INDEX "Book_coverId_key" ON "Book"("coverId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
