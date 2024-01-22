# Crowdstaking Application

Install dependencies with pnpm

```sh
pnpm i
```

Start a hardhat node

```sh
pnpm hardhat:node
```

Run dev server

```sh
pnpm run dev
```

## E2E Tests with Synpress

Stop any hardhat node you may have running and start a fresh one

```sh
pnpm hardhat:node
```

In a second terminal window run the test build/serve script:

```sh
pnpm test:serve
```

In a third terminal window run the e2e test script

```sh
pnpm test:e2e
```
