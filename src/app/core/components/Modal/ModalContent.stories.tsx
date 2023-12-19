import type { Meta, StoryObj } from "@storybook/react";
import {
  Root as DialogPrimitiveRoot,
  Portal as DialogPrimitivePortal,
  Overlay as DialogPrimitiveOverlay,
  Trigger as DialogPrimitiveTrigger,
  Content as DialogPrimitiveContent,
  Close as DialogPrimitiveClose,
} from "@radix-ui/react-dialog";

import { BakeModal } from "./BakeModal";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/Modal",
  component: BakeModal,
  decorators: [
    (Story) => (
      <DialogPrimitiveRoot defaultOpen={true}>
        <DialogPrimitivePortal>
          <Story />
        </DialogPrimitivePortal>
      </DialogPrimitiveRoot>
    ),
  ],
} satisfies Meta<typeof BakeModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const MOCK_HASH =
  "0x63b423c9935d33158a54a13dc6e3e0c877adf6255815bf0fe586cf6487ad0ffe";

export const BakingWalletOpen: Story = {
  args: {
    transaction: { id: "1234567", status: "PREPARED", value: "20000.345635" },
  },
};

export const BakingTransactionPending: Story = {
  args: {
    transaction: {
      id: "1234567",
      status: "PENDING",
      value: "20000.345635",
      hash: MOCK_HASH,
    },
  },
};

export const BakingTransactionSuccess: Story = {
  args: {
    transaction: {
      id: "1234567",
      status: "SUCCESS",
      value: "20000.345635",
      hash: MOCK_HASH,
    },
  },
};

export const BakingTransactionReverted: Story = {
  args: {
    transaction: {
      id: "1234567",
      status: "REVERTED",
      value: "20000.345635",
      hash: MOCK_HASH,
    },
  },
};
