/*
  Warnings:

  - You are about to drop the column `father_n` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `first_n` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `group_id` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `last_n` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_login]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_group_id_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_user_id_fkey";

-- DropIndex
DROP INDEX "Profile_user_id_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "father_n",
DROP COLUMN "first_n",
DROP COLUMN "group_id",
DROP COLUMN "last_n",
DROP COLUMN "user_id",
ADD COLUMN     "father_name" TEXT,
ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "group_name" TEXT,
ADD COLUMN     "last_name" TEXT,
ADD COLUMN     "user_login" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_login_key" ON "Profile"("user_login");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_login_fkey" FOREIGN KEY ("user_login") REFERENCES "User"("login") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_group_name_fkey" FOREIGN KEY ("group_name") REFERENCES "Group"("name") ON DELETE SET NULL ON UPDATE CASCADE;
