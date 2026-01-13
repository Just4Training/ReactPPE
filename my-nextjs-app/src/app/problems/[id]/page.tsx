'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Editor from '@monaco-editor/react';
import { Problem } from "@/types/Problem";

export default function ProblemDetailPage() {
  const { id } = useParams();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState('// Write your solution here');
  const [loading, setLoading] = useState(true);
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchProblem = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/problems/${id}`);
        const data = await res.json();
        setProblem(data.problem);
      } catch (err) {
        console.error('Error loading problem:', err);
      } finally {
        setLoading(false);
      }
    };
    
   fetchProblem();

   console.log('Fetch Problem:', problem);
  }, [id]);

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/problems/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          problemId: id,
          code,
        }),
      });

      const result = await res.json();
      setOutput(result.output || 'Submission complete.');
    } catch (err) {
      setOutput('Error submitting code.');
    }
  };

  if (loading) return <p className="p-4">Loading problem...</p>;
  if (!problem) return <p className="p-4 text-red-600">Problem not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{problem.title}</h1>
      <p className="mb-6 whitespace-pre-line text-gray-700">{problem.description}</p>

      <Editor
        height="300px"
        defaultLanguage="javascript"
        defaultValue={code}
        onChange={(value) => setCode(value || '')}
        theme="vs-dark"
      />

      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>

      {output && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <strong>Output:</strong>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
}