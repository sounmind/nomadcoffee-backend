-- CreateTable
CREATE TABLE "_FollowReleation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FollowReleation_AB_unique" ON "_FollowReleation"("A", "B");

-- CreateIndex
CREATE INDEX "_FollowReleation_B_index" ON "_FollowReleation"("B");

-- AddForeignKey
ALTER TABLE "_FollowReleation" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FollowReleation" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
