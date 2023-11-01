/*
  Warnings:

  - You are about to drop the column `group_name` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `user_login` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_group_name_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_user_login_fkey";

-- DropIndex
DROP INDEX "Profile_user_login_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "group_name",
DROP COLUMN "user_login",
ADD COLUMN     "group_id" INTEGER,
ADD COLUMN     "user_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_id_key" ON "Profile"("user_id");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
