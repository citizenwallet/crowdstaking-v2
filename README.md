# Crowdstaking Application

Install dependencies with pnpm

```sh
pnpm i
```

Start an anvil node

```sh
$ anvil --fork-url https://rpc.gnosis.gateway.fm --chain-id 31337 --block-time 1
```

Run dev server

```sh
pnpm run dev
```

/\*
2b21828ccd20d6bd2e554cd96df03ba0f779755e8e4014d7f614dac144a27fe0

cast s 0x689666145B8E80F705B87f4e4190820D9A4C1646 "function mint(address,uint256)" `cast wallet address $TEST_PK_2` 1000000000000000000 --private-key $TEST_PK_2 --rpc-url $RPC_URL
\*/
