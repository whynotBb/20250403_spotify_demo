import React from "react";
import { Track } from "../../../models/track";
import { Button, TableCell, TableRow } from "@mui/material";
import { useParams } from "react-router";
import useAddPlaylistItem from "../../../hooks/useAddPlaylistItem";

interface SearchResultListProps {
	list: Track[];
}

const SearchResultList = ({ list }: SearchResultListProps) => {
	const { mutate: addPlaylistItem } = useAddPlaylistItem();
	const { id: playlist_id } = useParams();
	console.log("playlist id", playlist_id);

	const addToPlaylist = (uri: string) => {
		if (!playlist_id) {
			return false;
		}
		addPlaylistItem({ playlist_id, uris: [uri], position: 0 });
	};
	return list.map((track, idx) => (
		<TableRow key={idx}>
			<TableCell>{track.name}</TableCell>
			<TableCell>{track.artists[0].name}</TableCell>
			<TableCell>❤ {track.popularity}</TableCell>
			<TableCell>
				<Button onClick={() => addToPlaylist(track.uri)}>ADD</Button>
			</TableCell>
		</TableRow>
	));
};

export default SearchResultList;
