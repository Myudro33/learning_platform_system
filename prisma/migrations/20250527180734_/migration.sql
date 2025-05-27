/*
  Warnings:

  - You are about to drop the column `gradet` on the `Submission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "gradet",
ADD COLUMN     "grade" TEXT;
