import { styled, Table, TableBody, TableRow, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import SearchResultList from "./SearchResultList";
import { useInView } from "react-intersection-observer";
import Loading from "../../../common/components/Loading";
import SearchIcon from "@mui/icons-material/Search";

const SearchItems = styled("div")({
	height: "calc(100vh - 370px)",
	overflowY: "auto",
	margin: "20px 0 0 0",
	"&::-webkit-scrollbar": {
		display: "none",
		msOverflowStyle: "none", // IE and Edge
		scrollbarWidth: "none", // Firefox
	},
});

const TextFieldBx = styled("div")({
	display: "inline-flex",
	alignItems: "center",
	gap: "6px",
	padding: "0 20px",
	border: "1px solid #333",
	borderRadius: "100px",
	width: "auto",
	fieldset: {
		border: "none",
	},
});

const EmptyPlaylistWithSearch = () => {
	const { ref, inView } = useInView();
	// useState ts 쓸때 타입 안내 해 주는 편이 좋다
	const [keyword, setKeyword] = useState<string>("");

	const { data, error, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useSearchItemsByKeyword({
		q: keyword,
		type: [SEARCH_TYPE.Track],
		// type: [SEARCH_TYPE.Track, SEARCH_TYPE.Album],
	});
	console.log("search : ", data);
	useEffect(() => {
		// inView true 이고 다음페이지가 있고, 다음페이지 부르는 중이 아닐때, 다음페이지 호출해줘
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [inView]);
	// type : e:React.ChangeEvent<HTMLInputElement>
	const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value);
	};
	return (
		<div>
			<Typography variant="h1" my="10px">
				Let's find something for your playlist
			</Typography>
			<TextFieldBx>
				<SearchIcon />
				<TextField value={keyword} onChange={handleSearchKeyword} />
			</TextFieldBx>
			{!data ? (
				""
			) : isLoading ? (
				<Loading />
			) : data?.pages[0].tracks?.total === 0 ? (
				<Typography variant="h2" my="20px">
					검색 결과가 없습니다.
				</Typography>
			) : (
				<SearchItems>
					<Table>
						<TableBody>
							{data.pages.map((item, idx) => {
								if (!item.tracks) {
									return false;
								}
								return <SearchResultList list={item.tracks.items} key={idx} />;
							})}
						</TableBody>
					</Table>
					<div style={{ padding: "20px 0" }} ref={ref}>
						{isFetchingNextPage && <Loading />}
					</div>
				</SearchItems>
			)}
		</div>
	);
};

export default EmptyPlaylistWithSearch;
