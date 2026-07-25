import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${mins}m`;
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    kids: 'bg-[hsl(var(--kids))]',
    meals: 'bg-[hsl(var(--meals))]',
    house: 'bg-[hsl(var(--house))]',
    errands: 'bg-[hsl(var(--errands))]',
    self: 'bg-[hsl(var(--self))]',
    custom: 'bg-gray-400',
  };
  return colors[category] || colors.custom;
}

export function getCategoryColorText(category: string): string {
  const colors: Record<string, string> = {
    kids: 'text-[hsl(var(--kids))] bg-[hsl(var(--kids))]/20',
    meals: 'text-[hsl(var(--meals))] bg-[hsl(var(--meals))]/20',
    house: 'text-[hsl(var(--house))] bg-[hsl(var(--house))]/20',
    errands: 'text-[hsl(var(--errands))] bg-[hsl(var(--errands))]/20',
    self: 'text-[hsl(var(--self))] bg-[hsl(var(--self))]/20',
    custom: 'text-gray-600 bg-gray-200',
  };
  return colors[category] || colors.custom;
}

export function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust so week starts on Monday
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function getDefaultSteps(category: string): string[] {
  const defaultSteps: Record<string, string[]> = {
    house: [
      "Gather supplies",
      "Clear surfaces",
      "Work top to bottom",
      "Put things away",
      "Quick final sweep",
    ],
    meals: [
      "Check what ingredients you have",
      "Decide on the meal",
      "Prep ingredients",
      "Cook",
      "Clean up as you go",
    ],
    kids: [
      "Get their attention",
      "Explain what's happening",
      "Do the thing together",
      "Praise cooperation",
      "Reset for next activity",
    ],
    errands: [
      "Make a quick list",
      "Grab bags/wallet/keys",
      "Load car or plan route",
      "Go and do it",
      "Unpack when home",
    ],
    self: [
      "Give yourself permission",
      "Set a timer if needed",
      "Do the thing fully",
      "Notice how it feels",
      "Carry that feeling forward",
    ],
  };
  return defaultSteps[category] || ["Get started", "Keep going", "Finish up"];
}
