import type { Meta, StoryObj } from "@storybook/react";

import Modal from "./Modal";
import { ModalProvider } from "../../hooks/useModal";
import { TransactionDisplayProvider } from "../../hooks/useTransactionDisplay";
import WagmiProvider from "../../hooks/WagmiProvider";
import { ConnectedUserProvider } from "../../hooks/useConnectedUser";
import { ToastProvider } from "../../hooks/useToast";
import { Providers } from "../../util";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/Modal",
  component: Modal,
  decorators: [
    (Story) => (
      <div className="h-screen w-screen">
        <Story />
      </div>
    ),
  ],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
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
export const Primary: Story = {
  args: {
    type: "APPROVAL",
    title: "Approve Contract",
    status: "LOCKED",
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
