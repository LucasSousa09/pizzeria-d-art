/*
  Warnings:

  - You are about to drop the column `addressId` on the `Address` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_addressId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "addressId",
ADD COLUMN     "userEmail" TEXT NOT NULL,
ALTER COLUMN "reference" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
