import { Button, Card, styled, Typography } from "@mui/material";
import React from "react";

const EmptyPlaylistCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: "20px",
  borderRadius: "8px",
}));

const CreatePlaylistButton = styled(Button)({
  marginTop: "20px",
  fontWeight: "700",
});

const EmptyPlaylist = () => {
  return (
    <EmptyPlaylistCard>
      <Typography variant="h2" fontWeight={600} mb={2}>
        Create your first playlist
      </Typography>
      <Typography variant="body2">It's easy, we'll help you</Typography>
      <CreatePlaylistButton variant="contained" size="large" color="secondary">
        Create playlist
      </CreatePlaylistButton>
    </EmptyPlaylistCard>
  );
};

export default EmptyPlaylist;
