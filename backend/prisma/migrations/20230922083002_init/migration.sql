/*
  Warnings:

  - You are about to alter the column `dueTime` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `VarChar(10)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Task` MODIFY `dueTime` INTEGER NOT NULL;
