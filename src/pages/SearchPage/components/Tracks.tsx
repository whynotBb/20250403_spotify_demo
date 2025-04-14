import React from "react";
import { Track } from "../../../models/track";
import { Grid, styled, Typography } from "@mui/material";
import { ApiResponse } from "../../../models/apiResponse";

const TopResultCard = styled("div")({
  img: {
    width: "100px",
    height: "100px",
    borderRadius: "10px",
  },
});

const Box = styled("div")({
  margin: "20px 0",
  height: "calc(100vh - 250px)",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
    msOverflowStyle: "none", // IE and Edge
    scrollbarWidth: "none", // Firefox
  },
});
const Tracks = ({ track }: { track: ApiResponse<Track> }) => {
  console.log("track", track);

  return (
    <Box>
      <Grid container spacing={2} py="20px">
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h1">Top Result</Typography>
          <TopResultCard>
            <img src={track.items[0].album?.images[0].url} alt="" />
            <Typography variant="h1">{track.items[0].name}</Typography>
            <Typography>{track.items[0].artists[0].name}</Typography>
          </TopResultCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h1">Songs</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Tracks;
