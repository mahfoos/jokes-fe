import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface SimpleJoke {
  id: string;
  content: string;
  type: string;
}

interface Props {
  joke: SimpleJoke;
  jokeTypes: string[]; // Add jokeTypes prop
  onApprove: (updatedJoke: SimpleJoke) => void;
  onReject: () => void;
}

export function ModerateJokeCard({
  joke,
  jokeTypes,
  onApprove,
  onReject,
}: Props) {
  const [content, setContent] = useState(joke.content);
  const [type, setType] = useState(joke.type);
  const [newType, setNewType] = useState(""); // For adding a new type
  const [useNewType, setUseNewType] = useState(false); // Toggle between existing and new type

  const handleApprove = () => {
    const finalType = useNewType && newType ? newType : type;
    onApprove({ ...joke, content, type: finalType });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <label className="block text-gray-700">Joke Content</label>
          <textarea
            className="w-full border rounded p-2 mt-1"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <label className="block text-gray-700">Joke Type</label>
          {!useNewType ? (
            <select
              className="w-full border rounded p-2 mt-1"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {jokeTypes.map((jokeType) => (
                <option key={jokeType} value={jokeType}>
                  {jokeType}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              className="w-full border rounded p-2 mt-1"
              placeholder="Enter new type"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
            />
          )}
          <div className="mt-2">
            <label className="flex items-center text-gray-700">
              <input
                type="checkbox"
                checked={useNewType}
                onChange={() => setUseNewType(!useNewType)}
                className="mr-2"
              />
              Add as a new type
            </label>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-4 justify-end">
        <Button onClick={onReject} variant="destructive">
          Reject
        </Button>
        <Button
          onClick={handleApprove}
          className="bg-green-600 hover:bg-green-700"
        >
          Approve
        </Button>
      </CardFooter>
    </Card>
  );
}
