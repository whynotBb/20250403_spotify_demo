import React from "react";
import { searchResponse } from "../../../models/search";
import { Grid, styled, Typography } from "@mui/material";
import Tracks from "./Tracks";
const ResultBx = styled("div")({});
const TopResultCard = styled("div")({
  img: {
    width: "100px",
    height: "100px",
    borderRadius: "10px",
    overflow: "hidden",
  },
});
const SearchWithKeywordPage = ({ resultData }: { resultData: searchResponse }) => {
  console.log("resultData,", resultData);

  return <ResultBx>{resultData.tracks && <Tracks track={resultData.tracks} />}</ResultBx>;
};

export default SearchWithKeywordPage;
