import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import bcryptjs from "bcryptjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hashPass = (data: string) => {
  return bcryptjs.hashSync(data, 10);
};
