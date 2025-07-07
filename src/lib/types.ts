export type TaskCategory = "Home" | "Work" | "Miscellaneous";

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  time: number;
}
