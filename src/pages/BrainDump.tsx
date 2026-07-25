import { useState, useEffect } from 'react';
import { BrainDumpItem } from '../types';
import { getBrainDumpItems, addBrainDumpItem, removeBrainDumpItem, addTask, getTodayString } from '../lib/storage';
import { generateId } from '../lib/utils';
import { cn } from '../lib/utils';

interface BrainDumpProps {
  onBack: () => void;
}

const CATEGORIES = [
  { value: 'kids', label: 'Kids' },
  { value: 'meals', label: 'Meals' },
  { value: 'house', label: 'House' },
  { value: 'errands', label: 'Errands' },
  { value: 'self', label: 'Self' },
];

export default function BrainDump({ onBack }: BrainDumpProps) {
  const [items, setItems] = useState<BrainDumpItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [categorizingId, setCategorizingId] = useState<string | null>(null);

  useEffect(() => {
    setItems(getBrainDumpItems());
  }, []);

  const addItem = () => {
    if (!inputValue.trim()) return;
    
    const item: BrainDumpItem = {
      id: generateId(),
      text: inputValue.trim(),
      createdAt: new Date().toISOString(),
    };
    
    addBrainDumpItem(item);
    setItems([item, ...items]);
    setInputValue('');
  };

  const removeItem = (id: string) => {
    removeBrainDumpItem(id);
    setItems(items.filter(i => i.id !== id));
  };

  const categorizeItem = (id: string, category: typeof CATEGORIES[0]['value']) => {
    const item = items.find(i => i.id === id);
    if (!item) return;
    
    // Convert to task
    const task = {
      id: generateId(),
      title: item.text,
      category,
      duration: 15,
      completed: false,
      startTime: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    
    addTask(task);
    removeItem(id);
    setCategorizingId(null);
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
          <h2 className="text-lg font-display font-semibold">Brain Dump</h2>
          <p className="text-sm text-muted-foreground">Catch it before it evaporates</p>
        </div>
      </div>

      {/* Quick capture input */}
      <div className="card-soft p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addItem()}
            placeholder="What's in your head right now?"
            className="input-soft flex-1"
            autoFocus
          />
          <button
            onClick={addItem}
            disabled={!inputValue.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
      </div>

      {/* Items list */}
      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Your mind is clear. Nice.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="card-soft p-4 animate-fade-in"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="flex-1">{item.text}</p>
                <div className="flex items-center gap-1">
                  {categorizingId === item.id ? (
                    <div className="flex gap-1">
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat.value}
                          onClick={() => categorizeItem(item.id, cat.value as any)}
                          className="px-2 py-1 rounded text-xs font-medium bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {cat.label}
                        </button>
                      ))}
                      <button
                        onClick={() => setCategorizingId(null)}
                        className="px-2 py-1 rounded text-xs text-muted-foreground hover:text-foreground"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => setCategorizingId(item.id)}
                        className="p-1.5 rounded hover:bg-muted transition-colors"
                        title="Convert to task"
                      >
                        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 rounded hover:bg-destructive/10 transition-colors"
                        title="Delete"
                      >
                        <svg className="w-4 h-4 text-muted-foreground hover:text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {new Date(item.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
