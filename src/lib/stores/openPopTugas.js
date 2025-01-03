import { writable } from "svelte/store";

export let open_pop_tg = writable(false);
export let open_pop_edit_tg = writable(0);
export let open_pop_element_id = writable("");
export let pelaksana = writable([]);

export let open_catatan = writable(false);
export let open_report = writable(false);

export let pelaksanaEDit = [{}];

export const currentOpenTambahTugas = (/** @type {boolean} */ open) => {
  open_pop_tg.update(() => {
    return open;
  });
};
export const currentOpenEditTugas = (/** @type {number} */ open) => {
  open_pop_edit_tg.update(() => {
    return open;
  });
};

export const currentOpenElementId = (/** @type {string} */ open) => {
  open_pop_element_id.update(() => {
    return open;
  });
};

export const currentPelaksanaRow = (/** @type {[]} */ pelaksan) => {
  pelaksana.update(() => {
    return pelaksan;
  });
};

export const currentPelaksanaEdit = (/** @type {[]} */ pelaksan) => {
  pelaksana.update(() => {
    return pelaksan;
  });
};

export const currentOpenCatatan = (/** @type {boolean} */ open) => {
  open_catatan.update(() => {
    return open;
  });
};

export const currentOpenReport = (/** @type {boolean} */ open) => {
  open_report.update(() => {
    return open;
  });
};
