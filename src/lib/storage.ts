import { Task, BrainDumpItem, DaySummary } from '../types';

const STORAGE_KEYS = {
  TASKS: 'anchor_tasks',
  BRAIN_DUMP: 'anchor_brain_dump',
  DAY_SUMMARIES: 'anchor_day_summaries',
  LAST_COMPLIMENT: 'anchor_last_compliment',
};

// Helper to get today's date string
export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

// Task storage
export function getTasks(): Task[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
}

export function addTask(task: Task): void {
  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
}

export function updateTask(updatedTask: Task): void {
  const tasks = getTasks();
  const index = tasks.findIndex(t => t.id === updatedTask.id);
  if (index !== -1) {
    tasks[index] = updatedTask;
    saveTasks(tasks);
  }
}

export function deleteTask(taskId: string): void {
  const tasks = getTasks();
  const filtered = tasks.filter(t => t.id !== taskId);
  saveTasks(filtered);
}

export function getTasksForDate(date: string): Task[] {
  const tasks = getTasks();
  return tasks.filter(t => {
    if (!t.startTime) return false;
    return t.startTime.startsWith(date);
  });
}

// Brain dump storage
export function getBrainDumpItems(): BrainDumpItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.BRAIN_DUMP);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveBrainDumpItems(items: BrainDumpItem[]): void {
  localStorage.setItem(STORAGE_KEYS.BRAIN_DUMP, JSON.stringify(items));
}

export function addBrainDumpItem(item: BrainDumpItem): void {
  const items = getBrainDumpItems();
  items.unshift(item); // Add to beginning
  saveBrainDumpItems(items);
}

export function removeBrainDumpItem(itemId: string): void {
  const items = getBrainDumpItems();
  const filtered = items.filter(i => i.id !== itemId);
  saveBrainDumpItems(filtered);
}

// Day summary storage
export function getDaySummary(date: string): DaySummary | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.DAY_SUMMARIES);
    const summaries: DaySummary[] = stored ? JSON.parse(stored) : [];
    return summaries.find(s => s.date === date) || null;
  } catch {
    return null;
  }
}

export function saveDaySummary(summary: DaySummary): void {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.DAY_SUMMARIES);
    const summaries: DaySummary[] = stored ? JSON.parse(stored) : [];
    const index = summaries.findIndex(s => s.date === summary.date);
    if (index !== -1) {
      summaries[index] = summary;
    } else {
      summaries.push(summary);
    }
    // Keep only last 30 days
    const recent = summaries.slice(-30);
    localStorage.setItem(STORAGE_KEYS.DAY_SUMMARIES, JSON.stringify(recent));
  } catch {
    // Ignore errors
  }
}

// Last compliment tracking (to avoid repeats)
export function getLastCompliment(category: string): string | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.LAST_COMPLIMENT);
    const data: Record<string, string> = stored ? JSON.parse(stored) : {};
    return data[category] || null;
  } catch {
    return null;
  }
}

export function saveLastCompliment(category: string, text: string): void {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.LAST_COMPLIMENT);
    const data: Record<string, string> = stored ? JSON.parse(stored) : {};
    data[category] = text;
    localStorage.setItem(STORAGE_KEYS.LAST_COMPLIMENT, JSON.stringify(data));
  } catch {
    // Ignore errors
  }
}

// Get week summaries
export function getWeekSummaries(weekStart: Date): DaySummary[] {
  const summaries: DaySummary[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    const summary = getDaySummary(dateStr);
    if (summary) {
      summaries.push(summary);
    }
  }
  return summaries;
}
