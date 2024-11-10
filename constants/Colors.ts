/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,

    cardBackground: "#F8F9FA",
    cardBorder: "#ECEDEE",
    cardText: "#11181C",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,

    cardBackground: "#1C1D1F",
    cardBorder: "#2C2D30",
    cardText: "#ECEDEE",
  },
  chart: {
    income: "#93FCF8",
    incomeGradient: "#93FCF8",
    expense: "#FFA1A1",
    expenseGradient: "#FFA1A1",
    total: "#A1A1FF",
    totalGradient: "#A1A1FF",
  },
};
