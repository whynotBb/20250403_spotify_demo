import { styled } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";

//mui styeld component
const Layout = styled("div")({
	display: "flex",
	height: "100vh",
	padding: "8px",
});
const Sidebar = styled("div")(({ theme }) => ({
	width: "331px",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	// 미디어쿼리 사용 mui
	[theme.breakpoints.down("sm")]: {
		display: "none",
	},
}));

const AppLayout = () => {
	return (
		<Layout>
			<Sidebar>sidebar</Sidebar>
			<Outlet />
		</Layout>
	);
};

export default AppLayout;
