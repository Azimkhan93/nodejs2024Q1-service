import { IAlbum } from 'src/albums/interfaces/album.interface';
import { IArtist } from 'src/artists/interfaces/artist.interface';
import { IFavoritesResponse } from 'src/favorites/interfaces/favorites.interface';
import { ITrack } from 'src/tracks/interfaces/track.interface';

export const favorites: IFavoritesResponse = {
  artists: [],
  albums: [],
  tracks: [],
};

class FavoriteDb {
  private favorites = favorites;

  getFavorites() {
    return this.favorites;
  }

  addTrackToFavorites(track: ITrack) {
    this.favorites.tracks.push(track);
  }

  getTrackFromFavorites(trackId: string) {
    return this.favorites.tracks.find((track) => track.id === trackId);
  }

  deleteTrackFromFavorites(trackId: string) {
    this.favorites.tracks = this.favorites.tracks.filter(
      (track) => track.id !== trackId,
    );
  }

  addAlbumToFavorites(album: IAlbum) {
    this.favorites.albums.push(album);
  }

  getAlbumFromFavorites(albumId: string) {
    return this.favorites.albums.find((album) => album.id === albumId);
  }

  deleteAlbumFromFavorites(albumId: string) {
    this.favorites.albums = this.favorites.albums.filter(
      (album) => album.id !== albumId,
    );
  }
  addArtistToFavorites(artist: IArtist) {
    this.favorites.artists.push(artist);
  }

  getArtistFromFavorites(artistId: string) {
    return this.favorites.artists.find((artist) => artist.id === artistId);
  }

  deleteArtistFromFavorites(artistId: string) {
    this.favorites.artists = this.favorites.artists.filter(
      (artist) => artist.id !== artistId,
    );
  }
}

export const favoriteDb = new FavoriteDb();
