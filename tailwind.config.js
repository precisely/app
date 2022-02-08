// -*- eval: (rainbow-mode 1) -*-

module.exports = {
  content: [
    "index.html",
    "assets/**/*",
    "src/**/*.html",
    "src/**/*.jsx",
    "src/**/*.tsx",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Ageo", "Helvetica", "Arial", "sans-serif"],
      },
      fontSize: {
        "3xs": ".5rem",
        "2xs": ".6rem",
        "7xl": "5rem",
      },
      colors: {
        // primary:
        // - black and white
        ink: "#191818",
        lightgrey: "#EAEAEA",
        grey: "#8D8D8D",
        cloud: "#F2F2F2",
        coconut: "#FEFEFE",
        // - reds and pinks
        brick: "#D43857",
        cardinal: "#E71F54",
        blush: "#F28599",
        puff: "#FDEDF2",
        // - blues
        cobalt: "#1A73E8",
        peppermint: "#F3F8FE",
        // - green
        parakeet: "#1EC69C",
        // secondary:
        clover: "#20C882",
        monarch: "#FA6400", // warning messages
        flame: "#E74C3C", // error messages
        proton: "#7451F0",
        butterscotch: "#F7B500",
        lapis: "#0080FF", // info messages
        salamander: "#FF4400",
        royal: "#7700F4",
        bubblegum: "#FF14B0",
        aqua: "#00DFEC",
      },
    },
  },
};
