import React, { useEffect } from "react";
import EmptyPlaylist from "./EmptyPlaylist";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import Loading from "../../common/components/Loading";
import ErrorMessage from "../../common/components/ErrorMessage";
import { styled } from "@mui/material";
import Playlist from "./Playlist";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { InView, useInView } from "react-intersection-observer";
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
	const { ref, inView } = useInView();
	//hasNextPage : 다음페이지 있니? , isFetchingNextPage : 다음페이지 부르는 중이니? , fetchNextPage : 다음페이지 호출
	const { data, error, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetCurrentUserPlaylists({ limit: 10, offset: 0 });
	useEffect(() => {
		// inView true 이고 다음페이지가 있고, 다음페이지 부르는 중이 아닐때, 다음페이지 호출해줘
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [inView]);

	console.log("playlist", data);
	const { data: user } = useGetCurrentUserProfile();
	if (isLoading) {
		return <Loading />;
	}
	if (error) {
		return <ErrorMessage errorMessage={error.message} />;
	}
	if (!user) {
		return <EmptyPlaylist />;
	}
	return (
		<div>
			{!data || data?.pages[0].total === 0 ? (
				<EmptyPlaylist />
			) : (
				<PlaylistContainer>
					{data?.pages.map((page, index) => (
						<Playlist playlists={page.items} key={index} />
					))}
					{/*  ref 영역이 화면에 보여지면, useInview 가 true 로 작동함 - 
          이 시점에 다음 페이지 부른는 함수 호출하면 무한 스크롤 가능*/}
					<div ref={ref}>{isFetchingNextPage && <Loading />}</div>
				</PlaylistContainer>
			)}
		</div>
	);
};

export default Library;
