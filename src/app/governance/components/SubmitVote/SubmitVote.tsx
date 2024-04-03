import { TUserConnected } from "@/app/core/hooks/useConnectedUser";
import { useMutation, useQueryClient } from "react-query";
import { ProjectAPI } from "../ProjectPanel";

export function SubmitVote({
  user,
  projects,
}: {
  user: TUserConnected;
  projects: ProjectAPI[];
}) {
  const queryClient = useQueryClient();
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
            votes: projects.map((project) => ({
              userAddress: user.address,
              projectAddress: project.wallet_address,
              value: project.value || 0,
            })),
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
