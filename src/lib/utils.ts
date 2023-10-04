import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
 return twMerge(clsx(inputs));
}

export function formatDate(date: Date | null) {
 if (!date) return "";
 const options = { day: "numeric", month: "long", year: "numeric" } as const;

 return date.toLocaleDateString("pl-PL", options);
}

export const formatMoney = (amount: number) => {
 return new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
 }).format(amount / 100);
};
