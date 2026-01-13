import { RootState } from "../../store";
import { lightTheme, darkTheme } from "./theme";

export const selectThemeMode = (state: RootState) => state.theme.mode;

export const selectTheme = (state: RootState) =>
  state.theme.mode === "light" ? lightTheme : darkTheme;
