/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MusicState {
  curSongId: string | null;
  isPlaying: boolean | null;
  atAlbum: boolean | null;
  isLoading: boolean | null;
  songs: [] | null;
  listSearch: [] | null;
}
