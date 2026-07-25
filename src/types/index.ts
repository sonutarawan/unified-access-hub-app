export type Category = 'kids' | 'meals' | 'house' | 'errands' | 'self' | 'custom';

export interface Task {
  id: string;
  title: string;
  category: Category;
  duration: number; // in minutes
  completed: boolean;
  startTime?: string; // ISO string when task is scheduled
  steps?: string[]; // broken down subtasks
  createdAt: string;
}

export interface BrainDumpItem {
  id: string;
  text: string;
  createdAt: string;
  categorized?: boolean;
}

export interface Compliment {
  id: string;
  category: Category;
  text: string;
}

export interface DaySummary {
  date: string;
  completedTasks: number;
  totalMinutes: number;
  categories: Record<Category, number>;
}

export interface WeekView {
  weekStart: string;
  days: DaySummary[];
}
