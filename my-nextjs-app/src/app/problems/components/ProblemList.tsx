import ProblemItem from "./ProblemItem";
import { Problem } from "@/types/Problem";

export default function ProblemList({ problems } : { problems: Problem[]}) {
  return (
    <ul className="space-y-4">
      {problems.map((problem) => (
        <ProblemItem key={problem.id} problem={problem} />
      ))}
    </ul>
  );
}