import { getCurrentUserPlaylistRequest, GetCurrentUserPlaylistResponse, GetPlaylistRequest, GetPlaylistResponse } from "../models/playlist";
import api from "../utils/api";

export const getCurrentUserPlaylists = async ({ limit, offset }: getCurrentUserPlaylistRequest): Promise<GetCurrentUserPlaylistResponse> => {
	try {
		const response = await api.get("/me/playlists", { params: { limit, offset } });

		return response.data;
	} catch (error) {
		throw new Error("fail to fetch current user playlists");
	}
};

export const getPlaylist = async (params: GetPlaylistRequest): Promise<GetPlaylistResponse> => {
	try {
		const response = await api.get(`/playlists/${params.playlist_id}`, {
			params,
		});
		return response.data;
	} catch (error) {
		throw new Error("fail to fetch playlist detail");
	}
};
