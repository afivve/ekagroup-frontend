// @ts-nocheck
import { goto } from "$app/navigation";
import { logout } from "$lib/stores/cokies";
import { loadinge } from "$lib/stores/load";
import { user } from "$lib/stores/userLogin";
import { onMount } from "svelte";

export const Portal = (
  /** @type {number} */ access,
  /** @type {string} */ id_karyawan,
  /** @type {number} */ divisi
) => {
  // lihat akses sampai sini
  switch (access) {
    // jika akses = 0
    case 0:
      logout();
      // jika akses = 1
      break;
    case 1:
      console.log("masuk ke 1" + divisi);
      goto(
        "/" + id_karyawan + "/dashboard_divisi/" + divisi + "/dashboard_staff"
      );
      break;
    // jika akses = 2
    case 2:
      console.log("masuk ke 2");
      goto("/" + id_karyawan + "/dashboard_divisi/" + divisi);
      break;
    // jika akses = 3
    case 3:
      console.log("masuk ke 3");
      goto("/" + id_karyawan + "/dashboard_direksi/");
      break;

    // setelah masuk ke  dashboard, akan ada tombol ke dasb hrga
    // jika akses = 4
    case 4:
      console.log("masuk ke 4");
      goto("/" + id_karyawan + "/dashboard_direksi");
      break;
    // jika akses = 5
    case 5:
      goto("/" + id_karyawan + "/dashboard_hrga");
      break;
  }
  loadinge(false);
};
