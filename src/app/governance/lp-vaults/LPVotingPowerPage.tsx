"use client";
import { PageGrid } from "../components/PageGrid";
import { VaultPanel } from "./components/VaultPanel";
import { VotingPowerPanel } from "./components/VotingPowerPanel";

export function LPVotingPowerPage() {
  return (
    <div>
      <div className="grow w-full max-w-[44rem] lg:max-w-[67rem] m-auto pb-16 lg:px-8">
        <PageGrid>
          <div className="col-span-8">
            <TitleSection />
          </div>
          <div className="col-span-4">
            <VotingPowerPanel />
          </div>
          <div className="col-span-12">
            <VaultPanel />
          </div>
        </PageGrid>
      </div>
    </div>
  );
}

function TitleSection() {
  return (
    <div>
      <h1>Voting Power LP Vaults</h1>
      <p>
        Lock your LP tokens in the vault(s) below to receive voting power and
        participate in Breadchain Cooperative governance voting cycles. When
        locking your LP tokens you receive voting power for the next voting
        cycle.
      </p>
    </div>
  );
}
