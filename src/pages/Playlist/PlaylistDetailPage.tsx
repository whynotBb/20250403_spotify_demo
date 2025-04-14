import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import Loading from "../../common/components/Loading";
import ErrorMessage from "../../common/components/ErrorMessage";
import { Box, styled, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import DesktopPlaylistItem from "./component/DesktopPlaylistItem";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import { useInView } from "react-intersection-observer";
import { BorderBottom, BorderColor, Height } from "@mui/icons-material";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import LoginButton from "../../common/components/LoginButton";
import EmptyPlaylistWithSearch from "./component/EmptyPlaylistWithSearch";

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
const TableBx = styled("div")({
  marginTop: "20px",
  maxHeight: "calc(100vh - 240px)",
  paddingBottom: "20px",
  overflowY: "auto",

  "&::-webkit-scrollbar": {
    display: "none",
    msOverflowStyle: "none", // IE and Edge
    scrollbarWidth: "none", // Firefox
  },
});
const LoginBox = styled("div")({
  width: "100%",
  height: "calc(100vh - 200px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const PlaylistDetailPage = () => {
  const { data: user } = useGetCurrentUserProfile();
  console.log("user.id", user?.id);

  const { ref, inView } = useInView();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (id === undefined) {
      navigate("/");
    }
  }, [id, navigate]);
  const { data: playlist, isLoading, error } = useGetPlaylist({ playlist_id: id ?? "" });

  console.log(id, "playlist", playlist);

  const {
    data: playlistItems,
    error: playlistError,
    isLoading: playlistIsLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: id ?? "", limit: PAGE_LIMIT, offset: 0 });
  console.log("playlistItem", playlistItems);
  useEffect(() => {
    // inView true 이고 다음페이지가 있고, 다음페이지 부르는 중이 아닐때, 다음페이지 호출해줘
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);
  if (!user?.id) {
    return (
      <LoginBox>
        <Typography marginBottom={"20px"}>다시 로그인 해 주세요.</Typography>
        <LoginButton />
      </LoginBox>
    );
  }

  if (isLoading || playlistIsLoading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }
  if (playlistError) {
    return <ErrorMessage errorMessage={playlistError.message} />;
  }

  return (
    <div>
      <PlaylistHeader>
        {playlist ? (
          <>
            <ImgBox>
              {!playlist.images || playlist.images.length === 0 ? (
                <LibraryMusicIcon />
              ) : (
                <img src={playlist.images[0].url} alt="" />
              )}
            </ImgBox>
            <TxtBox>
              <Typography variant="h1">{playlist.name}</Typography>
              <Desc>
                <img src="https://static.libnet.info/images/events/cphlibrary/spotify.png" alt="" />
                {playlist.owner && <p>{playlist.owner.display_name}</p>}
              </Desc>
            </TxtBox>
          </>
        ) : (
          "플레이리스트가 없습니다."
        )}
      </PlaylistHeader>
      {playlist?.tracks.total === 0 ? (
        <div>
          <EmptyPlaylistWithSearch />
        </div>
      ) : (
        <TableBx>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Album</TableCell>
                <TableCell>Date added</TableCell>
                <TableCell>Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playlistItems?.pages.map((page, pageIdx) =>
                page.items.map((item, itemIdx) => {
                  return (
                    <DesktopPlaylistItem
                      item={item}
                      key={pageIdx * PAGE_LIMIT + itemIdx + 1}
                      index={pageIdx * PAGE_LIMIT + itemIdx + 1}
                    />
                  );
                })
              )}
            </TableBody>
          </Table>
          <div ref={ref}>{isFetchingNextPage && <Loading />}</div>
        </TableBx>
      )}
    </div>
  );
};

export default PlaylistDetailPage;
