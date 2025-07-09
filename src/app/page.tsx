"use client";

import { useState } from "react";
import TaskBoard from "@/components/task-board";
import Legend from "@/components/legend";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="p-2 border-b flex items-center justify-between gap-4">
        <h1 className="text-3xl font-chalkboard text-foreground">
          What To Do
        </h1>
        <div className="flex items-center gap-2">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 h-9"
            />
          </div>
          <Legend />
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        <TaskBoard searchTerm={searchTerm} />
      </main>
    </div>
  );
}
