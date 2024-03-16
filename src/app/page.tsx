// "use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Toaster } from "./core/components/Toaster/Toaster";
import { AppTitle } from "./bakery/components/AppTitle";
import { type Metadata } from "next";

const Swap = dynamic(() => import("./bakery/components/Swap/Swap"), {
  ssr: false,
});

const FAQ = dynamic(() => import("./bakery/components/FAQ/FAQ"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Bread Crowdstaking",
  description: "Bake and burn BREAD. Fund post-capitalist web3.",
};

export default function Home() {
  return (
    <main className="grow relative">
      <Toaster />
      <AppTitle />
      <div className="h-[30rem] sm:h-[42rem]">
        <Suspense>
          <Swap />
        </Suspense>
      </div>
      <Suspense>
        <FAQ />
      </Suspense>
    </main>
  );
}
