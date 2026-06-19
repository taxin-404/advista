import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function calculateEndDate(
  start: Date,
  type: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY",
  value: number = 1
): Date {
  const end = new Date(start);
  switch (type) {
    case "DAILY":
      end.setDate(end.getDate() + value);
      break;
    case "WEEKLY":
      end.setDate(end.getDate() + 7 * value);
      break;
    case "MONTHLY":
      end.setMonth(end.getMonth() + value);
      break;
    case "YEARLY":
      end.setFullYear(end.getFullYear() + value);
      break;
  }
  return end;
}
