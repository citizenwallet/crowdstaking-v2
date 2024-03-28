import { useEffect, useMemo, useState } from "react";
import { memberProjects } from "../projectData";
import { ProjectRow } from "./ProjectRow";
import { useQuery } from "react-query";

type ProjectAPI = {
  id: string;
  name: string;
  value: number | null;
};

type VoteAPI = {
  id: string;
  project_id: string;
  value: number;
  user_id: string;
};
export function ProjectPanel() {
  // const [pointsRemaining, setPointsRemaining] = useState(100);
  const [projects, setProjects] = useState<ProjectAPI[]>([]);

  const { data, error, isLoading } = useQuery<ProjectAPI[]>(
    "memberProjects",

    async () => {
      const res = await fetch("http://localhost:8000/v1/projects");
      return res.json();
    },
    {
      refetchInterval: 1000,
    }
  );

  useEffect(() => {
    if (data) {
      setProjects(data);
    }
  }, [data, error]);

  function updateValue(value: number | null, id: string) {
    const newProjects = projects.map((project) => {
      if (project.id === id) {
        return { ...project, value };
      }
      return project;
    });
    setProjects(newProjects);
  }

  const pointsRemaining = projects.reduce((acc, project) => {
    return acc - (project.value || 0);
  }, 100);

  return (
    <div className="min-h-screen grid grid-cols-12 p-4 md:p-8 gap-4">
      <div className="col-span-12 md:col-span-8">
        <div className="grid grid-cols-1 gap-4">
          {projects.length === 0 && !isLoading && <div>no projects</div>}
          {projects.length > 0 &&
            projects.map((project) => (
              <ProjectRow
                key={project.id}
                id={project.id}
                name={project.name}
                value={project.value}
                updateValue={updateValue}
                pointsRemaining={pointsRemaining}
              />
            ))}
          <div>
            {pointsRemaining === 0 ? (
              <button className="w-full bg-pink-500 text-white px-3 py-2 border-2 border-neutral-400 rounded text-center font-bold">
                Go
              </button>
            ) : pointsRemaining < 0 ? (
              <div className="bg-red-500 text-white px-3 py-2 border-2 border-neutral-400 rounded text-center font-bold">
                ERRR
              </div>
            ) : (
              <div className="px-3 py-2 border-2 border-neutral-400 rounded text-center font-bold">
                Points remaining to distribute: {pointsRemaining}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-4 p-4">
        <VotesPanel />
      </div>
    </div>
  );
}

function VotesPanel() {
  const { data, error, isLoading } = useQuery<VoteAPI[]>(
    "votes",
    async () => {
      const res = await fetch("http://localhost:8000/v1/votes");
      return res.json();
    },
    {
      refetchInterval: 1000,
    }
  );

  console.log("votes res", { error, data });

  const totals = useMemo(() => {
    return data?.reduce(
      (acc, vote) => {
        console.log("\n\n-----", { vote });
        acc[vote.project_id] =
          acc[vote["project_id"]] + vote.value || vote.value;
        acc.count += 1;
        return acc;
      },
      { count: 0 } as Record<string, number>
    );
  }, [data]);

  return (
    <div>
      votes!!
      <pre>{totals && JSON.stringify(totals, null, 2)}</pre>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
