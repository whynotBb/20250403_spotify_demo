import React from "react";
import { GetCurrentUserPlaylistResponse, SimplifiedPlaylistObject } from "../../models/playlist";
type NewType = Playlist;

interface PlaylistProps {
  playlists: NewType[];
}

const Playlist = ({ playlists }: SimplifiedPlaylistObject) => {
  return <div>Playlist</div>;
};

export default Playlist;
