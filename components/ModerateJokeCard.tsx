import { Button } from "@/components/ui/button";

// Simplified joke structure specifically for ModerateJokeCard
interface SimpleJoke {
  id: string;
  content: string;
  type: string;
}

interface Props {
  joke: SimpleJoke;
  onApprove: () => void;
  onReject: () => void;
}

export function ModerateJokeCard({ joke, onApprove, onReject }: Props) {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <p className="text-lg mb-4">{joke.content}</p>
      <p className="mb-4">Type: {joke.type}</p>
      <div className="flex gap-4">
        <Button onClick={onApprove} className="bg-green-600 hover:bg-green-700">
          Approve
        </Button>
        <Button onClick={onReject} className="bg-red-600 hover:bg-red-700">
          Reject
        </Button>
      </div>
    </div>
  );
}
