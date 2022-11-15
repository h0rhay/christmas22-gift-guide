const theme = {
  breakpoints: {
    small: "@media (max-width: 36rem)",
    medium: "@media (min-width: 36.01rem)",
    large: "@media (min-width: 60rem)",
  },
  colors: {
    text: {
      surface: "#212121",
      interface: "#FFFFFF",
      disabled: "rgba(0, 0, 0, 0.3)",
    },
    background: "#ffffff",
    primary: "#ffe256",
    primaryDark: "#545454",
    primaryLight: "#f0ede6",
    warn: "orange",
    error: "#FF0000",
    success: "#00FF00",
  },
  fontFamily: { primary: '"Avalon", sans-serif' },
  fontWeight: { light: 300, regular: 400, medium: 500, bold: 700 },
  fontSize: { small: "1rem", medium: "1.25rem", large: "1.5rem" },
  headingFontSize: {
    small: "clamp(1.424rem, 1.75vw, 2.8rem)",
    medium: "clamp(1.602rem, 2vw, 3.2rem)",
    large: "clamp(1.802rem, 2.25vw, 3.6rem)",
  },
  lineHeight: { small: "1.2", medium: "1.6", large: "2" },
  letterSpacing: { small: "1px", medium: "2px", large: "3px" },
  fontStyle: { normal: "normal", italic: "italic" },
};

export default theme;
