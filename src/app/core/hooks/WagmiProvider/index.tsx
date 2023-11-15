import createWagmiProvider from "./createWagmiProvider";

import * as testConfig from "./config/testConfig";
import * as storybookConfig from "./config/storybookConfig";

export const WagmiProvider = createWagmiProvider(testConfig);
export const WagmiProviderStorybook = createWagmiProvider(storybookConfig);
