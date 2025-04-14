import { Route, Routes } from "react-router";
import "./App.css";
import React, { Suspense, useEffect } from "react";
import Loading from "./common/components/Loading";
import useExchangeToken from "./hooks/useExchangeToken";
const AppLayout = React.lazy(() => import("./layout/AppLayout"));
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage/SearchPage"));
const SearchWithKeywordPage = React.lazy(() => import("./pages/SearchPage/components/SearchWithKeywordPage"));
const PlaylistDetailPage = React.lazy(() => import("./pages/Playlist/PlaylistDetailPage"));
const PlaylistPage = React.lazy(() => import("./pages/Playlist/PlaylistPage"));

// 사이드바(플레이리스트)
// 홈 /
//  서치 /search
// 검색 결과 /search/:keyword
// 플레이리스트 상세 /playlist/:id
// 모바일 용 플레이리스트페이지(pc-사이드바) /playlist

function App() {
	const urlParams = new URLSearchParams(window.location.search);
	let code = urlParams.get("code");
	const codeVerifier = localStorage.getItem("code_verifier");

	const { mutate: exchangeToken } = useExchangeToken();

	useEffect(() => {
		if (code && codeVerifier) {
			exchangeToken({ code, codeVerifier });
		}
	}, [code, codeVerifier, exchangeToken]);

	return (
		<Suspense fallback={<Loading />}>
			<Routes>
				<Route path="/" element={<AppLayout />}>
					<Route index element={<HomePage />} />
					<Route path="search" element={<SearchPage />} />
					<Route path="search/:keyword" element={<SearchWithKeywordPage />} />
					<Route path="playlist/:id" element={<PlaylistDetailPage />} />
					<Route path="playlist" element={<PlaylistPage />} />
				</Route>
			</Routes>
		</Suspense>
	);
}

export default App;
