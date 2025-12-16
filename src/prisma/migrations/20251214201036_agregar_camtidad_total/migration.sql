/*
  Warnings:

  - Added the required column `cantidadTotal` to the `ingredientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ingredientes` ADD COLUMN `cantidadTotal` INTEGER NOT NULL;
