"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Joke } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastProvider,
  ToastViewport,
} from "@/components/ui/toast";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function RandomJoke() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    title: "",
    description: "",
    variant: "default" as const,
  });

  const showNotification = (
    title: string,
    description: string,
    variant: "default" | "destructive"
  ) => {
    setToastMessage({ title, description, variant: variant as "default" });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const fetchRandomJoke = async () => {
    try {
      setLoading(true);
      const newJoke = await api.getRandomJoke();
      setJoke(newJoke);
    } catch (error) {
      console.error("Failed to fetch random joke:", error);
      showNotification("Error", "Failed to fetch random joke", "destructive");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomJoke();
  }, []);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Random Joke</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : joke ? (
            <div className="space-y-4">
              <p className="text-lg">{joke.content}</p>
              <p className="text-sm text-muted-foreground">
                Category: {joke.type}
              </p>
            </div>
          ) : (
            <p>No joke available</p>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={fetchRandomJoke}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Loading..." : "Get Another Joke"}
          </Button>
        </CardFooter>
      </Card>

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
