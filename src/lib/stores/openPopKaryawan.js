import { writable } from "svelte/store";

export let open_pop_tambah_karyawan = writable(false);
export let open_pop_edit_karyawan = writable("");

export const currentOpenTambahKaryawan = (/** @type {boolean} */ open) => {
  open_pop_tambah_karyawan.update(() => {
    return open;
  });
};
export const currentOpenEditKaryawan = (/** @type {String} */ open) => {
  console.log("cek");
  open_pop_edit_karyawan.update(() => {
    return open;
  });
};
