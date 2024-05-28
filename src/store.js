import { writable } from 'svelte/store';

export const accType = writable(localStorage.getItem("accType" || ""));