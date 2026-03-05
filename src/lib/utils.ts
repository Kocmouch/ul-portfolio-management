import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// resolve a css variable value from :root
export function resolveCssVar(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const val = getComputedStyle(document.documentElement).getPropertyValue(name)?.trim();
  return val || null;
}
