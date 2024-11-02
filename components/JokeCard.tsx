import { Joke } from "@/lib/types";

export function JokeCard({ joke }: { joke: Joke }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <p className="text-lg mb-2">{joke.content}</p>
      <span className="text-sm text-gray-500">Type: {joke.type}</span>
    </div>
  );
}
