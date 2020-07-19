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
      colors: {
        // primary:
        // - black and white
        ink: "#191818",
        cloud: "#F2F2F2",
        coconut: "#FEFEFE",
        // - reds and pinks
        cardinal: {
          default: "#E71F54",
          darker: "#CD1647",
          darkest: "#B81442"
        },
        blush: "#F28599",
        puff: "#FDEDF2",
        // - blues
        cobalt: {
          default: "#1A73E8",
          darker: "#1260BA",
          darkest: "#1054A3"
        },
        peppermint: "#F3F8FE",
        // - green
        parakeet: "#1EC69C",
        // secondary:
        clover: "#20C882",
        monarch: "#FA6400",
        proton: "#7451F0",
        butterscotch: "#F7B500",
        lapis: "#0080FF",
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
        body: {
          color: config("theme.colors.ink"),
          backgroundColor: config("theme.colors.coconut")
        },
        "@screen dark": {
          body: {
            color: config("theme.colors.cocount"),
            backgroundColor: config("theme.colors.ink")
          }
        }
      });
    }
  ],
}
