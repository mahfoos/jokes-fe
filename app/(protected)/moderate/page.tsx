"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { ModerateJokeCard } from "@/components/ModerateJokeCard";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

export default function Moderate() {
  const { user } = useAuth();
  const router = useRouter();
  const [currentJoke, setCurrentJoke] = useState(null);

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
      setCurrentJoke(joke);
    } catch (error) {
      console.error("Failed to fetch joke:", error);
    }
  };

  const handleApprove = async () => {
    if (!currentJoke) return;
    try {
      await api.approveJoke(currentJoke.id as string, {
        content: currentJoke.content as string,
        type: currentJoke.type as string,
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
