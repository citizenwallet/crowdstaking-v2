import { type Preview } from "@storybook/react";

import "@/app/core/components/Fonts";
import "@/app/app.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <>
        {/* Hack required to be able to apply fonts in storybook */}
        <style>
          {`:root {
            --font-redhat: "Red Hat Text";
            --font-pressstart: "Press Start 2P"
          }`}
        </style>
        <Story />
      </>
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
