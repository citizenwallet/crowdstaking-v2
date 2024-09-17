import type { Meta, StoryObj } from "@storybook/react";
import { LPVotingPowerPage } from "./lp-vaults/LPVotingPowerPage";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Pages/LPVotingPower",
  component: LPVotingPowerPage,
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
  decorators: [
    (Story) => (
      <div className="bg-breadgray-grey100 min-h-screen text-breadgray-light-grey">
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LPVotingPowerPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  //   args: {
  //     size: "small",
  //     children: "Click Me",
  //   },
};
