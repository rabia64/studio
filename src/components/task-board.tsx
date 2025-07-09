"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { Task } from "@/lib/types";
import TaskCard from "./task-card";
import AddTask from "./add-task";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const initialTasks: Task[] = [
    { id: '1', title: 'Weekly project report', category: 'Work', time: 60, priority: 'High' },
    { id: '2', title: 'Buy groceries', category: 'Home', time: 45, priority: 'Medium' },
    { id: '3', title: 'Call the dentist', category: 'Miscellaneous', time: 10, priority: 'Low' },
];

export default function TaskBoard() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", initialTasks);
  const { toast } = useToast();

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
    if (deletedTask) {
        toast({
            title: "Task Deleted",
            description: `"${deletedTask.title}" has been removed.`,
            variant: "destructive"
        });
    }
  };

  const taskRotationClasses = [
    "transform -rotate-1",
    "transform rotate-2",
    "transform rotate-1",
    "transform -rotate-2",
    "transform rotate-3",
  ];

  return (
    <div className="p-8 h-full">
      <div className="flex items-start gap-8 pb-8 overflow-x-auto h-full scroll-container">
        {tasks.length === 0 && (
          <div className="m-auto text-center text-gray-500">
            <h2 className="text-2xl font-semibold">Your board is empty!</h2>
            <p className="mt-2">Click the "Add New Task" button to get started.</p>
          </div>
        )}
        {tasks.map((task, index) => (
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
