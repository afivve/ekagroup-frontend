<script type="text/javascript">
  // @ts-nocheck
  // @ts-ignore
  import Plus from "$lib/svg/plus.svelte";
  import { circInOut, quintOut } from "svelte/easing";
  import { json } from "@sveltejs/kit";
  import Person from "$lib/svg/person.svelte";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  import TambahTugas from "$lib/compo/tambah_tugas.svelte";
  import { Falidate } from "$lib/dependedncies/falidate_session_login";
  import {
    open_pop_tg,
    currentOpenTambahTugas,
    currentPelaksanaRow,
  } from "$lib/stores/openPopTugas";
  import {
    open_catatan,
    currentOpenCatatan,
    open_report,
    currentOpenReport,
  } from "$lib/stores/openPopRenKer";
  import Edit from "$lib/svg/edit.svelte";
  import TugasRow from "$lib/compo/tugas_row.svelte";
  import CatatanRk from "$lib/compo/catatan_rk.svelte";
  import ReportRenKer from "$lib/compo/report_ren_ker.svelte";
  import { GetCookie } from "$lib/stores/cokies";
  import { user } from "$lib/stores/userLogin";
  import { breadcrumbs } from "$lib/stores/breadcrumb";
  import { divisi } from "$lib/stores/divisi";
  import { updateRencanaKerja } from "$lib/stores/rencanaKerja";
  import toast from "svelte-french-toast";

  // data  dari server

  const my_id = "400a";
  let catatans = [];
  let tugases = [];
  let accessKey = "";
  let renker = {};
  let karyawans = [];

  const get_tugass = async () => {
    console.log("Cekkkk");
    accessKey = GetCookie("accesskey");
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/tugas/get_tugases`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessKey,
        },
        body: JSON.stringify({
          id_renker: parseInt($page.params.id_rk),
          bebas: 0,
        }),
        credentials: "include",
      }
    );
    if (response.ok) {
      let tugas = await response.json();
      tugases = tugas.data;
    }
    console.log("tugases");
    console.log(tugases);
  };

  const get_renker = async () => {
    accessKey = GetCookie("accesskey");
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/rencana_kerja/get_rencana_kerja`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessKey,
        },
        body: JSON.stringify({
          id_renker: parseInt($page.params.id_rk),
        }),
        credentials: "include",
      }
    );
    if (response.ok) {
      let renker_ = await response.json();
      renker = renker_.data;
      updateRencanaKerja(renker_.data);
      console.log("DATA RENKER", renker);
    }
  };

  const get_catatan = async () => {
    accessKey = GetCookie("accesskey");
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/catatan_renker/get_catatan_renkers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessKey,
        },
        body: JSON.stringify({
          id_renker: parseInt($page.params.id_rk),
        }),
        credentials: "include",
      }
    );
    if (response.ok) {
      let catatan_ = await response.json();
      catatans = catatan_.data.data;
      console.log("ini hasil fecth catatan renker", catatan_);
    }
  };

  const get_karyawans = async () => {
    // @ts-ignore
    if (!renker) {
      toast.error("rencana kerja tidak yes");
    }
    accessKey = GetCookie("accesskey");
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/karyawan/get_karyawans`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessKey,
        },
        body: JSON.stringify({
          divisi: renker.id_divisi.toString(),
        }),
        credentials: "include",
      }
    );
    if (response.ok) {
      let karyawans_ = await response.json();
      karyawans = karyawans_.data.data;
    }
  };

  // console.log("LUAR MOUNT STORE USER =====", $user);
  // console.log("LUAR MOUNT STORE DIVISI =====", $divisi);

  onMount(async () => {
    await Falidate();
    await get_tugass();
    await get_renker();
    await get_catatan();
    await get_karyawans();
    // @ts-ignore
    currentPelaksanaRow([
      { nama: "alpen", id: "A004", atribute: "" },
      { nama: "devi", id: "A005", atribute: "" },
      { nama: "nanang", id: "A003", atribute: "" },
      { nama: "sibon", id: "A006", atribute: "" },
    ]);

    const idKaryawan = $user.id_karyawan;
    const namaDivisi = $divisi.nama_divisi;
    /*  const idDivisi = $divisi.id_divisi; */
    const idDivisi = renker.id_divisi;
    const userAccess = $user.access;

    if (userAccess === 2) {
      breadcrumbs.set([
        {
          label: `Dashboard`,
          href: `/${idKaryawan}/dashboard_divisi/${idDivisi}`,
        },
        {
          label: `RenKer`,
          href: `#`,
        },
      ]);
    } else {
      breadcrumbs.set([
        {
          label: `Dashboard`,
          href: `/${idKaryawan}/dashboard_direksi`,
        },
        {
          label: `Divisi`,
          href: `/${idKaryawan}/dashboard_divisi/${idDivisi}`,
        },
        {
          label: `RenKer`,
          href: "#",
        },
      ]);
    }
  });

  const KPI = "omset 200 jt bulan september 2024";
