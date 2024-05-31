import { writable } from 'svelte/store';

export const accType = writable(localStorage.getItem("accType" || ""));
export const user_id = writable(localStorage.getItem("user_id" || ""));