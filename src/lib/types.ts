export type TaskCategory = "Home" | "Work" | "Miscellaneous";
export type TaskPriority = "High" | "Medium" | "Low";

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  priority: TaskPriority;
  dueDate: string;
}
