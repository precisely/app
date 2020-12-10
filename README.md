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

## Browser Cache Problems
We use [Parcel](https://parceljs.org/) as our front-end application bundler. Think of it as webpack with the defaults most people need. Unfortunately, like every other front-end bundler, it can get in trouble when its configuration changes but it retains a stale cache of something it failed to invalidate. So restarting it can sometimes help, as will occasionally blowing away its cache and build artifacts (remove the `.cache` and `dist` directories from the project root).

## Disabling Dark Mode

Set the DISABLE_DARK_MODE variable in .env to `true` or `1` and delete `.cache`.

## Style

Follow these guidelines:

- Use TypeScript whenever possible.
- Dependencies are bad. Only introduce a new dependency when it will truly add value. 10-line JavaScript libraries on NPM which download half the Internet because they themselves have a dozen dependencies should _not_ be included.
- Use modern React. Use function components; avoid class components. Use hooks.
- Let's not introduce Redux into this unless we absolutely have to.
- Embrace Tailwind for styling.
- Do not break dark mode. Do not break the app for common screen sizes.


## Tests

- Jest is the test runner.
- [React Testing Library](https://github.com/testing-library/react-testing-library) is the React testing renderer.
- An attempt was made to use [Mock Service Worker](https://github.com/mswjs/msw), but as of 2020-09, its TypeScript wrappers did not support adjusting response headers, which made JSW authentication impossible to emulate. Consequently, `fetch` mocks use Jest facilities.


## Deployment

The app is currently deployed in Heroku using [`serve`](https://github.com/vercel/serve). A Heroku environment requires:

- environment variable `BACKEND_URL`

Note that changing Heroku environment variables requires a rebuild and redeployment (since these variables are baked into the static files):

```
git commit --allow-empty -m "temporary commit"
git push heroku master
git reset 'HEAD~'
git push -f heroku master
```

For the same reason, Heroku pipelines _cannot_ be used! Since pipelines use the same slug, copying from staging to production will copy the wrong baked-in environment variables.
