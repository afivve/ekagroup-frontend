<script>
  // @ts-nocheck

  import { page } from "$app/stores";

  import CatatanTg from "$lib/compo/catatan_tg.svelte";
  import ReportTugas from "$lib/compo/report_tugas.svelte";
  import { GetCookie } from "$lib/stores/cokies";
  import {
    currentOpenCatatan,
    currentOpenReport,
  } from "$lib/stores/openPopTugas";
  import { open_catatan, open_report } from "$lib/stores/openPopTugas";
  import { onMount } from "svelte";
  import { Falidate } from "$lib/dependedncies/falidate_session_login";
  import { user } from "$lib/stores/userLogin";
  import { divisi } from "$lib/stores/divisi";
  import { rencanaKerja } from "$lib/stores/rencanaKerja";
  import { breadcrumbs } from "$lib/stores/breadcrumb";

  let catatans = [];

  let KPI = "file konten plan";
  let accessKey = "";
  let tugas = {};

  const get_catatan = async () => {
    accessKey = GetCookie("accesskey");
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/catatan_tugas/get_catatan_tugases`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessKey,
        },
        body: JSON.stringify({
          id_tugas: parseInt($page.params.id_tugas),
        }),
        credentials: "include",
      }
    );
    if (response.ok) {
      let catatan_ = await response.json();
      catatans = catatan_.data.data;
      console.log("FECTH CATATAN======", catatans);
    }
  };

  const get_tugas = async () => {
    console.log("Cekkkk");
    accessKey = GetCookie("accesskey");
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/tugas/get_tugas`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessKey,
        },
        body: JSON.stringify({
          id_tugas: parseInt($page.params.id_tugas),
        }),
        credentials: "include",
      }
    );
    if (response.ok) {
      let tugas_ = await response.json();
      tugas = tugas_.data;
      console.log("INI HASIL TUGAS FETCH", tugas_);
    }
  };

  onMount(async () => {
    await Falidate();
    await get_catatan();
    await get_tugas();

    const idKaryawan = $user.id_karyawan;
    const idDivisi = tugas.id_divisi;
    const idRenker = tugas.id_renker;

    breadcrumbs.set([
      { label: "Dashboard", href: "/A004/dashboard_direksi" },
      {
        label: `Divisi`,
        href: `/${idKaryawan}/dashboard_divisi/${idDivisi}`,
      },
      {
        label: `RenKer`,
        href: `/${idKaryawan}/rencana_kerja/${idRenker}`,
      },
      {
        label: `Tugas `,
        href: `#`,
      },
    ]);
  });
</script>

<div
  class=" mt-24 rencanakerja_card p-1 px-5 my-2 w-full bg-white flex flex-col rounded-lg"
>
  <div class=" w-full flex justify-between">
    <h6 class=" text-sm mb-3">Tugas</h6>
    <div class="flex items-center">
      status :
      <div
        class=" p-2 h-3 rounded ml-2 bg-green-400 text-xxs text-center flex items-center justify-center text-white"
      >
        selesai
      </div>
    </div>
  </div>

  <h3>{tugas.pelaksana}</h3>
  <h3>{tugas.judul}</h3>

  <div class=" flex w-full justify-between text-xs mt-2 text-gray-600">
    {#if tugas.deadline}
      <h3>deadline : {tugas.deadline.substr(0, 10)}</h3>
    {/if}
    <div class="flex flex-col">
      <h5 class="text-xxs">progres kerja {tugas.progres}%</h5>
      <div name="progres" class=" mt-1 w-28 h-1 bg-slate-200">
        <div class=" h-1 bg-green-500" style="width: {tugas.progres}%;"></div>
      </div>
    </div>
  </div>

  <div class="flex w-full justify-around text-xxs mt-3 bg-slate-50"></div>
  <p class=" text-sm mt-4">{tugas.deskripsi}</p>
</div>

<div class=" flex w-full bg-gray-50 p-2 text-xs justify-around">
  <button
    on:click={() => {
      currentOpenCatatan(true);
    }}
    class=" w-20 bg-yellow-400 p-1 text-center rounded-lg text-white font-semibold uppercase"
  >
    catatan
  </button>
  <button
    on:click={() => {
      currentOpenReport(true);
    }}
    class=" w-20 bg-blue-400 p-1 text-center rounded-lg text-white font-semibold uppercase"
  >
    report
  </button>
</div>

{#if $open_report}
  <ReportTugas {tugas}></ReportTugas>
{/if}

{#if $open_catatan}
  <CatatanTg {catatans} id_karyawan={tugas.id_karyawan}></CatatanTg>
{/if}
