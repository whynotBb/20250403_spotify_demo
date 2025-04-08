import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { ExternalUrls, Followers, Image, Owner, Restriction } from "./commonType";

export interface getCurrentUserPlaylistRequest {
	limit?: number;
	offset?: number;
}

export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylistObject>;

export interface SimplifiedPlaylistObject {
	collaborative?: boolean;
	description?: string;
	external_urls?: ExternalUrls;
	href?: string;
	id?: string;
	images?: Image[];
	name?: string;
	owner?: Owner;
	public?: false;
	snapshot_id?: string;
	tracks?: {
		href: string;
		total: number;
	};
	type?: string;
	uri?: string;
}

export interface IPlaylist {}

export interface GetPlaylistRequest {
	playlist_id: string;
	market?: string;
	fields?: string;
	additional_types?: string;
}
export interface GetPlaylistResponse {
	collaborative?: boolean;
	description?: string | null;
	external_urls: ExternalUrls;
	href?: string;
	id?: string;
	images?: Image[];
	name?: string;
	owner?: Owner;
	public?: boolean;
	snapshot_id?: string;
	tracks: {
		href: string;
		limit: number;
		next: string;
		offset: number;
		previous: string;
		total: number;
		items: {
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
			track: {
				album: {
					album_type: string;
					total_tracks: number;
					available_markets: ["CA", "BR", "IT"];
					external_urls: ExternalUrls;
					href: string;
					id: string;
					images: Image[];
					name: string;
					release_date: string;
					release_date_precision: string;
					restrictions: Restriction;
					type: string;
					uri: string;
					artists: Artist[];
				};
				artists: Artist[];
				available_markets: string[];
				disc_number: number;
				duration_ms: number;
				explicit: false;
				external_ids: {
					isrc: string;
					ean: string;
					upc: string;
				};
				external_urls: ExternalUrls;
				href: string;
				id: string;
				is_playable: false;
				linked_from: {};
				restrictions: Restriction;
				name: string;
				popularity: number;
				preview_url: string;
				track_number: number;
				type: string;
				uri: string;
				is_local: false;
			};
		}[];
	};
	type: string;
	uri: string;
}
