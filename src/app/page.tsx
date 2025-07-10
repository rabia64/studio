"use client";

import { useState } from "react";
import TaskBoard from "@/components/task-board";
import Legend from "@/components/legend";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskCategory, TaskPriority } from "@/lib/types";
import AddTask from "@/components/add-task";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Task } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "all">(
    "all"
  );
  const [categoryFilter, setCategoryFilter] = useState<TaskCategory | "all">(
    "all"
  );
  const [isAddTaskOpen, setAddTaskOpen] = useState(false);
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const { toast } = useToast();

  const addTask = (task: Omit<Task, "id">) => {
    const newTask = { ...task, id: crypto.randomUUID() };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    toast({
      title: "Task Added!",
      description: `"${task.title}" has been added to your board.`,
    });
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="p-2 border-b flex flex-wrap items-center justify-between gap-4 sticky top-0 bg-background/95 z-10 backdrop-blur-sm">
        <h1 className="text-3xl font-chalkboard text-foreground">
          What To Do
        </h1>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative w-full sm:w-auto min-w-40">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 h-9"
            />
          </div>
          <Select
            value={priorityFilter}
            onValueChange={(value) =>
              setPriorityFilter(value as TaskPriority | "all")
            }
          >
            <SelectTrigger className="w-full sm:w-[120px] h-9">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={categoryFilter}
            onValueChange={(value) =>
              setCategoryFilter(value as TaskCategory | "all")
            }
          >
            <SelectTrigger className="w-full sm:w-[140px] h-9">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Home">Home</SelectItem>
              <SelectItem value="Work">Work</SelectItem>
              <SelectItem value="Miscellaneous">Miscellaneous</SelectItem>
            </SelectContent>
          </Select>
          <Legend />
        </div>
      </header>
      <main className="flex-1 overflow-y-auto">
        <TaskBoard
          searchTerm={searchTerm}
          priorityFilter={priorityFilter}
          categoryFilter={categoryFilter}
          tasks={tasks}
          setTasks={setTasks}
        />
      </main>

      <AddTask open={isAddTaskOpen} setOpen={setAddTaskOpen} addTask={addTask} />
      <button
        onClick={() => setAddTaskOpen(true)}
        className="fixed bottom-8 right-8 bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:bg-primary/90 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="Add New Task"
      >
        <Plus className="h-8 w-8" />
      </button>
    </div>
  );
}
