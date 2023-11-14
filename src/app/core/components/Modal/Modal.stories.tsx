import type { Meta, StoryObj } from "@storybook/react";

import Modal, { ModalContent } from "./Modal";

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
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  //   argTypes: {
  //     backgroundColor: { control: "color" },
  //   },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Connecting: Story = {
  args: {
    type: "CONNECT_WALLET",
    title: "Connecting",
    status: "LOCKED",
  },
};

export const ApproveContract: Story = {
  args: {
    type: "APPROVAL",
    title: "Approve Contract",
    status: "LOCKED",
  },
};

export const BakingLocked: Story = {
  args: {
    type: "BAKING",
    title: "Baking Bread",
    amount: "300",
    status: "LOCKED",
  },
};

export const BakingUnlocked: Story = {
  args: {
    type: "BAKING",
    title: "Baking Bread",
    amount: "300",
    status: "UNLOCKED",
  },
};

export const Burning: Story = {
  args: {
    type: "BURNING",
    title: "Burning Bread",
    amount: "300",
    status: "LOCKED",
  },
};

export const BuringUnlocked: Story = {
  args: {
    type: "BURNING",
    title: "Burning Bread",
    amount: "300",
    status: "UNLOCKED",
  },
};

// export const Secondary: Story = {
//   args: {
//     variant: "regular",
//     children: "Click Me",
//   },
// };

// export const Large: Story = {
//   args: {
//     variant: "large",
//     children: "Click Me",
//   },
// };
