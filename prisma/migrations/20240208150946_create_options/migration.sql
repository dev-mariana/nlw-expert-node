-- CreateTable
CREATE TABLE "poll-option" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "poll_id" TEXT NOT NULL,

    CONSTRAINT "poll-option_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "poll-option" ADD CONSTRAINT "poll-option_poll_id_fkey" FOREIGN KEY ("poll_id") REFERENCES "poll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
