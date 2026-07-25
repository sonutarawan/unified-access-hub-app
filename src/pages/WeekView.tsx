import { useState, useEffect } from 'react';
import { DaySummary } from '../types';
import { getDaySummary, getTodayString } from '../lib/storage';
import { getWeekStart } from '../lib/utils';
import { cn } from '../lib/utils';

interface WeekViewProps {
  onBack: () => void;
}

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function WeekView({ onBack }: WeekViewProps) {
  const [weekDays, setWeekDays] = useState<{ date: string; dayName: string; dayNum: number; summary?: DaySummary }[]>([]);
  
  useEffect(() => {
    const today = new Date();
    const weekStart = getWeekStart(today);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      const summary = getDaySummary(dateStr);
      
      days.push({
        date: dateStr,
        dayName: DAY_NAMES[i],
        dayNum: date.getDate(),
        summary,
      });
    }
    
    setWeekDays(days);
  }, []);

  const getCategoryCountColor = (count: number) => {
    if (count === 0) return 'bg-muted/30';
    if (count <= 2) return 'bg-primary/30';
    if (count <= 4) return 'bg-primary/50';
    return 'bg-primary';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-lg hover:bg-muted transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h2 className="text-lg font-display font-semibold">This Week</h2>
          <p className="text-sm text-muted-foreground">See the shape of your week</p>
        </div>
      </div>

      {/* Week grid */}
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => {
          const isToday = day.date === getTodayString();
          const completed = day.summary?.completedTasks || 0;
          
          return (
            <div
              key={day.date}
              className={cn(
                "card-soft p-2 text-center min-h-[80px] flex flex-col",
                isToday && "ring-2 ring-primary"
              )}
            >
              <span className={cn("text-xs font-medium", isToday && "text-primary")}>
                {day.dayName}
              </span>
              <span className={cn("text-lg font-display font-semibold", isToday && "text-primary")}>
                {day.dayNum}
              </span>
              
              {completed > 0 ? (
                <div className="mt-1 text-xs text-muted-foreground">
                  {completed} done
                </div>
              ) : (
                <div className="mt-1 text-xs text-muted-foreground italic">
                  —
                </div>
              )}
              
              {/* Category dots */}
              {day.summary && Object.entries(day.summary.categories).filter(([_, v]) => v > 0).length > 0 && (
                <div className="flex justify-center gap-1 mt-1">
                  {Object.entries(day.summary.categories).map(([cat, count]) => (
                    count > 0 && (
                      <div
                        key={cat}
                        className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          getCategoryCountColor(count)
                        )}
                        title={`${cat}: ${count}`}
                      />
                    )
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Weekly insight */}
      <div className="card-soft p-4">
        <h3 className="font-display font-semibold mb-2">Week so far</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-bold text-primary">
              {weekDays.reduce((acc, day) => acc + (day.summary?.completedTasks || 0), 0)}
            </p>
            <p className="text-sm text-muted-foreground">Tasks completed</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">
              {Math.round(weekDays.reduce((acc, day) => acc + (day.summary?.totalMinutes || 0), 0) / 60 * 10) / 10}h
            </p>
            <p className="text-sm text-muted-foreground">Time invested</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-4 italic">
          {weekDays.reduce((acc, day) => acc + (day.summary?.completedTasks || 0), 0) > 0 
            ? "You're moving forward. It might not feel like it, but you are."
            : "Some weeks are for surviving. That counts too."}
        </p>
      </div>
    </div>
  );
}
