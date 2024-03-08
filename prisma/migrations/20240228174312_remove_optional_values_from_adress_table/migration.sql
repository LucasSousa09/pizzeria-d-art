/*
  Warnings:

  - You are about to drop the column `mainAddressId` on the `Address` table. All the data in the column will be lost.
  - Made the column `street` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `district` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `zipCode` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `houseNumber` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `complement` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `reference` on table `Address` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "mainAddressId",
ALTER COLUMN "street" SET NOT NULL,
ALTER COLUMN "district" SET NOT NULL,
ALTER COLUMN "zipCode" SET NOT NULL,
ALTER COLUMN "houseNumber" SET NOT NULL,
ALTER COLUMN "complement" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "state" SET NOT NULL,
ALTER COLUMN "reference" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "mainAddressId" TEXT;
