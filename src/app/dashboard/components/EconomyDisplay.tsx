import clsx from "clsx";

import { WRAPPER_CLASSES } from "@/app/core/util/classes";
import useWeeklyBread from "../hooks/useWeeklyBread";
import AAVE from "./AAVE";
import Arrakis from "./Arrakis";
import BreadChart from "./BreadChart";
import Yield from "./Yield/Yield";
import type { ReactNode } from "react";
import Guild from "./Guild";

export default function EconomyDisplay() {
  const { data: weeklyData } = useWeeklyBread();

  return (
    <div className={clsx(WRAPPER_CLASSES)}>
      <section
        className={clsx(
          "px-6 md:px-12 py-6 bg-breadgray-burnt rounded-xl border border-breadgray-toast"
        )}
      >
        <section className="flex flex-row justify-between gap-4 pb-8">
          <h2 className="font-bold text-xl tracking-wide">
            The $BREAD economy
          </h2>
          <figure>
            <span className="font-bold uppercase">1 bread = 1,01 usd</span>
          </figure>
        </section>

        <div className="m-auto w-full max-w-xl flex flex-col gap-4">
          <div className="h-[350px]">
            {weeklyData && <BreadChart chartData={weeklyData} />}
          </div>
          <Yield />
          <DashboardGroup>
            <Arrakis />
            <div className="py-2">
              <div className="w-0.5 h-full bg-breadgray-grey"></div>
            </div>
            <AAVE />
          </DashboardGroup>
          {/* <Guild /> */}
        </div>
      </section>
    </div>
  );
}

function DashboardGroup({ children }: { children: ReactNode }) {
  return (
    <section className="border border-breadgray-grey rounded-lg p-4 flex">
      {children}
    </section>
  );
}
