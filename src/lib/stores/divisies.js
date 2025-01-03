import { writable } from "svelte/store";

export let divisies = writable([]);

export const divisi_value = (/** @type {[]} */ open) => {
  divisies.update(() => {
    return open;
  });
};
