import { TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import SearchResultList from "./SearchResultList";

const EmptyPlaylistWithSearch = () => {
	// useState ts 쓸때 타입 안내 해 주는 편이 좋다
	const [keyword, setKeyword] = useState<string>("");

	const { data, error, isLoading } = useSearchItemsByKeyword({
		q: keyword,
		type: [SEARCH_TYPE.Track],
		// type: [SEARCH_TYPE.Track, SEARCH_TYPE.Album],
	});
	console.log("search : ", data);

	// type : e:React.ChangeEvent<HTMLInputElement>
	const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value);
	};
	return (
		<div>
			<Typography variant="h1" my="10px">
				Let's find something for your playlist
			</Typography>
			<TextField value={keyword} onChange={handleSearchKeyword} />
			{!data ? (
				<Typography variant="h2" my="20px">
					검색 결과가 없습니다.
				</Typography>
			) : (
				data.pages.map((item) => {
					if (!item.tracks) {
						return false;
					} else {
						<SearchResultList list={item.tracks.items} />;
					}
				})
			)}
		</div>
	);
};

export default EmptyPlaylistWithSearch;
