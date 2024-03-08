/*
  Warnings:

  - You are about to drop the column `mainAddressId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "mainAddressId",
ADD COLUMN     "mainAddress" TEXT;
