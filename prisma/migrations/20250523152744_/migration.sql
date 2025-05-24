/*
  Warnings:

  - You are about to drop the `_FileToLecture` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lectureId` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_FileToLecture" DROP CONSTRAINT "_FileToLecture_A_fkey";

-- DropForeignKey
ALTER TABLE "_FileToLecture" DROP CONSTRAINT "_FileToLecture_B_fkey";

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "lectureId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_FileToLecture";

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_lectureId_fkey" FOREIGN KEY ("lectureId") REFERENCES "Lecture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
