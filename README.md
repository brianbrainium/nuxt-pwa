# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

Install these dependencies before running `npm test` or `npm run build`.

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


## Tests

Ensure the development dependencies are installed (see [Setup](#setup)). Then run the test suite with:

```bash
# npm
npm test

# pnpm
pnpm test
```

This runs the Vitest tests located in the `tests/` directory.

## PDF Splitting

This project uses [`pdf-lib`](https://github.com/Hopding/pdf-lib) to split PDF files in the browser.

1. **Upload a PDF** – Drag a file onto the drop zone on the home page or use the upload page to choose a PDF from your device.
2. **Choose how to split** – After uploading you can select individual pages or ranges to create multiple parts.
3. **Download the results** – Each generated part can be downloaded as its own PDF once the split is finished.

When building the application, `pdf-lib` is bundled with the rest of the Nuxt app. Run `npm run build` (or the equivalent `pnpm`, `yarn` or `bun` command) before deploying.

