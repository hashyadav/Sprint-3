import React, { useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { BusinessCenterSharp } from "@mui/icons-material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  findTwitsByLikesContainUser,
  getUsersTweets,
} from "../../Store/Tweet/Action";
import TwitCard from "../Home/MiddlePart/TwitCard/TwitCard";
import ProfileModel from "./ProfileModel";
import { FollowUserAction, findUserById } from "../../Store/Auth/Action";
import SnackbarComponent from "../Snackbar/SnackbarComponent";

const Profile = () => {
  const [tabValue, setTabValue] = useState("1");
  const { auth, twit, theme } = useSelector((store) => store);
  const [openProfileModel, setOpenProfileModel] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === "4") {
      dispatch(findTwitsByLikesContainUser(param.id));
    } else if (newValue === "1") {
      dispatch(getUsersTweets(param.id));
    }
  };

  // Fetch user tweets and liked tweets
  useEffect(() => {
    dispatch(getUsersTweets(param.id)); // should fetch all including soft-deleted
    dispatch(findTwitsByLikesContainUser(param.id));
  }, [param.id, twit.retwit]);

  // Fetch user info
  useEffect(() => {
    dispatch(findUserById(param.id));
  }, [param.id, auth.user]);

  // Snackbar for user update
  useEffect(() => setOpenSnackBar(auth.updateUser), [auth.updateUser]);

  const handleCloseProfileModel = () => setOpenProfileModel(false);
  const handleOpenProfileModel = () => setOpenProfileModel(true);
  const handleCloseSnackBar = () => setOpenSnackBar(false);
  const handleFollowUser = () => dispatch(FollowUserAction(param.id));

  return (
    <React.Fragment>
      {/* Header */}
      <section className={`z-50 flex items-center sticky top-0 ${theme.currentTheme === "light" ? "bg-white" : "bg-[#0D0D0D]"} bg-opacity-95`}>
        <KeyboardBackspaceIcon className="cursor-pointer" onClick={handleBack} />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">{auth.findUser?.fullName}</h1>
      </section>

      {/* Background image */}
      <section>
        <img
          className="w-[100%] h-[15rem] object-cover"
          src={auth.findUser?.backgroundImage || "https://cdn.pixabay.com/photo/2018/10/16/15/01/background-image-3751623_1280.jpg"}
          alt=""
        />
      </section>

      {/* Profile info */}
      <section className="pl-6">
        <div className="flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            alt="Avatar"
            src={auth.findUser?.image}
            className="transform -translate-y-24"
            sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
          />
          {auth.findUser?.req_user ? (
            <Button onClick={handleOpenProfileModel} sx={{ borderRadius: "20px" }} variant="outlined" className="rounded-full">
              Edit Profile
            </Button>
          ) : (
            <Button onClick={handleFollowUser} sx={{ borderRadius: "20px" }} variant="outlined" className="rounded-full">
              {auth.findUser?.followed ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>

        {/* User details */}
        <div>
          <div className="flex items-center">
            <h1 className="font-bold text-lg">{auth.findUser?.fullName}</h1>
            {auth.findUser?.verified && (
              <img
                className="ml-2 w-5 h-5"
                src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png"
                alt="verified"
              />
            )}
          </div>
          <h1 className="text-gray-500">@{auth.findUser?.fullName?.toLowerCase()}</h1>
          {auth.findUser?.bio && <p className="mt-2">{auth.findUser.bio}</p>}

          <div className="flex items-center space-x-5 mt-2">
            <div className="flex items-center space-x-1 font-semibold">
              <span>{auth.findUser?.followings.length}</span>
              <span className="text-gray-500">Following</span>
            </div>
            <div className="flex items-center space-x-1 font-semibold">
              <span>{auth.findUser?.followers.length}</span>
              <span className="text-gray-500">Followers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs for Tweets, Replies, Media, Likes */}
      <section>
        <Box sx={{ width: "100%", typography: "body1", marginTop: "20px" }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleTabChange} aria-label="profile tabs">
                <Tab label="Tweets" value="1" />
                <Tab label="Replies" value="2" />
                <Tab label="Media" value="3" />
                <Tab label="Likes" value="4" />
              </TabList>
            </Box>

            {/* Tab panels */}
            <TabPanel value="1">
              {twit.twits?.map((item) => (
                <TwitCard key={item.id} twit={item} />
              ))}
            </TabPanel>

            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>

            <TabPanel value="4">
              {twit.likedTwits?.map((item) => (
                <TwitCard key={item.id} twit={item} />
              ))}
            </TabPanel>
          </TabContext>
        </Box>
      </section>

      {/* Profile modal */}
      <ProfileModel open={openProfileModel} handleClose={handleCloseProfileModel} />

      {/* Loading backdrop */}
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={twit.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Snackbar */}
      <SnackbarComponent
        handleClose={handleCloseSnackBar}
        open={openSnackBar}
        message={"User updated successfully"}
      />
    </React.Fragment>
  );
};

export default Profile;
