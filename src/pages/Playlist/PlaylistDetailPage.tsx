import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import Loading from "../../common/components/Loading";
import ErrorMessage from "../../common/components/ErrorMessage";
import { Box, styled, Typography } from "@mui/material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";

const PlaylistHeader = styled(Box)({
	display: "flex",
	alignItems: "center",
	gap: "40px",
});
const ImgBox = styled("div")({
	width: "100px",
	height: "100px",
	borderRadius: "6px",
	overflow: "hidden",
	background: "#333",
	alignItems: "center",
	justifyContent: "center",
	display: "flex",

	img: {
		width: "100%",
	},
});
const TxtBox = styled("div")({});
const Desc = styled("div")({
	display: "flex",
	alignItems: "center",
	gap: "6px",
	img: {
		width: "30px",
	},
});
const PlaylistDetailPage = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	useEffect(() => {
		if (id === undefined) {
			navigate("/");
		}
	}, [id, navigate]);
	const { data: playlist, isLoading, error } = useGetPlaylist({ playlist_id: id ?? "" });

	console.log(id, "playlist", playlist);

	const { data: playlistItems } = useGetPlaylistItems({ playlist_id: id ?? "", limit: 10, offset: 0 });
	console.log("playlistItem", playlistItems);
	if (isLoading || !playlist) {
		return <Loading />;
	}
	if (error) {
		return <ErrorMessage errorMessage={error.message} />;
	}
	return (
		<PlaylistHeader>
			<ImgBox>{!playlist.images || playlist.images.length === 0 ? <LibraryMusicIcon /> : <img src={playlist.images[0].url} alt="" />}</ImgBox>
			<TxtBox>
				<Typography variant="h1">{playlist.name}</Typography>
				<Desc>
					<img src="https://static.libnet.info/images/events/cphlibrary/spotify.png" alt="" />
					{playlist.owner && <p>{playlist.owner.display_name}</p>}
				</Desc>
			</TxtBox>
		</PlaylistHeader>
	);
};

export default PlaylistDetailPage;
