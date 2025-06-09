import type { ClassValue } from 'clsx';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * ### Combines conditional Tailwind class names and resolves conflicts
 *
 * @param {...ClassValue[]} inputs - Class names, booleans, objects, or arrays
 * @returns {string} Merged and deduplicated class string
 * @example
 * cn('p-4', isDark && 'bg-black') // 'p-4 bg-black' if isDark is true, otherwise 'p-4'
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(...inputs));
