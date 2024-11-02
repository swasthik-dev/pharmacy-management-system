-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medicine" (
    "medicineId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "stockQty" INTEGER NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Medicine_pkey" PRIMARY KEY ("medicineId")
);

-- CreateTable
CREATE TABLE "Order" (
    "orderId" TEXT NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL,
    "customerId" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "Order_Details" (
    "orderDetailId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "medicineId" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "subTotal" INTEGER NOT NULL,

    CONSTRAINT "Order_Details_pkey" PRIMARY KEY ("orderDetailId")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "inventoryId" TEXT NOT NULL,
    "medicineId" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "qtyReceived" INTEGER NOT NULL,
    "dateReceived" INTEGER NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("inventoryId")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "supplierId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("supplierId")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "doctorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "licenseNumber" TEXT NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("doctorId")
);

-- CreateTable
CREATE TABLE "Customer" (
    "customerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customerId")
);

-- CreateTable
CREATE TABLE "Prescription" (
    "prescriptionId" TEXT NOT NULL,
    "dateIssued" TIMESTAMP(3) NOT NULL,
    "doctorId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "Prescription_pkey" PRIMARY KEY ("prescriptionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_Details" ADD CONSTRAINT "Order_Details_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_Details" ADD CONSTRAINT "Order_Details_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine"("medicineId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine"("medicineId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("supplierId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("doctorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;
