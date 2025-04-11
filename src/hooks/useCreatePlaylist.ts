import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlaylist } from "../apis/playlistApi";
import useGetCurrentUserProfile from "./useGetCurrentUserProfile";
import { createPlaylistRequest } from "../models/playlist";

const useCreatePlaylist = () => {
	// 플레이 리스트 추가 후 새로고침 1.
	const queryClient = useQueryClient();
	//id 불러오기
	const { data: user } = useGetCurrentUserProfile();
	// post : useMutation
	return useMutation({
		mutationFn: (params: createPlaylistRequest) => {
			if (user && user.id) {
				return createPlaylist(user.id, params);
			}
			return Promise.reject(new Error("user is not defined"));
		},
		onSuccess: () => {
			console.log("success");
			// 플레이 리스트 추가 후 새로고침 2.
			queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] });
		},
	});
};
export default useCreatePlaylist;
