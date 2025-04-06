import React from "react";
import EmptyPlaylist from "./EmptyPlaylist";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import Loading from "../../common/components/Loading";
import ErrorMessage from "../../common/components/ErrorMessage";
import { styled } from "@mui/material";
import Playlist from "./Playlist";
const PlaylistContainer = styled("div")(({ theme }) => ({
  overflowY: "auto",
  maxHeight: "calc(100vh - 240px)",
  height: "100%",
  "&::-webkit-scrollbar": {
    display: "none",
    msOverflowStyle: "none", // IE and Edge
    scrollbarWidth: "none", // Firefox
  },
  [theme.breakpoints.down("sm")]: {
    maxHeight: "calc(100vh - 65px - 119px)",
  },
}));
const Library = () => {
  const { data, error, isLoading } = useGetCurrentUserPlaylists({ limit: 10, offset: 0 });
  console.log("playlist", data);
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }
  return (
    <div>
      {!data || data?.total === 0 ? (
        <EmptyPlaylist />
      ) : (
        <PlaylistContainer>
          <Playlist playlists={data.items} />
        </PlaylistContainer>
      )}
    </div>
  );
};

export default Library;
