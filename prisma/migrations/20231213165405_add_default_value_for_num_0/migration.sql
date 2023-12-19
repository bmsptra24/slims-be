-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nim" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "nohp" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "numBorrowedBooks" INTEGER DEFAULT 0,
    "numReturnedBooks" INTEGER DEFAULT 0,
    "rank" INTEGER DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("alamat", "createdAt", "email", "id", "name", "nim", "nohp", "numBorrowedBooks", "numReturnedBooks", "password", "rank") SELECT "alamat", "createdAt", "email", "id", "name", "nim", "nohp", "numBorrowedBooks", "numReturnedBooks", "password", "rank" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_nim_key" ON "User"("nim");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
