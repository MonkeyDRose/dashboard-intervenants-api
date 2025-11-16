-- CreateTable
CREATE TABLE "Intervenant" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "promo" INTEGER NOT NULL,

    CONSTRAINT "Intervenant_pkey" PRIMARY KEY ("id")
);
