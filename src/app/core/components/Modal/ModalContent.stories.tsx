import type { Meta, StoryObj } from "@storybook/react";

import { ModalContent } from "./Modal";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/Modal",
  component: ModalContent,
  decorators: [
    (Story) => (
      <div className="h-[40rem] w-full bg-breadgray-grey100">
        <Story />
      </div>
    ),
  ],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  // tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  //   argTypes: {
  //     backgroundColor: { control: "color" },
  //   },
} satisfies Meta<typeof ModalContent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Connecting: Story = {
  args: {
    modal: { type: "CONNECT_WALLET", status: "LOCKED" },
    txState: null,
  },
};

export const ApproveContractLocked: Story = {
  args: {
    modal: { type: "APPROVAL", status: "LOCKED" },
    txState: null,
  },
};

export const ApproveContractPending: Story = {
  args: {
    modal: { type: "APPROVAL", status: "LOCKED" },
    txState: {
      status: "PENDING",
      hash: "0x89n3075438n9v724890n7v298",
    },
  },
};

export const ApproveContractComplete: Story = {
  args: {
    modal: { type: "APPROVAL", status: "LOCKED" },
    txState: {
      status: "COMPLETE",
      hash: "0x89n3075438n9v724890n7v298",
    },
  },
};

export const BakingLocked: Story = {
  args: {
    modal: { type: "BAKING", amount: "300", status: "LOCKED" },
    txState: null,
  },
};

export const BakingPending: Story = {
  args: {
    modal: { type: "BAKING", amount: "300", status: "UNLOCKED" },
    txState: {
      status: "PENDING",
      hash: "0x89n3075438n9v724890n7v298",
    },
  },
};

export const BakingComplete: Story = {
  args: {
    modal: { type: "BAKING", amount: "300", status: "UNLOCKED" },
    txState: {
      status: "COMPLETE",
      hash: "0x89n3075438n9v724890n7v298",
    },
  },
};

export const BurningLocked: Story = {
  args: {
    modal: { type: "BURNING", amount: "300", status: "LOCKED" },
    txState: null,
  },
};

export const BuringPending: Story = {
  args: {
    modal: { type: "BURNING", amount: "300", status: "UNLOCKED" },
    txState: {
      status: "PENDING",
      hash: "0x89n3075438n9v724890n7v298",
    },
  },
};

export const BurningComplete: Story = {
  args: {
    modal: { type: "BURNING", amount: "300", status: "UNLOCKED" },
    txState: {
      status: "COMPLETE",
      hash: "0x89n3075438n9v724890n7v298",
    },
  },
};
