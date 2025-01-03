import { writable } from "svelte/store";

export let open_pop_up_capaian = writable(false);
export let open_pop_up_tambah_target = writable(false);

export const currentOpenUpCapaian = (/** @type {boolean} */ open) => {
  open_pop_up_capaian.update(() => {
    return open;
  });
};

export const currentOpenUpTambahTarget = (/** @type {boolean} */ open) => {
  open_pop_up_tambah_target.update(() => {
    return open;
  });
};
