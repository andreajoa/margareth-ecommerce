import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getProductHandle(product) {
  // Extract handle from product
  if (!product) return null;
  
  // If product is already a handle string
  if (typeof product === 'string') return product;
  
  // If product is an object with handle property
  if (product.handle) return product.handle;
  
  // If product has id, extract handle from it
  if (product.id) {
    const parts = product.id.split('/');
    return parts[parts.length - 1];
  }
  
  return null;
}
