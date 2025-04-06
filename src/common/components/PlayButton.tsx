import { styled } from "@mui/material";
import React from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const PlayButtonContainer = styled("button")(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: "transparent",
  borderRadius: "50%",
  border: 0,
  width: "50px",
  height: "50px",
  cursor: "pointer",
  padding: 0,
  "&:hover": {
    outline: "none",
  },
  svg: {
    width: "100%",
    height: "100%",
  },
}));

const PlayButton = () => {
  return (
    <PlayButtonContainer>
      <PlayCircleIcon />
    </PlayButtonContainer>
  );
};

export default PlayButton;
