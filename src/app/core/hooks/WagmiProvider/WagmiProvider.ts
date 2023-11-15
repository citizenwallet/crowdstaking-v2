import createWagmiProvider from "./createWagmiProvider";
import * as testConfig from "./config/testConfig";

export const WagmiProvider = createWagmiProvider(testConfig);
