import { styled, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import BrowseAll from "./components/BrowseAll";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";
import SearchWithKeywordPage from "./components/SearchWithKeywordPage";

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

const SearchPage = () => {
	const [keyword, setKeyword] = useState<string>("");
	const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value);
	};
	const { data, error, isLoading } = useSearchItemsByKeyword({
		q: keyword,
		type: [SEARCH_TYPE.Album, SEARCH_TYPE.Artist, SEARCH_TYPE.Track],
	});
	console.log("search page : ", data);

	return (
		<div>
			<TextFieldBx>
				<SearchIcon />
				<TextField value={keyword} onChange={handleSearchKeyword} />
			</TextFieldBx>
			{data ? <SearchWithKeywordPage /> : <BrowseAll />}
		</div>
	);
};

export default SearchPage;
