// @ts-nocheck
import { writable } from "svelte/store";

export let user = writable({
  id_karyawan: "",
  username: "",
  full_name: "",
  email: "",
  access: 0,
  noWa: "",
  path_foto: "",
  nik: "",
  alamat: "",
  jabatan: "",
  divisi: 0,
  nama_divisi: "",
});

export const resetUser = () => {
  let kosong = {
    id_karyawan: "",
    username: "",
    full_name: "",
    email: "",
    access: 0,
    noWa: "",
    path_foto: "",
    nik: "",
    alamat: "",
    jabatan: "",
    divisi: 0,
    nama_divisi: "",
  };
  updateUser(kosong);
  // console.log("reset user");
};

export let lengkap = writable(false);

export const updateUser = (
  /** @type {{ id_karyawan: string; username: string; full_name: string; email: string; access: number; noWa: string; path_foto: string; nik: string; alamat: string; jabatan: string;   divisi :number ;nama_divisi :string}} */
  target
) => {
  // @ts-ignore
  // console.log(target);

  user.update(() => {
    return target;
  });
};
