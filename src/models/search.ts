import { SimplifiedAlbum } from "./album";
import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { SimplifiedPlaylistObject } from "./playlist";
import { Show, SimplifiedAudioBook, SimplifiedEpisode, Track } from "./track";

export const enum SEARCH_TYPE {
	Track = "track",
	Album = "album",
	Artist = "artist",
	Playlist = "playlist",
	Show = "show",
	Episode = "episode",
	Audiobook = "audiobook",
}

export interface searchRequestParams {
	q: string;
	type: SEARCH_TYPE[];
	market?: string;
	limit?: number;
	offset?: number;
	include_external?: string;
}

export interface searchResponse {
	artists?: ApiResponse<Artist>;
	albums?: ApiResponse<SimplifiedAlbum>;
	tracks?: ApiResponse<Track>;
	playlists?: ApiResponse<SimplifiedPlaylistObject>;
	shows?: ApiResponse<Show>;
	episodes?: ApiResponse<SimplifiedEpisode>;
	audiobooks?: ApiResponse<SimplifiedAudioBook>;
}
