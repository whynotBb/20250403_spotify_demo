import { Box, Grid, styled, Typography } from "@mui/material";
import React from "react";
import useGetBrowseCategories from "../../../hooks/useGetBrowseCategories";
import Loading from "../../../common/components/Loading";
import ErrorMessage from "../../../common/components/ErrorMessage";

const CategoryBx = styled("div")({
	margin: "20px 0",
	height: "calc(100vh - 250px)",
	overflowY: "auto",
	"&::-webkit-scrollbar": {
		display: "none",
		msOverflowStyle: "none", // IE and Edge
		scrollbarWidth: "none", // Firefox
	},
});
const Item = styled("div")({
	position: "relative",
	height: "150px",
	backgroundColor: "lightblue",
	borderRadius: "10px",
	overflow: "hidden",
	padding: "20px",
	fontWeight: "bold",
});
const ImgBx = styled("div")({
	position: "absolute",
	bottom: "0",
	right: "-25px",
	width: "100px",
	height: "100px",
	borderRadius: "10px",
	overflow: "hidden",
	transform: "rotate(30deg)",
	opacity: ".7",
	img: {
		width: "100%",
	},
});

const BrowseAll = () => {
	const { data, error, isLoading } = useGetBrowseCategories();
	console.log("browse all", data);

	if (isLoading || !data) {
		return <Loading />;
	}
	if (error) {
		return <ErrorMessage errorMessage={error.message} />;
	}
	const getDarkMutedColor = () => {
		const hue = Math.floor(Math.random() * 360);
		return `hsl(${hue}, 30%, 20%)`; // 어두운, 채도 낮은 색상
	};

	return (
		<Box my="20px">
			<Typography variant="h1">Browse All</Typography>
			<CategoryBx>
				<Grid container spacing={2}>
					{data.categories.items.map((category) => {
						const randomBg = getDarkMutedColor();
						return (
							<Grid size={{ xs: 6, md: 4 }} key={category.id}>
								<Item style={{ backgroundColor: randomBg }}>
									<Typography variant="h2">{category.name}</Typography>
									<ImgBx>
										<img src={category.icons[0].url} alt="" />
									</ImgBx>
								</Item>
							</Grid>
						);
					})}
				</Grid>
			</CategoryBx>
		</Box>
	);
};

export default BrowseAll;
