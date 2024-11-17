/*
  Warnings:

  - Changed the type of `dateReceived` on the `Inventory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "dateReceived",
ADD COLUMN     "dateReceived" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Order_Details" ALTER COLUMN "subTotal" SET DATA TYPE DOUBLE PRECISION;
