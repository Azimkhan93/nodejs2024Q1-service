/*
  Warnings:

  - You are about to drop the `_AlbumToFavorites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ArtistToFavorites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FavoritesToTrack` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AlbumToFavorites" DROP CONSTRAINT "_AlbumToFavorites_A_fkey";

-- DropForeignKey
ALTER TABLE "_AlbumToFavorites" DROP CONSTRAINT "_AlbumToFavorites_B_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToFavorites" DROP CONSTRAINT "_ArtistToFavorites_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToFavorites" DROP CONSTRAINT "_ArtistToFavorites_B_fkey";

-- DropForeignKey
ALTER TABLE "_FavoritesToTrack" DROP CONSTRAINT "_FavoritesToTrack_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoritesToTrack" DROP CONSTRAINT "_FavoritesToTrack_B_fkey";

-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "favoritesId" TEXT;

-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "favoritesId" TEXT;

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "favoritesId" TEXT;

-- DropTable
DROP TABLE "_AlbumToFavorites";

-- DropTable
DROP TABLE "_ArtistToFavorites";

-- DropTable
DROP TABLE "_FavoritesToTrack";

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_favoritesId_fkey" FOREIGN KEY ("favoritesId") REFERENCES "Favorites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_favoritesId_fkey" FOREIGN KEY ("favoritesId") REFERENCES "Favorites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_favoritesId_fkey" FOREIGN KEY ("favoritesId") REFERENCES "Favorites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
