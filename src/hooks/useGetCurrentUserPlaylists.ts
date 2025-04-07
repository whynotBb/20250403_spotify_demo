import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getCurrentUserPlaylists } from "../apis/playlistApi";
import { getCurrentUserPlaylistRequest } from "../models/playlist";

const useGetCurrentUserPlaylists = ({ limit, offset }: getCurrentUserPlaylistRequest) => {
	const accessToken = localStorage.getItem("access_token");
	//무한 스크롤 이용을 위해 useQuery > useInfiniteQuery 로 변경
	//initialPageParam: 0, 초기 값 설정
	return useInfiniteQuery({
		queryKey: ["current-user-playlists"],
		queryFn: ({ pageParam = 0 }) => {
			return getCurrentUserPlaylists({ limit, offset: pageParam });
		},
		enabled: !!accessToken,
		initialPageParam: 0,
		getNextPageParam: (lastPage) => {
			if (lastPage.next) {
				const url = new URL(lastPage.next);
				const nextOffset = url.searchParams.get("offset");
				return nextOffset ? parseInt(nextOffset) : undefined;
			}
			return undefined;
		},
	});
};

export default useGetCurrentUserPlaylists;
