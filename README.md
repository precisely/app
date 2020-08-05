# Precisely Front-End Code

This repository houses the Precisely front-end code.


## Installation

This project requires Node, NPM, and Yarn. For development, using [NVM](https://github.com/nvm-sh/nvm) to deal with Node installation is recommended. Optionally, [direnv](https://direnv.net) can help manage the environment as well.

Once Node installed, install Yarn globally:

```
npm install -g yarn
```

(Run the same command whenever `yarn` complains about an old version.)


## Configuration

Make a personal `.env` file using `.env.sample` as a template.


## Development

- Install dependencies: `yarn install`
- Run development server: `yarn dev`

We use [Parcel](https://parceljs.org/) as our front-end application bundler. Think of it as webpack with the defaults most people need. Unfortunately, like every other front-end bundler, it can get in trouble when its configuration changes but it retains a stale cache of something it failed to invalidate. So restarting it can sometimes help, as will occasionally blowing away its cache and build artifacts (remove the `.cache` and `dist` directories from the project root).


## Style

Follow these guidelines:

- Use TypeScript whenever possible.
- Dependencies are bad. Only introduce a new dependency when it will truly add value. 10-line JavaScript libraries on NPM which download half the Internet because they themselves have a dozen dependencies should _not_ be included.
- Use modern React. Use function components; avoid class components. Use hooks.
- Let's not introduce Redux into this unless we absolutely have to.
- Embrace Tailwind for styling.
- Do not break dark mode. Do not break the app for common screen sizes.
