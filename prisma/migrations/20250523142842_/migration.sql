/*
  Warnings:

  - Added the required column `done` to the `Assignment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assignment" ADD COLUMN     "done" BOOLEAN NOT NULL;
