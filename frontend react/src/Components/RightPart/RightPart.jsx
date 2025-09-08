import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Paper, Box, Typography } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../Store/Theme/Action";
import { searchUser } from "../../Store/Auth/Action";
import { useNavigate } from "react-router-dom";
import SpaceLogo from "../Navigation/Space_logo.png";

const RightPart = () => {
  const { theme, auth } = useSelector((store) => store);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeTheme = () => {
    dispatch(changeTheme(theme.currentTheme === "dark" ? "light" : "dark"));
  };

  const handleSearchUser = (event) => {
    setSearch(event.target.value);
    dispatch(searchUser(event.target.value));
  };

  const navigateToProfile = (id) => {
    navigate(`/profile/${id}`);
    setSearch("");
  };

  return (
    <div className="py-5 sticky top-0 overflow-y-hidden">
      <div className="hideScrollbar overflow-y-scroll">
        <div className="relative flex items-center">
          <input
            value={search}
            onChange={handleSearchUser}
            type="text"
            placeholder="Search Twitter"
            className={`py-3 rounded-full outline-none text-gray-500 w-full pl-12 ${
              theme.currentTheme === "light" ? "bg-slate-300" : "bg-[#151515]"
            }`}
          />
          <span className="absolute top-0 left-0 pl-3 pt-3">
            <SearchIcon className="text-gray-500" />
          </span>
          {search && (
            <div
              className={`overflow-y-scroll hideScrollbar absolute z-50 top-14  border-gray-700 h-[40vh] w-full rounded-md ${
                theme.currentTheme === "light"
                  ? "bg-white"
                  : "bg-[#151515] border"
              }`}
            >
              {auth.searchResult.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigateToProfile(item.id)}
                  className="flex items-center hover:bg-slate-800 p-3 cursor-pointer"
                >
                  <Avatar alt={item.fullName} src={item.image} />
                  <div className="ml-2">
                    <p>{item.fullName}</p>
                    <p className="text-sm text-gray-400">
                      @{item.fullName.split(" ").join("_").toLowerCase()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Brightness4Icon
            onClick={handleChangeTheme}
            className="ml-3 cursor-pointer"
          />
        </div>

        {/* Space Logo Section */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            background:
              theme.currentTheme === "dark"
                ? "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
                : "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
            border:
              theme.currentTheme === "dark"
                ? "1px solid #333"
                : "1px solid #e0e0e0",
            height: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            mt: 3,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage:
                "url(https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=400&fit=crop)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 3,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(135deg, rgba(29, 155, 240, 0.8), rgba(138, 43, 226, 0.7))",
                borderRadius: 3,
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <img
                src={SpaceLogo}
                alt="Space Logo"
                style={{
                  width: "100px",
                  height: "100px",
                  marginBottom: "20px",
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  mb: 2,
                  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                🌌
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  mb: 1,
                  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                Explore the Universe
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "1rem",
                  textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                }}
              >
                Join the conversation and share your thoughts
              </Typography>
            </Box>
          </Box>
        </Paper>
      </div>
    </div>
  );
};

export default RightPart;
