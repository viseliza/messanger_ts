/*
  Warnings:

  - You are about to drop the `_ProfileToRoom` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProfileToRoom" DROP CONSTRAINT "_ProfileToRoom_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProfileToRoom" DROP CONSTRAINT "_ProfileToRoom_B_fkey";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "is_read" BOOLEAN;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "profiles_id" INTEGER[];

-- DropTable
DROP TABLE "_ProfileToRoom";

-- CreateTable
CREATE TABLE "ProfileRooms" (
    "id" SERIAL NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "room_id" INTEGER NOT NULL,

    CONSTRAINT "ProfileRooms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProfileRooms" ADD CONSTRAINT "ProfileRooms_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileRooms" ADD CONSTRAINT "ProfileRooms_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
