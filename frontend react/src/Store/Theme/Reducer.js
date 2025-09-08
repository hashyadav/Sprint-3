import { CHANGE_THEME } from "./ActionType";

const initialState = {
  currentTheme: localStorage.getItem("theme") || "light",
};

export const themeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_THEME:
      // Update theme in state and optionally persist to localStorage
      localStorage.setItem("theme", payload);
      return { ...state, currentTheme: payload };
    default:
      return state; // Keep current state for other actions
  }
};
