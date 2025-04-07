import { ApiResponse } from "./apiResponse";
import { ExternalUrls, Followers, Image, Owner } from "./commonType";

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
