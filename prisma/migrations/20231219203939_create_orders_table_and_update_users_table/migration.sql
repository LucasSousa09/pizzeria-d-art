-- CreateTable
CREATE TABLE "Order" (
    "pizzas" TEXT NOT NULL,
    "firstPizzaImg" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalPrice" INTEGER NOT NULL,
    "orderId" TEXT NOT NULL,
    CONSTRAINT "Order_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderId_key" ON "Order"("orderId");
