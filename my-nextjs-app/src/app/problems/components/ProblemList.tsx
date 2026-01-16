import ProblemItem from "./ProblemItem";
import { Problem } from "@/types/Problem";

export default function ProblemList({ problems } : { problems: Problem[]}) {
  if(problems.length === 0) {
    return <p className="text-gray-500">No problems yet.</p>;
  }
  return (
    <ul className="space-y-4">
      {problems.map((problem) => (
        <ProblemItem key={problem.id} problem={problem} />
      ))}
    </ul>
  );
}