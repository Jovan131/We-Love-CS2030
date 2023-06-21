/*
  Warnings:

  - The required column `id` was added to the `igs` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "igs" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "igs_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "_IGToResident" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_IGToResident_AB_unique" ON "_IGToResident"("A", "B");

-- CreateIndex
CREATE INDEX "_IGToResident_B_index" ON "_IGToResident"("B");

-- AddForeignKey
ALTER TABLE "_IGToResident" ADD CONSTRAINT "_IGToResident_A_fkey" FOREIGN KEY ("A") REFERENCES "igs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IGToResident" ADD CONSTRAINT "_IGToResident_B_fkey" FOREIGN KEY ("B") REFERENCES "residents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
