// theme colours
//light
export const lightTheme = {
  background: "#FFF5F7",
  surface: "#FFFFFF",
  primary: "#FF8FAB",
  secondary: "#FFB3C6",
  text: "#2D2D2D",
  textSecondary: "#666666",
  border: "#FFD6E0",
  error: "#FF4D6D",
  success: "#4CAF50",
};

//dark
export const darkTheme = {
  background: "#1A1A1A",
  surface: "#2D2D2D",
  primary: "#FF8FAB",
  secondary: "#FFB3C6",
  text: "#FFFFFF",
  textSecondary: "#AAAAAA",
  border: "#404040",
  error: "#FF6B6B",
  success: "#66BB6A",
};

// type for theme
export type Theme = typeof lightTheme;
export type ThemeMode = "light" | "dark";
