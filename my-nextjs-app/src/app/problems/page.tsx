import ProblemList from './components/ProblemList';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function getProblems() {
  try{
    const res = await fetch(`${apiUrl}/problems`, {
      cache: 'no-store', // Optional: disables caching
    });
    if (!res.ok) {
      throw new Error('Failed to fetch problems');
    }
    const data = await res.json();
    return data.problems;
  } catch (err) {
    console.log(err);
  }
}

export default async function HomePage() {
  const problems = await getProblems();

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Problem List</h1>
      <ProblemList problems={problems} />
    </main>
  );
}