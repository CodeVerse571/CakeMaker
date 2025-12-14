-- CreateTable
CREATE TABLE `Queques` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuequeIngrediente` (
    `quequeId` INTEGER NOT NULL,
    `ingredienteId` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`quequeId`, `ingredienteId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ingredientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `costoUnitario` DECIMAL(65, 30) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reporte` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `quequeid` INTEGER NOT NULL,
    `costoTotal` DECIMAL(65, 30) NOT NULL,

    UNIQUE INDEX `Reporte_quequeid_key`(`quequeid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `QuequeIngrediente` ADD CONSTRAINT `QuequeIngrediente_quequeId_fkey` FOREIGN KEY (`quequeId`) REFERENCES `Queques`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuequeIngrediente` ADD CONSTRAINT `QuequeIngrediente_ingredienteId_fkey` FOREIGN KEY (`ingredienteId`) REFERENCES `Ingredientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reporte` ADD CONSTRAINT `Reporte_quequeid_fkey` FOREIGN KEY (`quequeid`) REFERENCES `Queques`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
