"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { ModerateJokeCard } from "@/components/ModerateJokeCard";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastProvider,
  ToastViewport,
} from "@/components/ui/toast";

interface Joke {
  _id: string;
  content: string;
  type: string;
  isModerated: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Moderate() {
  const { user } = useAuth();
  const router = useRouter();
  const [currentJoke, setCurrentJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(false);
  const [jokeTypes, setJokeTypes] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    title: "",
    description: "",
    variant: "default" as const,
  });

  const showNotification = (
    title: string,
    description: string,
    variant: "default"
  ) => {
    setToastMessage({ title, description, variant });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    fetchNextJoke();
    fetchJokeTypes(); // Fetch joke types on component mount
  }, [user, router]);

  const fetchJokeTypes = async () => {
    try {
      const types = await api.getJokeTypes();
      setJokeTypes(types);
    } catch (error) {
      console.error("Failed to fetch joke types:", error);
      showNotification("Error", "Failed to load joke types", "default");
    }
  };

  const fetchNextJoke = async () => {
    try {
      setLoading(true);
      const joke = await api.getUnmoderatedJoke();
      setCurrentJoke(joke || null);
      if (!joke) {
        showNotification(
          "No Jokes",
          "No jokes available for moderation",
          "default"
        );
      }
    } catch (error) {
      console.error("Failed to fetch joke:", error);
      showNotification(
        "Error",
        "Failed to fetch joke for moderation",
        "default"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (updatedJoke: {
    id: string;
    content: string;
    type: string;
  }) => {
    if (!updatedJoke.id) {
      console.error("Joke ID is missing");
      return;
    }
    try {
      setLoading(true);
      const success = await api.approveJoke(updatedJoke.id, {
        content: updatedJoke.content,
        type: updatedJoke.type,
      });
      if (success) {
        showNotification("Success", "Joke approved successfully", "default");
        fetchNextJoke();
      } else {
        throw new Error("Failed to approve joke");
      }
    } catch (error) {
      console.error("Failed to approve joke:", error);
      showNotification("Error", "Failed to approve joke", "default");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!currentJoke) return;
    try {
      setLoading(true);
      await api.rejectJoke(currentJoke._id);
      showNotification("Success", "Joke rejected successfully", "default");
      fetchNextJoke();
    } catch (error) {
      console.error("Failed to reject joke:", error);
      showNotification("Error", "Failed to reject joke", "default");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Moderate Jokes</h1>
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px] bg-white rounded-lg shadow-sm">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : currentJoke ? (
            <ModerateJokeCard
              joke={{
                id: currentJoke._id,
                content: currentJoke.content,
                type: currentJoke.type,
              }}
              jokeTypes={jokeTypes}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ) : (
            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
              <p className="text-gray-600">No jokes available for moderation</p>
            </div>
          )}
        </div>
      </div>
      <ToastProvider>
        {showToast && (
          <Toast variant={toastMessage.variant}>
            <div className="grid gap-1">
              <ToastTitle>{toastMessage.title}</ToastTitle>
              <ToastDescription>{toastMessage.description}</ToastDescription>
            </div>
          </Toast>
        )}
        <ToastViewport />
      </ToastProvider>
    </>
  );
}
