/*
  Warnings:

  - You are about to drop the column `novsu_login` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `novsu_pass` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[login]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `login` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_novsu_login_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "novsu_login",
DROP COLUMN "novsu_pass",
ADD COLUMN     "login" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");
