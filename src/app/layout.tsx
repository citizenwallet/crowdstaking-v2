import clsx from "clsx";

import { pressStart, redhat } from "@/app/core/components/Fonts";
import { AppProvider } from "./core/hooks/AppProvider";

import "./app.css";
import "@rainbow-me/rainbowkit/styles.css";
import { DevTools } from "./core/components/Devtools/DevTools";
import { Toaster } from "./core/components/Toaster/Toaster";

function parseFeatureVar(feature: string | undefined): boolean {
  return feature === "true" ? true : false;
}

const features = {
  governancePage: parseFeatureVar(process.env.FEATURE_GOVERNANCE),
  breadCounter: parseFeatureVar(process.env.FEATURE_BREAD_COUNTER),
};

export type Features = {
  [K in keyof typeof features]: boolean;
};

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <body
        className={clsx(
          "relative bg-[#F0F0F0] dark:bg-breadgray-grey100 dark:text-breadgray-white",
          pressStart.variable,
          redhat.variable
        )}
      >
        <AppProvider features={features}>{children}</AppProvider>
        {/* {process.env.ADMIN_WALLET && <DevTools />} */}
      </body>
    </html>
  );
}
