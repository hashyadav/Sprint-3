// authActions.js
import { api } from "../../Config/apiConfig";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  LOGOUT,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  FIND_USER_BY_ID_REQUEST,
  FIND_USER_BY_ID_FAILURE,
  FIND_USER_BY_ID_SUCCESS,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILURE,
} from "./ActionType";

// ✅ Login actions
export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = (userData) => ({ type: LOGIN_SUCCESS, payload: userData });
export const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const loginUser = (loginData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await api.post("/auth/signin", loginData);
    const user = response.data;
    if (user.jwt) localStorage.setItem("jwt", user.jwt);
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || error.message));
  }
};

// ✅ Register actions
export const registerRequest = () => ({ type: REGISTER_REQUEST });
export const registerSuccess = (userData) => ({ type: REGISTER_SUCCESS, payload: userData });
export const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const registerUser = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await api.post("/auth/signup", userData);
    const user = response.data;
    if (user.jwt) localStorage.setItem("jwt", user.jwt);
    dispatch(registerSuccess(user));
  } catch (error) {
    dispatch(registerFailure(error.response?.data?.message || error.message));
  }
};

// ✅ Profile actions
const getUserProfileRequest = () => ({ type: GET_PROFILE_REQUEST });
const getUserProfileSuccess = (user) => ({ type: GET_PROFILE_SUCCESS, payload: user });
const getUserProfileFailure = (error) => ({ type: GET_PROFILE_FAILURE, payload: error });

export const getUserProfile = (jwt) => async (dispatch) => {
  dispatch(getUserProfileRequest());
  try {
    const response = await api.get("/api/users/profile", {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch(getUserProfileSuccess(response.data));
  } catch (error) {
    dispatch(getUserProfileFailure(error.response?.data?.message || error.message));
  }
};

// ✅ Find user by ID
export const findUserById = (userId) => async (dispatch) => {
  dispatch({ type: FIND_USER_BY_ID_REQUEST });
  try {
    const response = await api.get(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });
    dispatch({ type: FIND_USER_BY_ID_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FIND_USER_BY_ID_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

// ✅ Search users
export const searchUser = (query) => async (dispatch) => {
  dispatch({ type: SEARCH_USER_REQUEST });
  try {
    const response = await api.get(`/api/users/search?query=${query}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });
    dispatch({ type: SEARCH_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: SEARCH_USER_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

// ✅ Update user profile
export const updateUserProfile = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  try {
    const response = await api.put("/api/users/update", reqData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });
    dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

// ✅ Follow user
export const FollowUserAction = (userId) => async (dispatch) => {
  dispatch({ type: FOLLOW_USER_REQUEST });
  try {
    const response = await api.put(`/api/users/${userId}/follow`, null, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });
    dispatch({ type: FOLLOW_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FOLLOW_USER_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

// ✅ Logout
export const logout = (navigate) => (dispatch) => {
  localStorage.removeItem("jwt");
  dispatch({ type: LOGOUT, payload: null });
  if (navigate) navigate("/"); // optional navigation
};
