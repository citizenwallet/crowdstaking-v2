import type { Meta, StoryObj } from "@storybook/react";

import { Toast, ToastContainer } from "./Toast";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Toast",
  component: Toast,
  decorators: [
    (Story) => (
      <ToastContainer>
        <Story />
      </ToastContainer>
    ),
  ],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

const MOCK_URL =
  "https://gnosisscan.io/tx/0x76182105812f9ed552415a8a493584f439765366defaa0b53af6d33e6e4bbc79";

export const TransactionSubmitted: Story = {
  args: {
    toastType: "SUBMITTED",
    explorerUrl: MOCK_URL,
  },
};

export const TransactionConfirmed: Story = {
  args: {
    toastType: "CONFIRMED",
    explorerUrl: MOCK_URL,
  },
};

export const TransactionReverted: Story = {
  args: {
    toastType: "REVERTED",
    explorerUrl: MOCK_URL,
  },
};
