import { useState, useEffect } from 'react';
import { Task, Category } from '../types';
import { getTasksForDate, updateTask, addTask, getTodayString } from '../lib/storage';
import { getRandomCompliment } from '../lib/compliments';
import { formatTime, formatDuration, getCategoryColor, getCategoryColorText, getDefaultSteps } from '../lib/utils';
import { cn } from '../lib/utils';

interface TodayProps {
  onNavigate: (view: string) => void;
}

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'kids', label: 'Kids' },
  { value: 'meals', label: 'Meals' },
  { value: 'house', label: 'House' },
  { value: 'errands', label: 'Errands' },
  { value: 'self', label: 'Self' },
];

const DEFAULT_DURATIONS = [15, 30, 45, 60];

export default function Today({ onNavigate }: TodayProps) {
  const today = getTodayString();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCompliment, setShowCompliment] = useState<{ text: string; category: Category } | null>(null);
  
  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<Category>('house');
  const [newTaskDuration, setNewTaskDuration] = useState(15);

  // Load tasks for today
  useEffect(() => {
    const loaded = getTasksForDate(today);
    setTasks(loaded.sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      if (a.startTime && b.startTime) return a.startTime.localeCompare(b.startTime);
      return 0;
    }));
  }, [today]);

  // Timer effect
  useEffect(() => {
    if (!activeTask || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          completeTask(activeTask);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTask, timeRemaining]);

  const completeTask = (task: Task) => {
    const updated = { ...task, completed: true };
    updateTask(updated);
    setTasks(prev => prev.map(t => t.id === task.id ? updated : t));
    setActiveTask(null);
    
    // Show compliment
    const compliment = getRandomCompliment(task.category);
    setShowCompliment({ text: compliment, category: task.category });
    
    setTimeout(() => setShowCompliment(null), 4000);
  };

  const startTask = (task: Task) => {
    if (activeTask) return; // Only one task at a time
    setActiveTask(task);
    setTimeRemaining(task.duration * 60);
  };

  const stopTask = () => {
    setActiveTask(null);
    setTimeRemaining(0);
  };

  const addNewTask = () => {
    if (!newTaskTitle.trim()) return;
    
    const now = new Date();
    const startTime = new Date();
    startTime.setMinutes(Math.ceil(now.getMinutes() / 15) * 15); // Round to next 15 min
    
    const task: Task = {
      id: `${Date.now()}`,
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      duration: newTaskDuration,
      completed: false,
      startTime: startTime.toISOString(),
      steps: getDefaultSteps(newTaskCategory),
      createdAt: new Date().toISOString(),
    };
    
    addTask(task);
    setTasks(prev => [...prev, task].sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      if (a.startTime && b.startTime) return a.startTime.localeCompare(b.startTime);
      return 0;
    }));
    
    setNewTaskTitle('');
    setNewTaskCategory('house');
    setNewTaskDuration(15);
    setShowAddModal(false);
  };

  const formatTimerDisplay = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = activeTask && timeRemaining > 0 
    ? ((activeTask.duration * 60 - timeRemaining) / (activeTask.duration * 60)) * 100 
    : 0;

  return (
    <div className="space-y-6">
      {/* Active Task Timer */}
      {activeTask && (
        <div className="card-soft p-6 animate-scale-in completion-ring">
          <div className="text-center space-y-4">
            <span className={cn("category-tag", getCategoryColorText(activeTask.category))}>
              {CATEGORIES.find(c => c.value === activeTask.category)?.label}
            </span>
            <h2 className="text-xl font-display font-semibold">{activeTask.title}</h2>
            
            {/* Timer circle */}
            <div className="relative w-40 h-40 mx-auto">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={283}
                  strokeDashoffset={283 - (283 * progressPercent) / 100}
                  className="timer-progress"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-mono font-bold text-primary">
                  {formatTimerDisplay(timeRemaining)}
                </span>
              </div>
            </div>
            
            <button
              onClick={() => completeTask(activeTask)}
              className="btn-primary w-full py-3 text-lg"
            >
              Complete Now
            </button>
            <button
              onClick={stopTask}
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              Pause timer
            </button>
          </div>
        </div>
      )}

      {/* Compliment Toast */}
      {showCompliment && (
        <div className="fixed top-20 left-4 right-4 z-50 animate-scale-in">
          <div className="card-soft p-4 bg-primary text-primary-foreground completion-ring">
            <p className="font-medium text-center">{showCompliment.text}</p>
          </div>
        </div>
      )}

      {/* Timeline Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-display font-semibold">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </h2>
          <p className="text-sm text-muted-foreground">
            {tasks.filter(t => t.completed).length} of {tasks.length} done
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-secondary text-sm"
        >
          Add Task
        </button>
      </div>

      {/* Timeline */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="card-soft p-8 text-center">
            <p className="text-muted-foreground mb-4">Your day is open.</p>
            <p className="text-sm text-muted-foreground">
              Add a task or just breathe. Either way works.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 btn-primary"
            >
              Add your first task
            </button>
          </div>
        ) : (
          tasks.map((task, index) => (
            <div
              key={task.id}
              onClick={() => !task.completed && startTask(task)}
              className={cn(
                "timeline-block card-soft p-4 flex items-center gap-4",
                task.completed && "opacity-60",
                activeTask?.id === task.id && "active"
              )}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Time indicator */}
              <div className="w-16 text-sm text-muted-foreground font-mono">
                {task.startTime ? formatTime(new Date(task.startTime)) : '—'}
              </div>
              
              {/* Category color bar */}
              <div className={cn("w-1 h-12 rounded-full", getCategoryColor(task.category))} />
              
              {/* Task info */}
              <div className="flex-1 min-w-0">
                <h3 className={cn("font-medium truncate", task.completed && "line-through")}>
                  {task.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={cn("category-tag text-xs", getCategoryColorText(task.category))}>
                    {CATEGORIES.find(c => c.value === task.category)?.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDuration(task.duration)}
                  </span>
                </div>
              </div>
              
              {/* Status */}
              {task.completed ? (
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : (
                <button
                  onClick={(e) => { e.stopPropagation(); startTask(task); }}
                  className="w-8 h-8 rounded-full border-2 border-border hover:border-primary flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 animate-fade-in">
          <div className="card-soft w-full max-w-md p-6 animate-scale-in">
            <h3 className="text-lg font-display font-semibold mb-4">Add a Task</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">What needs doing?</label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g., Clean the kitchen"
                  className="input-soft w-full"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && addNewTask()}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.value}
                      onClick={() => setNewTaskCategory(cat.value)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                        newTaskCategory === cat.value
                          ? getCategoryColorText(cat.value)
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">How long? (ADHD-friendly chunks)</label>
                <div className="flex gap-2">
                  {DEFAULT_DURATIONS.map(duration => (
                    <button
                      key={duration}
                      onClick={() => setNewTaskDuration(duration)}
                      className={cn(
                        "flex-1 py-2 rounded-lg text-sm font-medium transition-colors",
                        newTaskDuration === duration
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {formatDuration(duration)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 rounded-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addNewTask}
                disabled={!newTaskTitle.trim()}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
