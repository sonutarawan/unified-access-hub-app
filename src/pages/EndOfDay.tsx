import { useState, useEffect } from 'react';
import { Task, DaySummary, Category } from '../types';
import { getTasksForDate, saveDaySummary, getTodayString } from '../lib/storage';

interface EndOfDayProps {
  onComplete: () => void;
}

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'kids', label: 'Kids' },
  { value: 'meals', label: 'Meals' },
  { value: 'house', label: 'House' },
  { value: 'errands', label: 'Errands' },
  { value: 'self', label: 'Self' },
];

export default function EndOfDay({ onComplete }: EndOfDayProps) {
  const today = getTodayString();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const loaded = getTasksForDate(today);
    setTasks(loaded);
  }, [today]);

  const completedTasks = tasks.filter(t => t.completed);
  const totalMinutes = completedTasks.reduce((acc, t) => acc + t.duration, 0);
  
  const categoriesCount: Record<Category, number> = {
    kids: 0,
    meals: 0,
    house: 0,
    errands: 0,
    self: 0,
    custom: 0,
  };
  
  completedTasks.forEach(t => {
    categoriesCount[t.category] = (categoriesCount[t.category] || 0) + 1;
  });

  const saveSummary = () => {
    const summary: DaySummary = {
      date: today,
      completedTasks: completedTasks.length,
      totalMinutes,
      categories: categoriesCount,
    };
    
    saveDaySummary(summary);
    setSaved(true);
    
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <h2 className="text-2xl font-display font-semibold mb-2">Today in Review</h2>
        <p className="text-muted-foreground">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card-soft p-4 text-center">
          <p className="text-3xl font-bold text-primary">{completedTasks.length}</p>
          <p className="text-sm text-muted-foreground">Tasks done</p>
        </div>
        <div className="card-soft p-4 text-center">
          <p className="text-3xl font-bold text-primary">
            {totalMinutes < 60 ? `${totalMinutes}m` : `${Math.round(totalMinutes / 60 * 10) / 10}h`}
          </p>
          <p className="text-sm text-muted-foreground">Time invested</p>
        </div>
      </div>

      {/* Category breakdown */}
      {completedTasks.length > 0 && (
        <div className="card-soft p-4">
          <h3 className="font-display font-semibold mb-3">Where you put your energy</h3>
          <div className="space-y-2">
            {CATEGORIES.map(cat => {
              const count = categoriesCount[cat.value as Category];
              if (count === 0) return null;
              
              return (
                <div key={cat.value} className="flex items-center justify-between">
                  <span className="text-sm">{cat.label}</span>
                  <span className="text-sm font-medium text-muted-foreground">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Completed tasks list */}
      {completedTasks.length > 0 ? (
        <div className="card-soft p-4">
          <h3 className="font-display font-semibold mb-3">What you moved forward</h3>
          <ul className="space-y-2">
            {completedTasks.map(task => (
              <li key={task.id} className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-muted-foreground">{task.title}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="card-soft p-6 text-center">
          <p className="text-muted-foreground mb-2">No tasks completed today.</p>
          <p className="text-sm text-muted-foreground italic">
            Some days are for resting. Tomorrow is a fresh start.
          </p>
        </div>
      )}

      {/* Gentle closing message */}
      <div className="card-soft p-4 bg-secondary/20">
        <p className="text-center text-sm italic">
          {completedTasks.length > 0 
            ? "You did things today. They mattered, even if they felt small."
            : "You're still here. That's enough for today."}
        </p>
      </div>

      {/* Action button */}
      <button
        onClick={saveSummary}
        disabled={saved}
        className="w-full btn-primary py-4 text-lg disabled:opacity-70"
      >
        {saved ? 'Saved ✓' : 'End Day'}
      </button>
    </div>
  );
}
