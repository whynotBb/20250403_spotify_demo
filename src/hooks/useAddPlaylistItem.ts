import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPlaylistItem } from "../apis/playlistApi";
import { addPlaylistItemRequest } from "../models/playlist";

const useAddPlaylistItem = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (params: addPlaylistItemRequest) => {
			return addPlaylistItem(params);
		},
		onSuccess: () => {
			console.log("success");
			const queryKeys = [["current-user-playlists"], ["play-list-detail"], ["playlist-items"]];
			queryKeys.forEach((key) => {
				queryClient.invalidateQueries({ queryKey: key });
			});
		},
	});
};
export default useAddPlaylistItem;
