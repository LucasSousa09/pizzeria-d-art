-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userEmail_fkey";

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
