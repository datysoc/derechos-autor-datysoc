const COLORS = {
  black: "#000000",
  white: "#ffffff",
  darkGray: "#323232",
  gray: "#535353",
  gray10: "#646464",
  gray20: "#858585",
  gray30: "#979797",
  lighGray: "#8c8c8c",
  lighGray5: "#b5b5b5",
  lighGray10: "#c4c4c4",
  lighGray20: "#cecece",
  lighGray30: "#ededed",
  lighGray40: "#efefef",
  lighGray50: "#ededed",
  lighGray60: "#f9fafb",

  transparentGray5: "rgba(98, 98, 98, 0.9);",
  transparentGray10: "rgba(98, 98, 98, 0.8);",
  transparentGray20: "rgba(98, 98, 98, 0.6);",
  transparentGray30: "rgba(98, 98, 98, 0.4);",
  transparentGray40: "rgba(98, 98, 98, 0.2);",

  transparentWhite10: "rgba(255, 255, 255, 0.1)",
  transparentWhite40: "rgba(255, 255, 255, 0.4)",

  orange: "#ff5500",
  yellow: "#fae731",
  violet: "#252352",
  pink: "#f761a3",
  blue: "#2489cf",
  green: "#40c07a",
  red: "#e64746",
};

const uiColors = {
  mainLink: COLORS.blue,
  secondaryLink: COLORS.yellow,
  mainChecked: COLORS.blue,
  highlight: COLORS.orange,
  inactive: COLORS.gray20,
  mainTitle: COLORS.gray,
  darkGray: COLORS.darkGray,
  success: COLORS.green,
  notice: COLORS.pink,
  box: COLORS.lighGray40,
  inactiveBox: COLORS.lighGray20,
  filters: COLORS.lighGray30,
  infoBox: COLORS.lighGray50,
  bgBox: COLORS.lighGray60,
  error: COLORS.red,
  violet: COLORS.violet,
  transparentGray5: COLORS.transparentGray5,
  transparentGray10: COLORS.transparentGray10,
  transparentGray20: COLORS.transparentGray20,
  transparentGray30: COLORS.transparentGray30,
  transparentGray40: COLORS.transparentGray40,
  transparentWhite10: COLORS.transparentWhite10,
  transparentWhite40: COLORS.transparentWhite40,
};

const stateColors = {
  suficiente: COLORS.green,
  insuficiente: COLORS.yellow,
  noExiste: COLORS.red,
};

const config = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Mono"', "sans-serif"],
        body: ['"Work Sans"'],
      },
      fontSize: {
        xxs: "8px",
        "4xl": ["2.25rem", "4rem"],
        "5xl": ["3rem", "5rem"],
      },
      lineHeight: {
        11: "3rem",
        12: "5.5rem",
      },
      height: {
        100: "30rem",
        110: "31rem",
        120: "42rem",
      },
      width: {
        overflow110: "110%",
      },
      maxHeight: {
        128: "32rem",
      },
    },
    colors: { ...uiColors, ...stateColors },
  },

  plugins: [require("flowbite/plugin")],
  darkMode: "class",
};

module.exports = config;
