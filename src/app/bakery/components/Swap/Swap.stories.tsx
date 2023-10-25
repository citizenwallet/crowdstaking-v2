import type { Meta, StoryObj } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

import { Swap } from "../Swap";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/Swap",
  component: Swap,
  decorators: [
    (Story) => (
      <div className="h-full w-screen bg-breadgray-grey100">
        <Story />
      </div>
    ),
  ],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
    // viewports: INITIAL_VIEWPORTS,
    // //👇 Your own default viewport
    // defaultViewport
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  //   argTypes: {
  //     backgroundColor: { control: "color" },
  //   },
} satisfies Meta<typeof Swap>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    user: {
      status: "CONNECTED",
      address: "0x34897593875vn9384",
    },
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
