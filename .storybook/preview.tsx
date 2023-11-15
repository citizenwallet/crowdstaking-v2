import { type Preview } from "@storybook/react";

import "@/app/core/components/Fonts";
import { WagmiProviderStorybook } from "@/app/core/hooks/WagmiProvider/WagmiProviderStorybook";
import { ModalProvider } from "@/app/core/hooks/useModal";
import { TransactionDisplayProvider } from "@/app/core/hooks/useTransactionDisplay";
import { ToastProvider } from "@/app/core/hooks/useToast";

const preview: Preview = {
  decorators: [
    (Story) => (
      <WagmiProviderStorybook>
        <ModalProvider>
          <TransactionDisplayProvider>
            <ToastProvider>
              {/* Hack required to be able to apply fonts in storybook */}
              <style>
                {`:root {
            --font-redhat: "Red Hat Text";
            --font-pressstart: "Press Start 2P"
          }`}
              </style>
              <Story />
            </ToastProvider>
          </TransactionDisplayProvider>
        </ModalProvider>
      </WagmiProviderStorybook>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
