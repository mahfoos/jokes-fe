"use client";

import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastProvider,
  ToastViewport,
} from "@/components/ui/toast";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    title: "",
    description: "",
    variant: "default" as const,
  });

  const showNotification = (
    title: string,
    description: string,
    variant: "default" | "destructive" = "default"
  ) => {
    setToastMessage({ title, description, variant });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await api.login(email, password);
      login(token); // This will now redirect to /dashboard
      showNotification("Success", "Login successful!");
    } catch (error) {
      console.error("Login failed:", error);
      showNotification(
        "Error",
        "Login failed. Please check your credentials.",
        "destructive"
      );
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Moderator Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
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
