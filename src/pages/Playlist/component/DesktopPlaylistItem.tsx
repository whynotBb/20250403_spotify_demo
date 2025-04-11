import React from "react";
import { PlaylistTrack } from "../../../models/playlist";
import { styled, TableCell, TableRow } from "@mui/material";
import { Episode, Track } from "../../../models/track";
import { BorderBottom } from "@mui/icons-material";

interface DesktopPlaylistItemProps {
	index: number;
	item: PlaylistTrack;
}

const StyleTableRow = styled(TableRow)(({ theme }) => ({
	"&:hover": {
		backgroundColor: theme.palette.action.hover,
	},
}));

const DesktopPlaylistItem = ({ item, index }: DesktopPlaylistItemProps) => {
	// PlaylistTrack track 타입 좁히기
	const isEpisode = (track: Track | Episode): track is Episode => {
		return "description" in track;
	};
	return (
		<StyleTableRow>
			<TableCell>{index}</TableCell>
			<TableCell>{item.track.name || "no name"}</TableCell>
			<TableCell>{isEpisode(item.track) ? "N/A" : item.track.album?.name}</TableCell>
			<TableCell>{item.added_at || "Unknown"}</TableCell>
			<TableCell>
				{Math.floor(item.track.duration_ms / 60000)} :{Math.trunc((item.track.duration_ms - Math.floor(item.track.duration_ms / 60000) * 60000) / 1000)}
			</TableCell>
		</StyleTableRow>
	);
};

export default DesktopPlaylistItem;
