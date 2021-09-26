-- CreateTable
CREATE TABLE "Meal" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);
