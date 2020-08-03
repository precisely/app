// -*- eval: (rainbow-mode 1) -*-

module.exports = {
  theme: {
    extend: {
      screens: {
        light: { raw: "(prefers-color-scheme: light)" },
        dark: { raw: "(prefers-color-scheme: dark)" }
      },
      fontFamily: {
        sans: ["Ageo", "Helvetica", "Arial", "sans-serif"]
      },
      fontSize: {
        "3xs": ".5rem",
        "2xs": ".6rem",
        "7xl": "5rem"
      },
      colors: {
        // primary:
        // - black and white
        ink: "#191818",
        grey: "#8D8D8D",
        cloud: "#F2F2F2",
        coconut: "#FEFEFE",
        // - reds and pinks
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
        flame: "#E74C3C",   // error messages
        proton: "#7451F0",
        butterscotch: "#F7B500",
        lapis: "#0080FF",   // info messages
        salamander: "#FF4400",
        royal: "#7700F4",
        bubblegum: "#FF14B0",
        aqua: "#00DFEC"
      },
    }
  },
  variants: {},
  plugins: [
    function({ addBase, config }) {
      addBase({
        "@media (prefers-color-scheme: light)": {
          body: {
            color: config("theme.colors.ink"),
            backgroundColor: config("theme.colors.coconut")
          },
        },
        "@media (prefers-color-scheme: dark)": {
          body: {
            color: config("theme.colors.coconut"),
            backgroundColor: config("theme.colors.ink")
          }
        }
      });
    }
  ],
}
