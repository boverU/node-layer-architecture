/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `UserModel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "ToDo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "ToDo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserModel_email_key" ON "UserModel"("email");
