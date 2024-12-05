import { writable } from "svelte/store";

// Store to track authentication state
export const authenticated = writable(localStorage.getItem('authenticated') === 'true');

// Function to log the user in
export function login(){
  authenticated.set(true);
  localStorage.setItem('authenticated', 'true');
}

// Function to log the user out
export function logout() {
  authenticated.set(false);
  localStorage.removeItem('authenticated');
  localStorage.clear();
}