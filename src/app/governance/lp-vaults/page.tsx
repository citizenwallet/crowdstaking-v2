import { Metadata } from "next";
import { LPVotingPowerPage } from "./LPVotingPowerPage";

export const metadata: Metadata = {
  title: "Bread Governance",
  description: "Bake and burn BREAD. Fund post-capitalist web3.",
};

export default function LPVotingPower() {
  return <LPVotingPowerPage />;
}
