import { type Preview } from "@storybook/react";

import { Providers } from "../src/app/core/util";

import "@/app/core/components/Fonts";

const preview: Preview = {
  decorators: [
    (Story) => (
      <Providers>
        {/* Hack required to be able to apply fonts in storybook */}
        <style>
          {`:root {
            --font-redhat: "Red Hat Text";
            --font-pressstart: "Press Start 2P"
          }`}
        </style>
        <Story />
      </Providers>
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
