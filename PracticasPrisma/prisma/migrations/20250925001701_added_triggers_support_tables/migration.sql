-- AlterTable
ALTER TABLE `users` ADD COLUMN `i_Issues_Count` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `issues_logs` (
    `iCod_Log` INTEGER NOT NULL AUTO_INCREMENT,
    `fkiCod_Issue` INTEGER NOT NULL,
    `s_Action` VARCHAR(191) NOT NULL,
    `s_Field` VARCHAR(191) NULL,
    `s_Old_Value` VARCHAR(191) NULL,
    `s_New_Value` VARCHAR(191) NULL,
    `dt_Log_Date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`iCod_Log`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `issues_backup` (
    `iCod_Issues` INTEGER NOT NULL AUTO_INCREMENT,
    `s_Issue_Description` VARCHAR(191) NOT NULL,
    `dt_Date_Time` DATETIME(3) NOT NULL,
    `e_State_Review` VARCHAR(191) NOT NULL,
    `fkiCod_Type_Issues` INTEGER NOT NULL,
    `fkiCod_Classroom` INTEGER NOT NULL,
    `fkiCod_Severity` INTEGER NOT NULL,
    `fkiCod_User_Register` INTEGER NOT NULL,
    `fkiCod_User_Reviewer` INTEGER NOT NULL,
    `dt_Created_Issues` DATETIME(3) NOT NULL,
    `dt_Updated_Issues` DATETIME(3) NOT NULL,
    `b_State_Issues` BOOLEAN NOT NULL,
    `dt_Deleted_Date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`iCod_Issues`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `issues_description_history` (
    `iCod_History` INTEGER NOT NULL AUTO_INCREMENT,
    `fkiCod_Issue` INTEGER NOT NULL,
    `s_Old_Description` VARCHAR(191) NOT NULL,
    `dt_Changed_At` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`iCod_History`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `issues_description_history` ADD CONSTRAINT `issues_description_history_fkiCod_Issue_fkey` FOREIGN KEY (`fkiCod_Issue`) REFERENCES `issues`(`iCod_Issues`) ON DELETE RESTRICT ON UPDATE CASCADE;
