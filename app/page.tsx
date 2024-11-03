"use client";
import { useRouter } from "next/navigation";
import { RandomJoke } from "@/components/RandomJoke";
import { JokeSubmissionForm } from "@/components/JokeSubmissionForm";
import { Button } from "@/components/ui/button"; // Assuming you have a reusable Button component

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold text-center">Jokes Platform</h1>
        <Button onClick={handleLogin} className="ml-auto">
          Login
        </Button>
      </header>

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
