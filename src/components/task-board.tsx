
"use client";

import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Task } from "@/lib/types";
import TaskCard from "./task-card";
import AddTask from "./add-task";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function TaskBoard() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const storedTasksRaw = window.localStorage.getItem('tasks');
    if (storedTasksRaw === null) {
        const initialTasks: Task[] = [
            { id: '1', title: 'Weekly project report', category: 'Work', time: 60, priority: 'High', dueDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString() },
            { id: '2', title: 'Buy groceries', category: 'Home', time: 45, priority: 'Medium', dueDate: new Date().toISOString() },
            { id: '3', title: 'Call the dentist', category: 'Miscellaneous', time: 10, priority: 'Low', dueDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString() },
        ];
        setTasks(initialTasks);
    }
  }, [setTasks]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const notifiedTaskIds: string[] = JSON.parse(localStorage.getItem('notifiedTaskIds') || '[]');

    tasks.forEach(task => {
        const dueDate = new Date(task.dueDate);
        const taskDueDate = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
        
        if (taskDueDate <= today && !notifiedTaskIds.includes(task.id)) {
            toast({
                title: "Task Due",
                description: `Your task "${task.title}" is due today or is overdue.`,
            });
            notifiedTaskIds.push(task.id);
        }
    });

    localStorage.setItem('notifiedTaskIds', JSON.stringify(notifiedTaskIds));

  }, [tasks, toast]);

  const addTask = (task: Omit<Task, "id">) => {
    const newTask = { ...task, id: crypto.randomUUID() };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    toast({
      title: "Task Added!",
      description: `"${task.title}" has been added to your board.`,
    });
  };

  const deleteTask = (id: string) => {
    const deletedTask = tasks.find(task => task.id === id);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    
    const notifiedTaskIds: string[] = JSON.parse(localStorage.getItem('notifiedTaskIds') || '[]');
    const newNotifiedTaskIds = notifiedTaskIds.filter(taskId => taskId !== id);
    localStorage.setItem('notifiedTaskIds', JSON.stringify(newNotifiedTaskIds));
    
    if (deletedTask) {
        toast({
            title: "Task Deleted",
            description: `"${deletedTask.title}" has been removed.`,
            variant: "destructive"
        });
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const taskRotationClasses = [
    "transform -rotate-1",
    "transform rotate-2",
    "transform rotate-1",
    "transform -rotate-2",
    "transform rotate-3",
  ];

  return (
    <div className="p-8 h-full flex flex-col gap-6">
      <div className="relative w-full max-w-lg">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search tasks by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11"
        />
      </div>
      <div className="flex-1 flex items-start gap-8 p-6 pt-12 overflow-x-auto scroll-container">
        {filteredTasks.length === 0 && (
          <div className="m-auto text-center text-gray-500">
            <h2 className="text-2xl font-semibold">
              {searchTerm ? "No tasks found" : "Your board is empty!"}
            </h2>
            <p className="mt-2">
              {searchTerm
                ? "Try a different search term."
                : 'Click the "Add New Task" button to get started.'}
            </p>
          </div>
        )}
        {filteredTasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={deleteTask}
            className={cn(taskRotationClasses[index % taskRotationClasses.length], "hover:scale-105 hover:!rotate-0 transition-transform duration-200 ease-in-out")}
          />
        ))}
        <AddTask addTask={addTask} />
      </div>
    </div>
  );
}
