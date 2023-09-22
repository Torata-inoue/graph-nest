/*
  Warnings:

  - Added the required column `roomId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Task_dueTime_idx` ON `Task`;

-- AlterTable
ALTER TABLE `Task` ADD COLUMN `roomId` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `Task_date_idx` ON `Task`(`date`);

-- CreateIndex
CREATE INDEX `Task_isEveryday_idx` ON `Task`(`isEveryday`);

-- CreateIndex
CREATE INDEX `Task_dayOfWeek_idx` ON `Task`(`dayOfWeek`);
