"use client";
import Swap from "./bakery/components";
import FAQ from "./bakery/components/FAQ";

export default function Home() {
  return (
    <main className="grow">
      <h1 className="py-16 text-3xl text-center font-pressstart uppercase leading-tight">
        Bread
      </h1>
      <Swap />
      <FAQ />
    </main>
  );
}
