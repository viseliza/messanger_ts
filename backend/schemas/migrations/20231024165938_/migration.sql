/*
  Warnings:

  - You are about to drop the column `student_id` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `father_n` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `first_n` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `group_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `last_n` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('white', 'black');

-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_student_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_group_id_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "student_id";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "father_n",
DROP COLUMN "first_n",
DROP COLUMN "group_id",
DROP COLUMN "last_n",
DROP COLUMN "role";

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "first_n" TEXT,
    "last_n" TEXT,
    "father_n" TEXT,
    "theme" "Theme" NOT NULL DEFAULT 'white',
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "user_id" INTEGER,
    "group_id" INTEGER,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_id_key" ON "Profile"("user_id");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
