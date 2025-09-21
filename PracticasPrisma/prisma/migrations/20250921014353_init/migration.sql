-- CreateTable
CREATE TABLE `assigned_subject` (
    `iCod_Assigned_Subject` INTEGER NOT NULL AUTO_INCREMENT,
    `i_TotalHours` INTEGER NOT NULL,
    `fkiCod_Subject` INTEGER NOT NULL,
    `fkiCod_User` INTEGER NOT NULL,
    `dt_Created_Assigned_Subject` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dt_Updated_Assigned_Subject` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `b_State_Assigned_Subject` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`iCod_Assigned_Subject`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `career` (
    `iCod_Career` INTEGER NOT NULL AUTO_INCREMENT,
    `s_Name_Career` VARCHAR(191) NOT NULL,
    `fkiCod_Faculty` INTEGER NOT NULL,
    `fkiCod_User` INTEGER NOT NULL,
    `dt_Created_Career` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dt_Updated_Career` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `b_State_Career` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`iCod_Career`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classroom` (
    `iCod_Classroom` INTEGER NOT NULL AUTO_INCREMENT,
    `s_Name_Classroom` VARCHAR(191) NOT NULL,
    `fkiCod_Grades` INTEGER NOT NULL,
    `fkiCod_Groups` INTEGER NOT NULL,
    `dt_Created_Classroom` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dt_Updated_Classroom` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `b_State_Classroom` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`iCod_Classroom`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cycle` (
    `iCod_Cycle` INTEGER NOT NULL AUTO_INCREMENT,
    `s_Name_Cycle` VARCHAR(191) NOT NULL,
    `dt_Created_Cycles` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dt_Updated_Cycles` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `b_State_Cycles` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`iCod_Cycle`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grades` (
    `iCod_Grades` INTEGER NOT NULL AUTO_INCREMENT,
    `s_Name_Grades` VARCHAR(191) NOT NULL,
    `dt_Created_Grades` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dt_Updated_Grades` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `b_State_Grades` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`iCod_Grades`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `groups` (
    `iCod_Groups` INTEGER NOT NULL AUTO_INCREMENT,
    `s_Name_Groups` VARCHAR(191) NOT NULL,
    `dt_Created_Groups` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dt_Updated_Groups` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `b_State_Groups` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`iCod_Groups`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `issues` (
    `iCod_Issues` INTEGER NOT NULL AUTO_INCREMENT,
    `s_Issue_Description` VARCHAR(191) NOT NULL,
    `dt_Date_Time` DATETIME(3) NOT NULL,
    `e_State_Review` ENUM('Open', 'InProgress', 'Complete') NOT NULL DEFAULT 'Open',
    `fkiCod_Type_Issues` INTEGER NOT NULL,
    `fkiCod_Classroom` INTEGER NOT NULL,
    `fkiCod_Severity` INTEGER NOT NULL,
    `fkiCod_User_Register` INTEGER NOT NULL,
    `fkiCod_User_Reviewer` INTEGER NOT NULL,
    `dt_Created_Issues` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dt_Updated_Issues` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `b_State_Issues` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`iCod_Issues`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schedule` (
    `iCod_Schedule` INTEGER NOT NULL AUTO_INCREMENT,
    `i_Total_Hours` INTEGER NOT NULL,
    `t_Star_Hours` DATETIME(3) NOT NULL,
    `t_End_Hours` DATETIME(3) NOT NULL,
    `fkiCod_Cycle` INTEGER NOT NULL,
    `fkiCod_Assigned_Subject` INTEGER NOT NULL,
    `dt_Created_Schedule` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dt_Updated_Schedule` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `b_State_Schedule` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`iCod_Schedule`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faculty` (
    `iCod_Faculty` INTEGER NOT NULL AUTO_INCREMENT,
    `s_Name_Faculty` VARCHAR(191) NOT NULL,
    `dt_Created_Faculty` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dt_Updated_Faculty` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `b_State_Faculty` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`iCod_Faculty`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `severity` (
    `iCod_Severity` INTEGER NOT NULL AUTO_INCREMENT,
    `s_Name_Severity` VARCHAR(191) NOT NULL,
    `dt_Created_Severity` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dt_Updated_Severity` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `b_State_Severity` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`iCod_Severity`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subject` (
    `iCod_Subject` INTEGER NOT NULL AUTO_INCREMENT,
    `s_Name_Subject` VARCHAR(191) NOT NULL,
    `dt_Created_Subject` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dt_Updated_Subject` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `b_State_Subject` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`iCod_Subject`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type_classroom` (
    `iCod_Type_Classroom` INTEGER NOT NULL AUTO_INCREMENT,
    `s_Name_Type_Classroom` VARCHAR(191) NOT NULL,
    `dt_Created_Type_Classroom` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dt_Updated_Type_Classroom` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `b_State_Type_Classroom` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`iCod_Type_Classroom`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type_issues` (
    `iCod_Type_Issue` INTEGER NOT NULL AUTO_INCREMENT,
    `s_Name_Type_Issue` VARCHAR(191) NOT NULL,
    `s_Description_Type_Issue` VARCHAR(191) NOT NULL,
    `dt_Created_Type_Issue` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dt_Updated_Type_Issue` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `b_State_Type_Issue` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`iCod_Type_Issue`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type_users` (
    `iCod_Type_User` INTEGER NOT NULL AUTO_INCREMENT,
    `s_Name_Type_User` VARCHAR(191) NOT NULL,
    `dt_Created_Type_User` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dt_Updated_Type_User` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `b_State_Type_User` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `type_users_s_Name_Type_User_key`(`s_Name_Type_User`),
    PRIMARY KEY (`iCod_Type_User`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `iCod_User` INTEGER NOT NULL AUTO_INCREMENT,
    `s_Full_Name_User` VARCHAR(191) NOT NULL,
    `i_Enrollment_Number` INTEGER NOT NULL DEFAULT 0,
    `s_Password` VARCHAR(191) NOT NULL,
    `s_Gender` VARCHAR(191) NOT NULL,
    `i_Age` INTEGER NOT NULL,
    `s_Institutional_Email` VARCHAR(191) NOT NULL,
    `s_Phone_Number` VARCHAR(191) NOT NULL,
    `fkiCod_TypeUser` INTEGER NOT NULL,
    `dt_Created_User` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dt_Updated_User` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `b_State_User` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`iCod_User`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `causing_users` (
    `fkiCod_Users` INTEGER NOT NULL,
    `fkiCod_Issues` INTEGER NOT NULL,
    `dt_Created_Causing_Users` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `causing_users_fkiCod_Issues_fkiCod_Users_key`(`fkiCod_Issues`, `fkiCod_Users`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_affecters` (
    `fkiCod_Users` INTEGER NOT NULL,
    `fkiCod_Issues` INTEGER NOT NULL,
    `dt_Created_Users_Affecters` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_affecters_fkiCod_Issues_fkiCod_Users_key`(`fkiCod_Issues`, `fkiCod_Users`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `assigned_subject` ADD CONSTRAINT `assigned_subject_fkiCod_Subject_fkey` FOREIGN KEY (`fkiCod_Subject`) REFERENCES `subject`(`iCod_Subject`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assigned_subject` ADD CONSTRAINT `assigned_subject_fkiCod_User_fkey` FOREIGN KEY (`fkiCod_User`) REFERENCES `users`(`iCod_User`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `career` ADD CONSTRAINT `career_fkiCod_Faculty_fkey` FOREIGN KEY (`fkiCod_Faculty`) REFERENCES `faculty`(`iCod_Faculty`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `career` ADD CONSTRAINT `career_fkiCod_User_fkey` FOREIGN KEY (`fkiCod_User`) REFERENCES `users`(`iCod_User`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `classroom` ADD CONSTRAINT `classroom_fkiCod_Grades_fkey` FOREIGN KEY (`fkiCod_Grades`) REFERENCES `grades`(`iCod_Grades`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `classroom` ADD CONSTRAINT `classroom_fkiCod_Groups_fkey` FOREIGN KEY (`fkiCod_Groups`) REFERENCES `groups`(`iCod_Groups`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `issues` ADD CONSTRAINT `issues_fkiCod_Type_Issues_fkey` FOREIGN KEY (`fkiCod_Type_Issues`) REFERENCES `type_issues`(`iCod_Type_Issue`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `issues` ADD CONSTRAINT `issues_fkiCod_Classroom_fkey` FOREIGN KEY (`fkiCod_Classroom`) REFERENCES `classroom`(`iCod_Classroom`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `issues` ADD CONSTRAINT `issues_fkiCod_Severity_fkey` FOREIGN KEY (`fkiCod_Severity`) REFERENCES `severity`(`iCod_Severity`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `issues` ADD CONSTRAINT `issues_fkiCod_User_Register_fkey` FOREIGN KEY (`fkiCod_User_Register`) REFERENCES `users`(`iCod_User`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `issues` ADD CONSTRAINT `issues_fkiCod_User_Reviewer_fkey` FOREIGN KEY (`fkiCod_User_Reviewer`) REFERENCES `users`(`iCod_User`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedule` ADD CONSTRAINT `schedule_fkiCod_Cycle_fkey` FOREIGN KEY (`fkiCod_Cycle`) REFERENCES `cycle`(`iCod_Cycle`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedule` ADD CONSTRAINT `schedule_fkiCod_Assigned_Subject_fkey` FOREIGN KEY (`fkiCod_Assigned_Subject`) REFERENCES `assigned_subject`(`iCod_Assigned_Subject`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_fkiCod_TypeUser_fkey` FOREIGN KEY (`fkiCod_TypeUser`) REFERENCES `type_users`(`iCod_Type_User`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `causing_users` ADD CONSTRAINT `causing_users_fkiCod_Users_fkey` FOREIGN KEY (`fkiCod_Users`) REFERENCES `users`(`iCod_User`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `causing_users` ADD CONSTRAINT `causing_users_fkiCod_Issues_fkey` FOREIGN KEY (`fkiCod_Issues`) REFERENCES `issues`(`iCod_Issues`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_affecters` ADD CONSTRAINT `users_affecters_fkiCod_Users_fkey` FOREIGN KEY (`fkiCod_Users`) REFERENCES `users`(`iCod_User`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_affecters` ADD CONSTRAINT `users_affecters_fkiCod_Issues_fkey` FOREIGN KEY (`fkiCod_Issues`) REFERENCES `issues`(`iCod_Issues`) ON DELETE RESTRICT ON UPDATE CASCADE;
