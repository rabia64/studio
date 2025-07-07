import TaskBoard from "@/components/task-board";

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="p-4 border-b">
        <h1 className="text-3xl font-bold font-headline text-center text-foreground">
          TaskBoard
        </h1>
      </header>
      <main className="flex-1 overflow-hidden">
        <TaskBoard />
      </main>
    </div>
  );
}
