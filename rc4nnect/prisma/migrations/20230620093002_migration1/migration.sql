-- CreateTable
CREATE TABLE "residents" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "residents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "slots" (
    "id" TEXT NOT NULL,
    "capacity" INTEGER,
    "venue" TEXT NOT NULL,
    "start_date_time" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "description" TEXT,
    "ig_name" TEXT NOT NULL,

    CONSTRAINT "slots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "igs" (
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "num_of_sessions_per_week" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ResidentToSlot" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "residents_email_key" ON "residents"("email");

-- CreateIndex
CREATE UNIQUE INDEX "igs_name_key" ON "igs"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ResidentToSlot_AB_unique" ON "_ResidentToSlot"("A", "B");

-- CreateIndex
CREATE INDEX "_ResidentToSlot_B_index" ON "_ResidentToSlot"("B");

-- AddForeignKey
ALTER TABLE "slots" ADD CONSTRAINT "slots_ig_name_fkey" FOREIGN KEY ("ig_name") REFERENCES "igs"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResidentToSlot" ADD CONSTRAINT "_ResidentToSlot_A_fkey" FOREIGN KEY ("A") REFERENCES "residents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResidentToSlot" ADD CONSTRAINT "_ResidentToSlot_B_fkey" FOREIGN KEY ("B") REFERENCES "slots"("id") ON DELETE CASCADE ON UPDATE CASCADE;
