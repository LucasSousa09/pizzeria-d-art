/*
  Warnings:

  - You are about to drop the column `adressId` on the `Address` table. All the data in the column will be lost.
  - Added the required column `addressId` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_adressId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "adressId",
ADD COLUMN     "addressId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
