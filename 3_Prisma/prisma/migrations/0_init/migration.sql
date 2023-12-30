-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "comment" TEXT,
    "fk_translations_id" INTEGER,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "translations" (
    "id" SERIAL NOT NULL,
    "key" VARCHAR(100),
    "lang" VARCHAR(100),
    "content" TEXT,

    CONSTRAINT "translations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk_translations_id_fkey" FOREIGN KEY ("fk_translations_id") REFERENCES "translations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

