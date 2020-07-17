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
          default: "#E72054",
          darker: "#CB1646",
          darkest: "#AF133C"
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
        parakeet: "#1EC69B",
        // secondary:
        clover: "#1FC882",
        monarch: "#FA6401",
        proton: "#7452F0",
        butterscotch: "#F8B500",
        lapis: "#0080FF",
        salamander: "#FF4401",
        royal: "#7800F4",
        bubblegum: "#FF14B0",
        aqua: "#00DFEB"
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
            color: config("theme.colors.cloud"),
            backgroundColor: config("theme.colors.ink")
          }
        }
      });
    }
  ],
}
