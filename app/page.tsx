import { RandomJoke } from "@/components/RandomJoke";
import { JokeSubmissionForm } from "@/components/JokeSubmissionForm";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Jokes Platform</h1>

      <div className="grid gap-12">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Random Joke</h2>
          <RandomJoke />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Submit a Joke</h2>
          <JokeSubmissionForm />
        </section>
      </div>
    </main>
  );
}
