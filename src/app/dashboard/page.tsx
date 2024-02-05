"use client";
// import EconomyDisplay from "./components/EconomyDisplay";
// import UserDisplay from "./components/UserDisplay";
// import SubgraphProvider from "./hooks/SubgraphProvider";

export default function Dashboard() {
  return (
    <div>
      <button
        onClick={() => {
          throw new Error("clicky error");
        }}
      >
        clicky
      </button>
    </div>
    // <SubgraphProvider>
    //   <main className="grow">
    //     <EconomyDisplay />
    //     <UserDisplay />
    //   </main>
    // </SubgraphProvider>
  );
}
