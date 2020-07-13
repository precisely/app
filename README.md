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
