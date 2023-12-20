-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "avatar" TEXT,
    "cpf" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "street" TEXT,
    "district" TEXT,
    "zipCode" TEXT,
    "houseNumber" TEXT,
    "complement" TEXT,
    "city" TEXT,
    "state" TEXT,
    "reference" TEXT
);
INSERT INTO "new_User" ("avatar", "id", "username") SELECT "avatar", "id", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
