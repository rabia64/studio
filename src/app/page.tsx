import TaskBoard from "@/components/task-board";
import Legend from "@/components/legend";

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="p-4 border-b">
        <h1 className="text-6xl font-chalkboard text-center text-foreground">
          What To Do
        </h1>
      </header>
      <div className="flex justify-center py-4">
        <Legend />
      </div>
      <main className="flex-1 overflow-hidden">
        <TaskBoard />
      </main>
    </div>
  );
}
