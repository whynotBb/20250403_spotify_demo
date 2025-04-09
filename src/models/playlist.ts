import { ApiResponse } from "./apiResponse";
import { ExternalUrls, Followers, Image, Owner } from "./commonType";
import { Episode, Track } from "./track";

export interface getCurrentUserPlaylistRequest {
	limit?: number;
	offset?: number;
}

export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylistObject>;

export interface BasePlaylist {
	collaborative?: boolean;
	description?: string | null;
	external_urls?: ExternalUrls;
	href?: string;
	id?: string;
	images?: Image[];
	name?: string;
	owner?: Owner;
	public?: false;
	snapshot_id?: string;
	type?: "playlist";
	uri?: string;
}
export interface SimplifiedPlaylistObject extends BasePlaylist {
	tracks?: {
		href: string;
		total: number;
	};
}

export interface IPlaylist {}

export interface GetPlaylistRequest {
	playlist_id: string;
	market?: string;
	fields?: string;
	additional_types?: string;
}
export interface GetPlaylistItemsRequest extends GetPlaylistRequest {
	limit: number;
	offset: number;
}
export interface GetPlaylistResponse extends BasePlaylist {
	followers: Followers;
	tracks: ApiResponse<PlaylistTrack>;
}
export interface PlaylistTrack {
	added_at?: string;
	added_by?: {
		external_urls?: ExternalUrls;
		followers?: Followers;
		href?: string;
		id?: string;
		type?: string;
		uri?: string;
	};
	is_local: boolean;
	track: Track | Episode;
}

export type GetPlaylistItemsResponse = ApiResponse<PlaylistTrack>;
