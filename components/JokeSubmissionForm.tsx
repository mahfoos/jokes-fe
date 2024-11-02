"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastProvider,
  ToastViewport,
} from "@/components/ui/toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function JokeSubmissionForm() {
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
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

  useEffect(() => {
    const loadJokeTypes = async () => {
      try {
        const jokeTypes = await api.getJokeTypes();
        setTypes(jokeTypes);
        if (jokeTypes.length > 0) {
          setType(jokeTypes[0]);
        }
      } catch (error) {
        console.error("Failed to load joke types:", error);
        showNotification(
          "Error",
          "Failed to load joke categories",
          "destructive"
        );
      }
    };

    loadJokeTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      showNotification("Error", "Please enter a joke", "destructive");
      return;
    }

    try {
      setSubmitting(true);
      await api.submitJoke({ content, type });
      showNotification("Success", "Joke submitted successfully!", "default");
      setContent("");
    } catch (error) {
      console.error("Failed to submit joke:", error);
      showNotification(
        "Error",
        "Failed to submit joke. Please try again.",
        "destructive"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Submit a New Joke</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="content">Your Joke</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your joke here..."
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Category</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((jokeType) => (
                    <SelectItem key={jokeType} value={jokeType}>
                      {jokeType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? "Submitting..." : "Submit Joke"}
            </Button>
          </form>
        </CardContent>
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
