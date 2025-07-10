
"use client";

import { Home, Briefcase, ClipboardList, Trash2, Flame, CalendarDays, Pencil } from "lucide-react";
import { format } from "date-fns";
import { Task, TaskCategory, TaskPriority } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  className?: string;
}

const categoryStyles: Record<TaskCategory, {
    bg: string;
    text: string;
    border: string;
    icon: React.ReactNode;
}> = {
  Home: {
    bg: "bg-pink-200/80",
    text: "text-pink-900",
    border: "border-pink-300",
    icon: <Home className="h-5 w-5 flex-shrink-0" />,
  },
  Work: {
    bg: "bg-yellow-200/80",
    text: "text-yellow-900",
    border: "border-yellow-300",
    icon: <Briefcase className="h-5 w-5 flex-shrink-0" />,
  },
  Miscellaneous: {
    bg: "bg-green-200/80",
    text: "text-green-900",
    border: "border-green-300",
    icon: <ClipboardList className="h-5 w-5 flex-shrink-0" />,
  },
};

export default function TaskCard({ task, onDelete, onEdit, className }: TaskCardProps) {
  const styles = categoryStyles[task.category];
  const priorityIcons: Record<TaskPriority, { count: number; color: string }> = {
    High: { count: 3, color: "text-red-500" },
    Medium: { count: 2, color: "text-orange-400" },
    Low: { count: 1, color: "text-yellow-400" },
  };

  return (
    <div
      className={cn("animate-in fade-in zoom-in-95 duration-300 transform", className)}>
        <Card
        className={cn(
            "w-56 h-56 min-w-56 min-h-56 shadow-lg flex flex-col relative font-chalkboard transition-transform hover:scale-105",
            styles.bg,
            styles.text,
            styles.border
        )}
        >
        <div className="absolute top-2 right-2 z-10 flex gap-1">
             <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full shadow-md"
                onClick={(e) => { e.stopPropagation(); onEdit(task); }}
                aria-label={`Edit task: ${task.title}`}
            >
                <Pencil className="h-4 w-4" />
            </Button>
            <Button
                variant="destructive"
                size="icon"
                className="h-8 w-8 rounded-full shadow-md"
                onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
                aria-label={`Delete task: ${task.title}`}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-6 h-6 bg-yellow-400 rounded-full shadow-md border-2 border-yellow-500" aria-hidden="true"></div>
        <CardHeader className="flex-shrink-0 p-4 pt-8 pr-12 overflow-hidden">
            <CardTitle className="flex items-start gap-2 text-2xl h-full break-words">
            {styles.icon}
            <span className="flex-grow">{task.title}</span>
            </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex-grow flex items-end justify-between mt-auto border-t">
            <div className="flex flex-col gap-2 text-base">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                <span>{format(new Date(task.dueDate), "PP")}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
                {Array.from({ length: priorityIcons[task.priority].count }).map((_, i) => (
                    <Flame key={i} className={cn("h-4 w-4", priorityIcons[task.priority].color)} />
                ))}
            </div>
        </CardContent>
        </Card>
    </div>
  );
}
