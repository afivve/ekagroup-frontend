<script>
  // @ts-nocheck
  import { goto } from "$app/navigation";
  import { GetCookie } from "$lib/stores/cokies";
  import { json } from "@sveltejs/kit";
  import { Falidate } from "$lib/dependedncies/falidate_session_login";
  import { onMount } from "svelte";
  import RencanaKerjaRow from "$lib/compo/rencana_kerja_row.svelte";
  import {
    currentOpenUpTambahTarget,
    open_pop_up_tambah_target,
  } from "$lib/stores/openPopTarget";
  import Plus from "$lib/svg/plus.svelte";
  import TambahTarget from "$lib/compo/tambah_target.svelte";
  import { page } from "$app/stores";
  import EditRencanaKerja from "$lib/compo/edit_rencana_kerja.svelte";
  import { user } from "$lib/stores/userLogin";

  import { breadcrumbs } from "$lib/stores/breadcrumb";

  import { updateDivisi } from "$lib/stores/divisi";

  let divisi_data = {};
  let refreshKey = "";
  let accessKey = "";

  let targets = [];
  let rencanaKerjas = [];
  let karyawans = [];

  const portal = (id_target) => {
    goto("../target/" + id_target);
  };

  const get_data_divisi = async () => {
    // @ts-ignore
    accessKey = GetCookie("accesskey");
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/divisi/get_divisi`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessKey,
        },
        body: JSON.stringify({
          id_divisi: $page.params.id_divisi,
        }),
        credentials: "include",
      }
    );
    if (response.ok) {
      let divisi_data_ = await response.json();
      divisi_data = divisi_data_.data;
      await updateDivisi(divisi_data);
    }
    console.log("HASIL FETCH DIVISI ", divisi_data);
  };

  const get_data_targets = async () => {
    // @ts-ignore
    accessKey = GetCookie("accesskey");
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/target/get_targets`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessKey,
        },
        body: JSON.stringify({
          id_divisi: parseInt($page.params.id_divisi),
        }),
        credentials: "include",
      }
    );
    if (response.ok) {
      let targets_data = await response.json();
      targets = targets_data.data;
      console.log(targets);
    }
  };

  const get_renkers = async () => {
    // @ts-ignore
    accessKey = GetCookie("accesskey");
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/rencana_kerja/get_rencana_kerjas`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessKey,
        },
        body: JSON.stringify({
          id_divisi: parseInt($page.params.id_divisi),
          bebas: 0,
        }),
        credentials: "include",
      }
    );
    if (response.ok) {
      let renker = await response.json();
      rencanaKerjas = renker.data;
    }
  };

  const get_karyawans = async () => {
    // @ts-ignore
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
          divisi: $page.params.id_divisi,
        }),
        credentials: "include",
      }
    );
    if (response.ok) {
      let karyawans_ = await response.json();
      karyawans = karyawans_.data.data;
      console.log(karyawans.data);
    }
  };

  onMount(async () => {
    await Falidate();
    await get_data_divisi();
    await get_data_targets();
    await get_renkers();
    await get_karyawans();

    const idKaryawan = $user.id_karyawan;
    const userAccess = $user.access;

    if (userAccess === 2) {
      breadcrumbs.set([
        {
          label: `Dashboard`,
          href: `/${idKaryawan}/dashboard_divisi/${divisi_data.id_divisi}`,
        },
      ]);
    } else {
      breadcrumbs.set([
        { label: "Dashboard", href: `/${idKaryawan}/dashboard_direksi` },
        {
          label: `Divisi`,
          href: `/${idKaryawan}/dashboard_divisi/${divisi_data.id_divisi}`,
        },
      ]);
    }
  });
</script>

<div class="w-full flex flex-col text-sm mt-24 pt-2 px-2">
  <!-- Divisi Information -->
  {#if divisi_data && divisi_data.divisi}
    <h1 class="capitalize text-lg text-center my-2">
      Divisi {divisi_data.divisi.nama_divisi}
    </h1>
    <div id="card_div" class="w-full flex p-3 px-5 drop-shadow bg-white h-40">
      <div id="kanan" class="w-[40%]">
        <div class="flex items-center">
          <div class="h-12 w-12 rounded-full bg-gray-400"></div>
          <h4 class="mx-2">{divisi_data.divisi.nama_divisi}</h4>
        </div>
        <h5 class="text-xs mt-3">
          Jumlah karyawan : {divisi_data.divisi.jml_karyawan}
        </h5>
      </div>
      <div class="text-xxs hidden flex-col items-center w-[60%]">
        <p class="text-sm border-b border-slate-400 pb-2">
          {targets.length} target | {rencanaKerjas.length} rencana kerja
        </p>
        <div id="nilai" class="text-center flex flex-col item-center">
          <h4>capaian pelaksanaan tugas</h4>
          <h8 class="text-xxs">bulan september</h8>
          <div class="grid grid-cols-2 grid-row-2 gap-2 mt-1 text-xs">
            <!-- Display targets here if you need to -->
          </div>
          <div class="w-28 mt-2 bg-red-400 text-white rounded">
            10 tugas terhambat
          </div>
        </div>
      </div>
    </div>

    <!-- Target Slide -->
    <div class="w-full my-5 p-3">
      <h3 class="ml-2 text-gray-500">
        {targets.length} target divisi {targets.nama_divisi}
      </h3>
      <div
        class="relative w-full h-40 overflow-x-scroll mt-2 flex items-center"
      >
        <div
          style="width: auto;"
          class="flex absolute w-full h-full items-center px-2"
        >
          {#each targets as target}
            <button
              on:click={() => {
                portal(target.id_target);
              }}
              class="flex text-gray-700 p-2 w-[80vw] md:w-80 h-40 bg-slate-50 flex-col mx-2.5"
            >
              <h3 class="font-bold">{target.judul}</h3>
              <div class="h-full w-fuull flex">
                <div class="min-w-40 pr-3 text-xs mt-3 text-left">
                  {target.deskripsi}
                </div>
                <div
                  class="border-l w-5/12 p-2 h-[80%] mt-2 flex justify-center flex-col"
                >
                  <h6>KPI : {target.kpi}</h6>
                  <h6 class="text-xxxs mt-2">persentase capaian 25%</h6>
                  <div class="w-28 h-1 bg-slate-200">
                    <div class="h-1 w-[25%] bg-green-500"></div>
                  </div>
                  <h6 class="text-xxxs mt-2">diperbarui 10 september</h6>
                </div>
              </div>
            </button>
          {/each}
        </div>
      </div>
    </div>

    <!-- Daftar Anggota -->
    <div class="w-full flex flex-col px-3">
      <h5 class="ml-2 mb-2 text-gray-500">anggota</h5>
      {#each divisi_data.karyawans as karyawan}
        <div class="w-full flex p-1 border-b">
          <div class="w-1/3 h-10 flex items-center border-r border-slate-300">
            <div class="h-8 w-8 bg-slate-400 mx-2 rounded-full"></div>
            <h4>{karyawan.nama.split(" ")[0]}</h4>
          </div>
          <div class="w-2/3 h-10 justify-between flex items-start p-1">
            <h4>{karyawan.jabatan}</h4>
          </div>
        </div>
      {/each}
      <div class="h-20 w-full"></div>
    </div>

    <div class="container p-3">
      <h5 class="ml-2 mb-2 text-gray-500">capaian rencana kerja</h5>
      {#each rencanaKerjas as renker}
        <RencanaKerjaRow rencana_kerja={renker}></RencanaKerjaRow>
      {/each}
    </div>
  {/if}
</div>

{#if $user.access == 4}
  <!-- svelte-ignore missing-declaration -->
  <button
    on:click={() => {
      currentOpenUpTambahTarget(true);
    }}
    class=" fixed w-10 h-10 bg-red-400 rounded-full bottom-2 right-2"
    ><Plus ukuran="w-10 h-10" warna="stroke-white"></Plus></button
  >
{/if}
{#if $open_pop_up_tambah_target}
  <TambahTarget></TambahTarget>
{/if}
