
"use client";

import { useState, useEffect, useMemo } from "react";
import { Task, TaskPriority, TaskCategory } from "@/lib/types";
import TaskCard from "./task-card";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSwappingStrategy,
} from '@dnd-kit/sortable';

interface TaskBoardProps {
  searchTerm: string;
  priorityFilter: TaskPriority | "all";
  categoryFilter: TaskCategory | "all";
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

const priorityOrder: Record<TaskPriority, number> = {
  High: 1,
  Medium: 2,
  Low: 3,
};

export default function TaskBoard({ searchTerm, priorityFilter, categoryFilter, tasks, setTasks }: TaskBoardProps) {
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const storedTasksRaw = window.localStorage.getItem('tasks');
    if (storedTasksRaw === null) {
        const initialTasks: Task[] = [
            { id: '1', title: 'Weekly project report', category: 'Work', priority: 'High', dueDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString() },
            { id: '2', title: 'Buy groceries', category: 'Home', priority: 'Medium', dueDate: new Date().toISOString() },
            { id: '3', title: 'Call the dentist', category: 'Miscellaneous', priority: 'Low', dueDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString() },
        ];
        setTasks(initialTasks);
    }
    setLoading(false);
  }, [setTasks]);

  useEffect(() => {
    if (typeof window === 'undefined' || loading) return;

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

  }, [tasks, toast, loading]);

  const deleteTask = (id: string) => {
    const deletedTask = tasks.find(task => task.id === id);
    setTasks(tasks.filter((task) => task.id !== id));
    
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

  const filteredTasks = useMemo(() => {
    let filtered = tasks
      .filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((task) =>
        priorityFilter === "all" ? true : task.priority === priorityFilter
      )
      .filter((task) =>
        categoryFilter === "all" ? true : task.category === categoryFilter
      );
    
    // Only sort if no search term is active
    if (!searchTerm && priorityFilter === 'all' && categoryFilter === 'all') {
      return filtered;
    }

    return filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  }, [tasks, searchTerm, priorityFilter, categoryFilter]);

  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);
      
      setTasks(arrayMove(tasks, oldIndex, newIndex));
    }
  }

  if (loading) {
    return (
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="w-56 h-56 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={tasks.map(task => task.id)}
        strategy={rectSwappingStrategy}
      >
        <div className="p-8">
          {filteredTasks.length === 0 ? (
            <div className="text-center text-gray-500 mt-16">
              <h2 className="text-2xl font-semibold">
                {searchTerm || priorityFilter !== 'all' || categoryFilter !== 'all' ? "No tasks found" : "Your board is empty!"}
              </h2>
              <p className="mt-2">
                {searchTerm || priorityFilter !== 'all' || categoryFilter !== 'all'
                  ? "Try adjusting your search or filters."
                  : "Click the '+' button to get started."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(224px,1fr))] gap-8">
                {filteredTasks.map((task) => (
                    <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={deleteTask}
                    />
                ))}
            </div>
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
}
