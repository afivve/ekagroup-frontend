// @ts-nocheck
import { writable } from "svelte/store";

export let rencanaKerja = writable({
    catatan: "",
    deadline: "",
    deskripsi: "",
    file_name: "",
    id_divisi: "",
    id_karyawan: "",
    id_renker: "",
    id_tugas: "",
    judul: "",
    kpi: "",
    modifed_at: "",
    pelaksana: "",
    start_date: "",
    status: "",

});

export const resetRencanaKerja = () => {
    let kosong = {
        catatan: "",
        deadline: "",
        deskripsi: "",
        file_name: "",
        id_divisi: "",
        id_karyawan: "",
        id_renker: "",
        id_tugas: "",
        judul: "",
        kpi: "",
        modifed_at: "",
        pelaksana: "",
        start_date: "",
        status: "",

    };
    updateRencanaKerja(kosong);
    console.log("reset rencana kerja");
};

export let lengkap = writable(false);

export const updateRencanaKerja = (target) => {
    // @ts-ignore
    console.log(target);

    rencanaKerja.update(() => {
        return target;
    });
};
