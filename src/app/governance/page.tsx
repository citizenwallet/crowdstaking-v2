"use client";
import { useRouter } from "next/navigation";
import { useConnectedUser } from "../core/hooks/useConnectedUser";
import { useEffect } from "react";

export default function Governance() {
  const router = useRouter();
  const {
    user: { features },
  } = useConnectedUser();
  useEffect(() => {
    console.log({ features });
    if (!features.governancePage) {
      router.push("/");
    }
  }, [features, router]);

  return (
    <section className="grow">
      {features.governancePage ? "Governance Yay" : null}
    </section>
  );
}
