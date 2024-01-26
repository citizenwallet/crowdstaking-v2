import type { Meta, StoryObj } from "@storybook/react";

import { WalletMenuContent } from "./WalletMenuContent";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "WalletMenu",
  component: WalletMenuContent,
  decorators: [
    (Story) => (
      <div className="flex items-end">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WalletMenuContent>;

export default meta;
type Story = StoryObj<typeof meta>;

const MOCK_HASH =
  "0x63b423c9935d33158a54a13dc6e3e0c877adf6255815bf0fe586cf6487ad0ffe";

export const DesktopWalletMenu: Story = {
  args: {
    accountAddress: "0x3095v43098509438vm0",
    handleDisconnect: () => {},
  },
};
