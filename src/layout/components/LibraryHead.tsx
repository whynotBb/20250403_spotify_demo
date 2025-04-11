import React from "react";

import { Box, Button, IconButton, styled, Typography } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import AddIcon from "@mui/icons-material/Add";
import useCreatePlaylist from "../../hooks/useCreatePlaylist";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { getSpotifyAuthUrl } from "../../utils/auth";

const Head = styled("div")({
	display: "flex",
	alignItems: "center",
	padding: "8px",
});

const LibraryHead = () => {
	const { mutate: createPlaylist } = useCreatePlaylist();
	const { data: user } = useGetCurrentUserProfile();
	const handleCreatePlaylist = () => {
		if (!user) {
			getSpotifyAuthUrl();
		} else {
			createPlaylist({ name: "my playlist" });
		}
	};
	return (
		<Head>
			<Box display="flex">
				<BookmarkBorderIcon />
				<Typography variant="h1" fontWeight={700}>
					Your Library
				</Typography>
			</Box>
			<Button onClick={handleCreatePlaylist}>
				<AddIcon />
			</Button>
		</Head>
	);
};

export default LibraryHead;
