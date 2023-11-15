/*
  Warnings:

  - You are about to drop the `ProfileRooms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProfileRooms" DROP CONSTRAINT "ProfileRooms_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "ProfileRooms" DROP CONSTRAINT "ProfileRooms_room_id_fkey";

-- DropTable
DROP TABLE "ProfileRooms";

-- CreateTable
CREATE TABLE "_ProdfileRoom" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProdfileRoom_AB_unique" ON "_ProdfileRoom"("A", "B");

-- CreateIndex
CREATE INDEX "_ProdfileRoom_B_index" ON "_ProdfileRoom"("B");

-- AddForeignKey
ALTER TABLE "_ProdfileRoom" ADD CONSTRAINT "_ProdfileRoom_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProdfileRoom" ADD CONSTRAINT "_ProdfileRoom_B_fkey" FOREIGN KEY ("B") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
