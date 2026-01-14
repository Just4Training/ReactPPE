import Link from 'next/link';
import { Problem } from '@/types/Problem'

export default function ProblemItem({ problem }: { problem: Problem }) {
  return (
    <li className="p-4 border rounded hover:bg-gray-100 transition">
      <Link href={`/problems/${problem.id}`}>
        <div className="flex justify-between">
          <span className="font-medium">{problem.title}</span>
          <span className="text-sm text-gray-600">{problem.difficulty}</span>
        </div>
      </Link>
    </li>
    );
}