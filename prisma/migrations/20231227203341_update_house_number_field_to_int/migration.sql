/*
  Warnings:

  - You are about to alter the column `houseNumber` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatar" TEXT,
    "cpf" TEXT,
    "phone" TEXT,
    "street" TEXT,
    "district" TEXT,
    "zipCode" TEXT,
    "houseNumber" INTEGER,
    "complement" TEXT,
    "city" TEXT,
    "state" TEXT,
    "reference" TEXT
);
INSERT INTO "new_User" ("avatar", "city", "complement", "cpf", "district", "email", "houseNumber", "id", "phone", "reference", "state", "street", "username", "zipCode") SELECT "avatar", "city", "complement", "cpf", "district", "email", "houseNumber", "id", "phone", "reference", "state", "street", "username", "zipCode" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