</script>

<div
  class=" mt-24 rencanakerja_card p-1 px-5 my-2 w-full bg-white flex flex-col rounded-lg"
>
  <h6 class=" text-sm mb-3">Rencana Kerja</h6>
  <div class=" flex w-full justify-between">
    <h3 class=" text-lg">{renker.judul}</h3>

    <div
      class=" p-2 h-3 rounded bg-green-400 text-xxs text-center flex items-center justify-center text-white"
    >
      Setujui
    </div>
  </div>
  <div class=" flex w-full justify-between text-xs mt-2 text-gray-600">
    {#if renker.deadline && renker.start_date}
      <h3>mulai : {renker.start_date.substr(0, 10)}</h3>
      <h3>deadline : {renker.deadline.substr(0, 10)}</h3>
    {/if}
    <div class="flex flex-col">
      <h5 class="text-xxs">progres kerja {renker.progres}%</h5>
      <div name="progres" class=" mt-1 w-28 h-1 bg-slate-200">
        <div class=" h-1 bg-green-500" style="width: {renker.progres}%;"></div>
      </div>
    </div>
  </div>
  <h3 class="mt-4 text-xs">deskripsi :</h3>
  <p class=" text-sm">{renker.deskripsi}</p>

  <h3 class="mt-4 text-xs">KPI :</h3>
  <p class=" text-sm">{renker.kpi}</p>
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
    class=" w-32 bg-blue-400 p-1 text-center rounded-lg text-white font-semibold uppercase"
  >
    report & status
  </button>
</div>
<div class=" w-full flex flex-col p-5">
  <label for=" " class=" w-full text-center my-2"> Tugas-Tugas</label>
  <div class=" wfull flex text-xxs justify-around w-full bg-slate-50 px-5 py-2">
    <label for=""> cari berdasarkan</label>
    <div class=" flex">
      <Person kelas="w-5 h-5 fill-gray-500"></Person>
      <select class=" mx-1" name="person" id="">
        <option value="semua">semua</option>
        <option value="alpen">alpen</option>
        <option value="sibon">sibon</option>
      </select>
    </div>

    <select name="status">
      <option value="berjalan">berjalan</option>
      <option value="berjalan">menunggu</option>
      <option value="berjalan">selesai</option>
      <option value="berjalan">ditunda</option>
    </select>
  </div>

  {#each tugases as tugas}
    <TugasRow {tugas} {karyawans}></TugasRow>
  {/each}
</div>

<button
  on:click={() => {
    currentOpenTambahTugas(true);
  }}
  class=" fixed w-10 h-10 bg-red-400 rounded-full bottom-2 right-2"
  ><Plus ukuran="w-10 h-10" warna="stroke-white"></Plus></button
>

<!-- pop up tambah Rencana kerja -->
{#if $open_pop_tg}
  <TambahTugas {renker} {karyawans}></TambahTugas>
{/if}

{#if $open_catatan}
  <CatatanRk {catatans}></CatatanRk>
{/if}

{#if $open_report}
  <ReportRenKer {renker}></ReportRenKer>
{/if}
