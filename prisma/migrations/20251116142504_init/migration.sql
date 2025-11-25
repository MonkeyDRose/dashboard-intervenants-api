-- CreateTable
CREATE TABLE "intervenants" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "promo" INTEGER NOT NULL,

    CONSTRAINT "intervenants_pkey" PRIMARY KEY ("id")
);
