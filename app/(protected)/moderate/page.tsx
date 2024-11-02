"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { ModerateJokeCard } from "@/components/ModerateJokeCard";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

// Define the structure of a simplified joke for the card
interface SimpleJoke {
  id: string;
  content: string;
  type: string;
}

export default function Moderate() {
  const { user } = useAuth();
  const router = useRouter();
  const [currentJoke, setCurrentJoke] = useState<SimpleJoke | null>(null);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    fetchNextJoke();
  }, [user, router]);

  const fetchNextJoke = async () => {
    try {
      const joke = await api.getUnmoderatedJoke();
      setCurrentJoke({
        id: joke.id,
        content: joke.content,
        type: joke.type,
      });
    } catch (error) {
      console.error("Failed to fetch joke:", error);
    }
  };

  const handleApprove = async () => {
    if (!currentJoke) return;
    try {
      await api.approveJoke(currentJoke.id, {
        content: currentJoke.content,
        type: currentJoke.type,
      });
      fetchNextJoke();
    } catch (error) {
      console.error("Failed to approve joke:", error);
    }
  };

  const handleReject = async () => {
    if (!currentJoke) return;
    try {
      await api.rejectJoke(currentJoke.id);
      fetchNextJoke();
    } catch (error) {
      console.error("Failed to reject joke:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Moderate Jokes</h1>
      {currentJoke ? (
        <ModerateJokeCard
          joke={currentJoke}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      ) : (
        <p>No jokes available for moderation</p>
      )}
    </div>
  );
}
