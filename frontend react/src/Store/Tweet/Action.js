// actions.js
import {
  TWEET_CREATE_REQUEST,
  TWEET_CREATE_SUCCESS,
  TWEET_CREATE_FAILURE,
  TWEET_DELETE_REQUEST,
  TWEET_DELETE_SUCCESS,
  TWEET_DELETE_FAILURE,
  TWEET_RESTORE_REQUEST,
  TWEET_RESTORE_SUCCESS,
  TWEET_RESTORE_FAILURE,
  GET_ALL_TWEETS_REQUEST,
  GET_ALL_TWEETS_SUCCESS,
  GET_ALL_TWEETS_FAILURE,
  GET_USERS_TWEET_REQUEST,
  GET_USERS_TWEET_SUCCESS,
  GET_USERS_TWEET_FAILURE,
  LIKE_TWEET_REQUEST,
  LIKE_TWEET_SUCCESS,
  LIKE_TWEET_FAILURE,
  USER_LIKE_TWEET_REQUEST,
  USER_LIKE_TWEET_SUCCESS,
  USER_LIKE_TWEET_FAILURE,
  RETWEET_CREATE_REQUEST,
  RETWEET_CREATE_SUCCESS,
  RETWEET_CREATE_FAILURE,
  FIND_TWEET_BY_ID_REQUEST,
  FIND_TWEET_BY_ID_SUCCESS,
  FIND_TWEET_BY_ID_FAILURE,
  REPLY_TWEET_REQUEST,
  REPLY_TWEET_SUCCESS,
  REPLY_TWEET_FAILURE,
  FETCH_MOST_LIKED_TWEETS_REQUEST,
  FETCH_MOST_LIKED_TWEETS_SUCCESS,
  FETCH_MOST_LIKED_TWEETS_FAILURE,
} from "./ActionType";

import { api } from "../../Config/apiConfig";

// 🔑 helper to attach Authorization header
const authHeader = () => {
  const token = localStorage.getItem("jwt");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ---------------- Create Tweet ----------------
export const createTweet = (tweetData) => async (dispatch) => {
  dispatch({ type: TWEET_CREATE_REQUEST });
  try {
    const { data } = await api.post("/api/twits/create", tweetData, authHeader());
    dispatch({ type: TWEET_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TWEET_CREATE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ---------------- Reply Tweet ----------------
export const createTweetReply = (tweetData) => async (dispatch) => {
  dispatch({ type: REPLY_TWEET_REQUEST });
  try {
    const { data } = await api.post("/api/twits/reply", tweetData, authHeader());
    dispatch({ type: REPLY_TWEET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REPLY_TWEET_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ---------------- Retweet ----------------
export const createRetweet = (twitId) => async (dispatch) => {
  dispatch({ type: RETWEET_CREATE_REQUEST });
  try {
    const { data } = await api.put(`/api/twits/${twitId}/retwit`, {}, authHeader());
    dispatch({ type: RETWEET_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RETWEET_CREATE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ---------------- Like Tweet ----------------
export const likeTweet = (twitId) => async (dispatch) => {
  dispatch({ type: LIKE_TWEET_REQUEST });
  try {
    const { data } = await api.post(`/api/twits/${twitId}/like`, {}, authHeader());
    dispatch({ type: LIKE_TWEET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LIKE_TWEET_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ---------------- Delete Tweet (Soft Delete) ----------------
export const deleteTweet = (twitId) => async (dispatch) => {
  dispatch({ type: TWEET_DELETE_REQUEST });
  try {
    await api.delete(`/api/twits/${twitId}`, authHeader());
    dispatch({ type: TWEET_DELETE_SUCCESS, payload: twitId });
  } catch (error) {
    dispatch({
      type: TWEET_DELETE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ---------------- Restore Tweet ----------------
export const restoreTweet = (twitId) => async (dispatch) => {
  dispatch({ type: TWEET_RESTORE_REQUEST });
  try {
    const { data } = await api.put(`/api/twits/${twitId}/restore`, {}, authHeader());
    // Backend returns ApiResponse { message, status, data: TwitDto }
    dispatch({ type: TWEET_RESTORE_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: TWEET_RESTORE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ---------------- Get All Tweets ----------------
export const getAllTweets = () => async (dispatch) => {
  dispatch({ type: GET_ALL_TWEETS_REQUEST });
  try {
    const { data } = await api.get("/api/twits/", authHeader());
    dispatch({ type: GET_ALL_TWEETS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_TWEETS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ---------------- Get User's Tweets ----------------
export const getUsersTweets = (userId) => async (dispatch) => {
  dispatch({ type: GET_USERS_TWEET_REQUEST });
  try {
    const { data } = await api.get(`/api/twits/user/${userId}`, authHeader());
    dispatch({ type: GET_USERS_TWEET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USERS_TWEET_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ---------------- Get Tweets liked by User ----------------
export const findTwitsByLikesContainUser = (userId) => async (dispatch) => {
  dispatch({ type: USER_LIKE_TWEET_REQUEST });
  try {
    const { data } = await api.get(`/api/twits/user/${userId}/likes`, authHeader());
    dispatch({ type: USER_LIKE_TWEET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LIKE_TWEET_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ---------------- Find Tweet by ID ----------------
export const findTwitsById = (twitId) => async (dispatch) => {
  dispatch({ type: FIND_TWEET_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`/api/twits/${twitId}`, authHeader());
    dispatch({ type: FIND_TWEET_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FIND_TWEET_BY_ID_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ---------------- Fetch Most Liked Tweets ----------------
export const fetchMostLikedTweets = () => async (dispatch) => {
  dispatch({ type: FETCH_MOST_LIKED_TWEETS_REQUEST });
  try {
    const { data } = await api.get("/api/explore/most-liked", authHeader());
    dispatch({ type: FETCH_MOST_LIKED_TWEETS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_MOST_LIKED_TWEETS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
