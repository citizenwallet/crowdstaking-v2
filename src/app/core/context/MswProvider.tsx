"use client";

import { Suspense, use } from "react";

const mockingEnabledPromise =
  process.env.NODE_ENV === "development" && typeof window !== "undefined"
    ? import("@/mocks/browser").then(async ({ worker }) => {
        await worker.start({
          quiet: true,
          onUnhandledRequest(request, print) {
            return;
            if (
              request.url.includes("_next") ||
              request.url.includes("eth-mainnet") ||
              request.url.includes("walletconnect")
            ) {
              return;
            }
            print.warning();
          },
        });
      })
    : Promise.resolve();

export function MSWProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // If MSW is enabled, we need to wait for the worker to start,
  // so we wrap the children in a Suspense boundary until it's ready.
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  );
}

function MSWProviderWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  use(mockingEnabledPromise);
  return children;
}
