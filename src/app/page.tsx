"use client";
import Swap from "./bakery/components";
import FAQ from "./bakery/components/FAQ";

export default function Home() {
  return (
    <main className="grow">
      <div className="py-16 ">
        <h1 className="text-3xl text-center font-pressstart uppercase leading-tight">
          Bread
        </h1>
        <h2 className="text-center uppercase text-xl tracking-widest">
          crowdstaking
        </h2>
      </div>
      <Swap />
      <FAQ />
    </main>
  );
}
