/*
  Warnings:

  - You are about to drop the column `phone` on the `Address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "phone";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" TEXT;
