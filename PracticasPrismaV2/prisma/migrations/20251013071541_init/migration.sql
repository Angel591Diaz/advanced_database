-- CreateTable
CREATE TABLE `Users` (
    `userID` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `dateCreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateUpdated` DATETIME(3) NOT NULL,
    `userStatusID` INTEGER NOT NULL,

    UNIQUE INDEX `Users_username_key`(`username`),
    PRIMARY KEY (`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserDetails` (
    `userID` INTEGER NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `dateOfBirth` DATETIME(3) NULL,

    PRIMARY KEY (`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserStatuses` (
    `userStatusID` INTEGER NOT NULL AUTO_INCREMENT,
    `statusName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserStatuses_statusName_key`(`statusName`),
    PRIMARY KEY (`userStatusID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roles` (
    `roleID` INTEGER NOT NULL AUTO_INCREMENT,
    `roleName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Roles_roleName_key`(`roleName`),
    PRIMARY KEY (`roleID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRoles` (
    `userID` INTEGER NOT NULL,
    `roleID` INTEGER NOT NULL,

    PRIMARY KEY (`userID`, `roleID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permissions` (
    `permissionID` INTEGER NOT NULL AUTO_INCREMENT,
    `permissionName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Permissions_permissionName_key`(`permissionName`),
    PRIMARY KEY (`permissionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RolePermissions` (
    `roleID` INTEGER NOT NULL,
    `permissionID` INTEGER NOT NULL,

    PRIMARY KEY (`roleID`, `permissionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Addresses` (
    `addressID` INTEGER NOT NULL AUTO_INCREMENT,
    `street` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `zipCode` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`addressID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserAddresses` (
    `addressType` VARCHAR(191) NOT NULL,
    `userID` INTEGER NOT NULL,
    `addressID` INTEGER NOT NULL,

    PRIMARY KEY (`userID`, `addressID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactInfo` (
    `contactID` INTEGER NOT NULL AUTO_INCREMENT,
    `contactType` VARCHAR(191) NOT NULL,
    `contactValue` VARCHAR(191) NOT NULL,
    `userID` INTEGER NOT NULL,

    PRIMARY KEY (`contactID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Books` (
    `bookID` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `isbn` VARCHAR(191) NOT NULL,
    `publicationYear` INTEGER NOT NULL,
    `dateCreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateUpdated` DATETIME(3) NOT NULL,
    `publisherID` INTEGER NOT NULL,
    `languageID` INTEGER NOT NULL,

    UNIQUE INDEX `Books_isbn_key`(`isbn`),
    PRIMARY KEY (`bookID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookCopies` (
    `copyID` INTEGER NOT NULL AUTO_INCREMENT,
    `acquisitionDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `bookID` INTEGER NOT NULL,
    `copyStatusID` INTEGER NOT NULL,

    PRIMARY KEY (`copyID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CopyStatuses` (
    `copyStatusID` INTEGER NOT NULL AUTO_INCREMENT,
    `statusName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CopyStatuses_statusName_key`(`statusName`),
    PRIMARY KEY (`copyStatusID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Authors` (
    `authorID` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `birthDate` DATETIME(3) NULL,

    PRIMARY KEY (`authorID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookAuthors` (
    `bookID` INTEGER NOT NULL,
    `authorID` INTEGER NOT NULL,

    PRIMARY KEY (`bookID`, `authorID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Publishers` (
    `publisherID` INTEGER NOT NULL AUTO_INCREMENT,
    `publisherName` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Publishers_publisherName_key`(`publisherName`),
    PRIMARY KEY (`publisherID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categories` (
    `categoryID` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Categories_categoryName_key`(`categoryName`),
    PRIMARY KEY (`categoryID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookCategories` (
    `bookID` INTEGER NOT NULL,
    `categoryID` INTEGER NOT NULL,

    PRIMARY KEY (`bookID`, `categoryID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Languages` (
    `languageID` INTEGER NOT NULL AUTO_INCREMENT,
    `languageName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Languages_languageName_key`(`languageName`),
    PRIMARY KEY (`languageID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Formats` (
    `formatID` INTEGER NOT NULL AUTO_INCREMENT,
    `formatName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Formats_formatName_key`(`formatName`),
    PRIMARY KEY (`formatID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookFormats` (
    `bookID` INTEGER NOT NULL,
    `formatID` INTEGER NOT NULL,

    PRIMARY KEY (`bookID`, `formatID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Loans` (
    `loanID` INTEGER NOT NULL AUTO_INCREMENT,
    `loanDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dueDate` DATETIME(3) NOT NULL,
    `returnDate` DATETIME(3) NULL,
    `copyID` INTEGER NOT NULL,
    `userID` INTEGER NOT NULL,
    `loanStatusID` INTEGER NOT NULL,

    PRIMARY KEY (`loanID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LoanStatuses` (
    `loanStatusID` INTEGER NOT NULL AUTO_INCREMENT,
    `statusName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `LoanStatuses_statusName_key`(`statusName`),
    PRIMARY KEY (`loanStatusID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fines` (
    `fineID` INTEGER NOT NULL AUTO_INCREMENT,
    `fineAmount` DOUBLE NOT NULL,
    `fineDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `paymentStatus` VARCHAR(191) NOT NULL,
    `loanID` INTEGER NOT NULL,

    PRIMARY KEY (`fineID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservations` (
    `reservationID` INTEGER NOT NULL AUTO_INCREMENT,
    `reservationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL,
    `bookID` INTEGER NOT NULL,
    `userID` INTEGER NOT NULL,

    PRIMARY KEY (`reservationID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Logs` (
    `logID` INTEGER NOT NULL AUTO_INCREMENT,
    `tableName` VARCHAR(191) NOT NULL,
    `recordID` INTEGER NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `details` TEXT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `logTypeID` INTEGER NOT NULL,
    `userID` INTEGER NULL,

    PRIMARY KEY (`logID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LogTypes` (
    `logTypeID` INTEGER NOT NULL AUTO_INCREMENT,
    `typeName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `LogTypes_typeName_key`(`typeName`),
    PRIMARY KEY (`logTypeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_userStatusID_fkey` FOREIGN KEY (`userStatusID`) REFERENCES `UserStatuses`(`userStatusID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserDetails` ADD CONSTRAINT `UserDetails_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `Users`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRoles` ADD CONSTRAINT `UserRoles_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `Users`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRoles` ADD CONSTRAINT `UserRoles_roleID_fkey` FOREIGN KEY (`roleID`) REFERENCES `Roles`(`roleID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolePermissions` ADD CONSTRAINT `RolePermissions_roleID_fkey` FOREIGN KEY (`roleID`) REFERENCES `Roles`(`roleID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolePermissions` ADD CONSTRAINT `RolePermissions_permissionID_fkey` FOREIGN KEY (`permissionID`) REFERENCES `Permissions`(`permissionID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAddresses` ADD CONSTRAINT `UserAddresses_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `Users`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAddresses` ADD CONSTRAINT `UserAddresses_addressID_fkey` FOREIGN KEY (`addressID`) REFERENCES `Addresses`(`addressID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContactInfo` ADD CONSTRAINT `ContactInfo_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `Users`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Books` ADD CONSTRAINT `Books_publisherID_fkey` FOREIGN KEY (`publisherID`) REFERENCES `Publishers`(`publisherID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Books` ADD CONSTRAINT `Books_languageID_fkey` FOREIGN KEY (`languageID`) REFERENCES `Languages`(`languageID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookCopies` ADD CONSTRAINT `BookCopies_bookID_fkey` FOREIGN KEY (`bookID`) REFERENCES `Books`(`bookID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookCopies` ADD CONSTRAINT `BookCopies_copyStatusID_fkey` FOREIGN KEY (`copyStatusID`) REFERENCES `CopyStatuses`(`copyStatusID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookAuthors` ADD CONSTRAINT `BookAuthors_bookID_fkey` FOREIGN KEY (`bookID`) REFERENCES `Books`(`bookID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookAuthors` ADD CONSTRAINT `BookAuthors_authorID_fkey` FOREIGN KEY (`authorID`) REFERENCES `Authors`(`authorID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookCategories` ADD CONSTRAINT `BookCategories_bookID_fkey` FOREIGN KEY (`bookID`) REFERENCES `Books`(`bookID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookCategories` ADD CONSTRAINT `BookCategories_categoryID_fkey` FOREIGN KEY (`categoryID`) REFERENCES `Categories`(`categoryID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookFormats` ADD CONSTRAINT `BookFormats_bookID_fkey` FOREIGN KEY (`bookID`) REFERENCES `Books`(`bookID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookFormats` ADD CONSTRAINT `BookFormats_formatID_fkey` FOREIGN KEY (`formatID`) REFERENCES `Formats`(`formatID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Loans` ADD CONSTRAINT `Loans_copyID_fkey` FOREIGN KEY (`copyID`) REFERENCES `BookCopies`(`copyID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Loans` ADD CONSTRAINT `Loans_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `Users`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Loans` ADD CONSTRAINT `Loans_loanStatusID_fkey` FOREIGN KEY (`loanStatusID`) REFERENCES `LoanStatuses`(`loanStatusID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fines` ADD CONSTRAINT `Fines_loanID_fkey` FOREIGN KEY (`loanID`) REFERENCES `Loans`(`loanID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservations` ADD CONSTRAINT `Reservations_bookID_fkey` FOREIGN KEY (`bookID`) REFERENCES `Books`(`bookID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservations` ADD CONSTRAINT `Reservations_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `Users`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Logs` ADD CONSTRAINT `Logs_logTypeID_fkey` FOREIGN KEY (`logTypeID`) REFERENCES `LogTypes`(`logTypeID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Logs` ADD CONSTRAINT `Logs_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `Users`(`userID`) ON DELETE SET NULL ON UPDATE CASCADE;
