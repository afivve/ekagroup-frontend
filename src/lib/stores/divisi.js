// @ts-nocheck
import { writable } from "svelte/store";

export let divisi = writable({
    id_divisi: "",
    jml_karyawan: "",
    manager: "",
    nama_divisi: "",
    path_foto: "",
});

export const resetDivisi = () => {
    let kosong = {
        id_divisi: "",
        jml_karyawan: "",
        manager: "",
        nama_divisi: "",
        path_foto: "",
    };
    updateDivisi(kosong);
    console.log("reset divisi");
};

export let lengkap = writable(false);

export const updateDivisi = (target) => {
    // @ts-ignore
    console.log("divisi.store", target);

    divisi.update(() => {
        return target;
    });
};
