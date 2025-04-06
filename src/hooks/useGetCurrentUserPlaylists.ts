import { useQuery } from "@tanstack/react-query";
import { getCurrentUserPlaylists } from "../apis/playlistApi";
import { getCurrentUserPlaylistRequest } from "../models/playlist";

const useGetCurrentUserPlaylists = ({ limit, offset }: getCurrentUserPlaylistRequest) => {
  const accessToken = localStorage.getItem("access_token");
  return useQuery({
    queryKey: ["current-user-playlists"],
    queryFn: () => {
      return getCurrentUserPlaylists({ limit, offset });
    },
    enabled: !!accessToken,
  });
};

export default useGetCurrentUserPlaylists;
