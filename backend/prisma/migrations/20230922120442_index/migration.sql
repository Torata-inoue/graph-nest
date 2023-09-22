-- DropIndex
DROP INDEX `Task_date_idx` ON `Task`;

-- DropIndex
DROP INDEX `Task_dayOfWeek_idx` ON `Task`;

-- DropIndex
DROP INDEX `Task_isEveryday_idx` ON `Task`;

-- CreateIndex
CREATE INDEX `Task_dueTime_idx` ON `Task`(`dueTime`);
