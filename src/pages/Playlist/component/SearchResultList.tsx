import React from "react";
import { Track } from "../../../models/track";
import { Button, styled, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

interface SearchResultListProps {
  list: Track[];
}

const SearchResultList = ({ list }: SearchResultListProps) => {
  const addToPlaylist = () => {};
  return list.map((track, idx) => (
    <TableRow key={idx}>
      <TableCell>{track.name}</TableCell>
      <TableCell>{track.artists[0].name}</TableCell>
      <TableCell>❤ {track.popularity}</TableCell>
      <TableCell>
        <Button onClick={addToPlaylist}>ADD</Button>
      </TableCell>
    </TableRow>
  ));
};

export default SearchResultList;
