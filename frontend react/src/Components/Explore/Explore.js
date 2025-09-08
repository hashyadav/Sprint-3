import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMostLikedTweets } from "../../Store/Tweet/Action";
import TwitCard from "../Home/MiddlePart/TwitCard/TwitCard";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Chip,
  Divider,
  Paper,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WhatshotIcon from "@mui/icons-material/Whatshot";

const Explore = () => {
  const dispatch = useDispatch();
  const { twit: tweets, theme } = useSelector((store) => store);
  const [activeTab, setActiveTab] = useState("trending");

  useEffect(() => {
    dispatch(fetchMostLikedTweets());
  }, [dispatch]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "trending") {
      dispatch(fetchMostLikedTweets());
    }
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const tweetDate = new Date(dateString);
    const diffInSeconds = Math.floor((now - tweetDate) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    return `${Math.floor(diffInSeconds / 86400)}d`;
  };

  const getTopTweets = () => {
    if (!tweets || !tweets.mostLiked || tweets.mostLiked.length === 0) return [];
    
    return tweets.mostLiked
      .filter(tweet => tweet.totalLikes > 0)
      .sort((a, b) => b.totalLikes - a.totalLikes)
      .slice(0, 3);
  };

  const topTweets = getTopTweets();

  return (
    <div className="min-h-screen">
      {/* Content */}
      <div className="max-w-2xl mx-auto">
        <div className="p-6">
          {tweets && tweets.loading ? (
            <Box className="flex justify-center items-center py-8">
              <CircularProgress />
              <Typography className="ml-3 text-gray-600 dark:text-gray-400">
                Loading tweets...
              </Typography>
            </Box>
          ) : tweets && tweets.error ? (
            <Alert severity="error" className="mb-4">
              {tweets.error}
            </Alert>
          ) : tweets && tweets.mostLiked && tweets.mostLiked.length > 0 ? (
            <div className="space-y-4">
              {tweets.mostLiked.map((twit, index) => (
                <div
                  key={twit.id}
                  className={`${
                    theme.currentTheme === "dark"
                      ? "bg-gray-900 border border-gray-800"
                      : "bg-white border border-gray-200"
                  } rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200`}
                  style={{ marginTop: index === 0 ? '0' : '16px' }}
                >
                  <TwitCard twit={twit} />
                </div>
              ))}
            </div>
          ) : (
            <Paper
              className={`p-8 text-center ${
                theme.currentTheme === "dark"
                  ? "bg-gray-900 border-gray-700"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <Typography
                variant="h6"
                className={`mb-2 ${
                  theme.currentTheme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                No tweets to explore yet
              </Typography>
              <Typography
                variant="body2"
                className={`${
                  theme.currentTheme === "dark" ? "text-gray-500" : "text-gray-500"
                }`}
              >
                Be the first to create content that gets people talking!
              </Typography>
            </Paper>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
