import { Box, Button, colors, Menu, MenuItem, styled, Typography } from "@mui/material";
import React, { useEffect } from "react";
import LoginButton from "../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import FaceIcon from "@mui/icons-material/Face";
import theme from "../../theme";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const UserProfile = styled("button")({
  display: "flex",
  alignItems: "center",
  gap: "`10px",
  backgroundColor: "transparent",
  color: "fff",
  border: "none",
  outline: "none",
});
const ImgBox = styled("div")({
  width: "30px",
  height: "30px",
  img: {
    width: "100%",
  },
  svg: {
    width: "100%",
    color: "#fff",
  },
});

const Navbar = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // data : userProfile > userProfile 로 재정의
  const { data: userProfile, error, isLoading } = useGetCurrentUserProfile();
  console.log("profile data", userProfile);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setAnchorEl(null);
    localStorage.removeItem("access_token");
    queryClient.removeQueries({
      queryKey: ["current-user-profile"],
    });
    navigate("/");
  };

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" height="64px">
      {userProfile ? (
        <UserProfile onClick={handleClick}>
          <Typography color={theme.palette.text.secondary}>{userProfile.display_name}</Typography>
          <ImgBox>
            {userProfile.images.length > 0 ? <img src={userProfile.images[0].url} alt="" /> : <FaceIcon />}
          </ImgBox>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={logout}>logout</MenuItem>
          </Menu>
        </UserProfile>
      ) : (
        <LoginButton />
      )}
    </Box>
  );
};

export default Navbar;
