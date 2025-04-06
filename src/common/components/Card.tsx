import { Box, styled, Typography } from "@mui/material";
import React from "react";
import PlayButton from "./PlayButton";

const CardContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: "10px",
  cursor: "pointer",
  transition: "all .3s",
  borderRadius: "10px",

  "&:hover": {
    backgroundColor: "#333",
    transform: "translateY(-6px)",
  },
  "&:hover .overlay": {
    opacity: 0.7,
  },
}));
const AlbumImage = styled("img")({
  width: "100%",
  aspectRatio: 1 / 1,
  borderRadius: "8px",
  marginBottom: "8px",
});

const EllipsisTypography = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const Overlay = styled("div")({
  position: "absolute",
  bottom: "10px",
  right: "0px",
  opacity: 0,
});

interface CardProps {
  name: string;
  image: string;
  artistName: string | undefined;
}

const Card = ({ image, name, artistName }: CardProps) => {
  return (
    <CardContainer>
      <div style={{ position: "relative" }}>
        <AlbumImage src={image} alt="" />
        <Overlay className="overlay">
          <PlayButton />
        </Overlay>
      </div>
      <EllipsisTypography variant="h2">{name}</EllipsisTypography>
      {artistName && (
        <EllipsisTypography color="text.secondary" variant="body1" marginTop="2px">
          {artistName}
        </EllipsisTypography>
      )}
    </CardContainer>
  );
};

export default Card;
