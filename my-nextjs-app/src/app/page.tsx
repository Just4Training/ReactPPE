import Carousel from "./components/Carousel";

export default function Home() {
    return (
    <main className="min-h-screen bg-white">
      <Carousel />
      <div className="p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Carousel Homepage</h1>
        <p className="text-gray-600">Tailwind + Next.js + Framer Motion</p>
      </div>
            <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-100 rounded-xl shadow p-6 flex flex-col items-start">
            <h3 className="text-xl font-semibold mb-2">Algorithms & Data Structure</h3>
            <p className="text-gray-600 mb-4">
              All about algorithms and data structure. Support multi programming languages.
            </p>
            <a href="/problems" className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Learn More
            </a>
          </div>

          <div className="bg-gray-100 rounded-xl shadow p-6 flex flex-col items-start">
            <h3 className="text-xl font-semibold mb-2">Feature Two</h3>
            <p className="text-gray-600 mb-4">
              Another important feature that helps your users get things done.
            </p>
            <button className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Learn More
            </button>
          </div>

          <div className="bg-gray-100 rounded-xl shadow p-6 flex flex-col items-start">
            <h3 className="text-xl font-semibold mb-2">Feature Three</h3>
            <p className="text-gray-600 mb-4">
              Final highlight with great benefits and user engagement.
            </p>
            <button className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
