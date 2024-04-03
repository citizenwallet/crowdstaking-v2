import { TUserConnected } from "@/app/core/hooks/useConnectedUser";
import { useMutation, useQueryClient } from "react-query";
import { ProjectAPI } from "../ProjectPanel";
import { useMemo } from "react";

export function SubmitVote({
  user,
  projects,
  total,
}: {
  user: TUserConnected;
  projects: ProjectAPI[];
  total: number;
}) {
  const queryClient = useQueryClient();

  const votes = useMemo(() => {
    if (!projects.length) return [];
    let percentageLeft = 100;
    const votes = projects.map((project) => {
      const value = project.value || (0 / total) * 100;
      percentageLeft -= value;
      return {
        userAddress: user.address,
        projectAddress: project.wallet_address,
        value,
      };
    });

    if (percentageLeft < 0)
      throw new Error("something went wrong calculating vote percentages");
    console.log("\n\nvotes");
    console.log({ votes });
    if (percentageLeft > 0) votes[votes.length - 1].value += percentageLeft;
    return votes;
  }, [projects, user, total]);

  const mutation = useMutation(
    "submitVote",
    async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BREAD_API_URL}/votes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Address ${user.address}`,
          },
          body: JSON.stringify({
            votes,
          }),
        }
      );
      return res.json();
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("votes");
      },
    }
  );

  // useEffect(() => {
  //   if (data) console.log("dataaaaa:    ", { data });
  // }, [data]);

  return (
    <button
      onClick={() => {
        console.log("submitting vote");
        mutation.mutate();
      }}
      className="w-full bg-pink-500 text-white px-3 py-2 border-2 border-neutral-400 rounded text-center font-bold"
    >
      Submit Vote
    </button>
  );
}
