"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Moderator Dashboard</h1>
          <p className="text-gray-600">Welcome, {user.email}</p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/moderate">
                <Button className="w-full">Start Moderating Jokes</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Moderation Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-4 space-y-2">
                <li>Review jokes for appropriate content</li>
                <li>Ensure jokes are categorized correctly</li>
                <li>Remove any offensive or inappropriate content</li>
                <li>Verify joke quality and humor value</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
