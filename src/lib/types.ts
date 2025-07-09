export type TaskCategory = "Home" | "Work" | "Miscellaneous";
export type TaskPriority = "High" | "Medium" | "Low";

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  time: number;
  priority: TaskPriority;
}
