import { useInfiniteQuery } from "@tanstack/react-query";
import { searchItemsByKeyword } from "../apis/searchApi";
import { searchRequestParams } from "../models/search";
import useClientCredentialToken from "./useClientcredentialToken";

const useSearchItemsByKeyword = (params: searchRequestParams) => {
	//토큰 가져오기
	const clientCredentialToken = useClientCredentialToken();
	return useInfiniteQuery({
		queryKey: ["search", params],
		queryFn: ({ pageParam = 0 }) => {
			if (!clientCredentialToken) {
				throw new Error("No token available");
			}
			return searchItemsByKeyword(clientCredentialToken, { ...params, offset: pageParam });
		},
		initialPageParam: 0,
		getNextPageParam: (lastPage) => {
			const nextPageUrl = lastPage.tracks?.next || lastPage.artists?.next || lastPage.albums?.next || lastPage.playlists?.next || lastPage.shows?.next || lastPage.episodes?.next || lastPage.audiobooks?.next;
			if (nextPageUrl) {
				const nextOffset = new URL(nextPageUrl).searchParams.get("offset");
				return nextOffset ? parseInt(nextOffset) : undefined;
			}
			return undefined;
		},
	});
};
export default useSearchItemsByKeyword;
