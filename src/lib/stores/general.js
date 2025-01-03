import { writable } from "svelte/store";

export let open_notif = writable(false);
export let open_profile = writable(false);

export const currentOpenNotifPage = (/** @type {boolean} */ open) => {
  open_notif.update(() => {
    return open;
  });
};

export const currentOpenProfile = (/** @type {boolean} */ open) => {
  open_profile.update(() => {
    return open;
  });
};
