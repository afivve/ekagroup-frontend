<script>
  // @ts-nocheck

  import Plus from "$lib/svg/plus.svelte";

  import Bell2 from "$lib/svg/bell2.svelte";
  import { fade, fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  import TambahRencanaKerja from "$lib/compo/tambah_rencana_kerja.svelte";
  import {
    currentOpenTambahRk,
    open_pop_tambah_rk,
  } from "$lib/stores/openPopRenKer";
  import Edit from "$lib/svg/edit.svelte";
  import RencanaKerjaRow from "$lib/compo/rencana_kerja_row.svelte";
  import {
    currentOpenUpCapaian,
    open_pop_up_capaian,
  } from "$lib/stores/openPopTarget";
  import UploadCapaianTarget from "$lib/compo/upload_capaian_target.svelte";
  import { Falidate } from "$lib/dependedncies/falidate_session_login";
  import { GetCookie } from "$lib/stores/cokies";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { breadcrumbs } from "$lib/stores/breadcrumb";
  import { user } from "$lib/stores/userLogin";
  import { divisi } from "$lib/stores/divisi";

  let accessKey = "";
  /**
   * @type {any[]}
   */
  let rencanaKerjas = [];

  let target = {};
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
          id_target: parseInt($page.params.id_target),
          bebas: 0,
        }),
        credentials: "include",
      }
    );
    if (response.ok) {
      let renker = await response.json();
      rencanaKerjas = renker.data;

      console.log(rencanaKerjas);
    }
  };

  const get_target = async () => {
    // @ts-ignore
    accessKey = GetCookie("accesskey");
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/target/get_target`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessKey,
        },
        body: JSON.stringify({
          id_target: parseInt($page.params.id_target),
        }),
        credentials: "include",
      }
    );
    if (response.ok) {
      let targett = await response.json();
      target = targett.data;
    }
  };
  let persen = "w-[" + "60" + "%]";
  onMount(async () => {
    await Falidate();

    await get_renkers();
    await get_target();
    persen = "w-[" + target.progres.toString() + "%]";

    const idKaryawan = $user.id_karyawan;
    const idDivisi = target.id_divisi;

    breadcrumbs.set([
      { label: "Dashboard", href: `/${idKaryawan}/dashboard_direksi` },
      {
        label: `Divisi`,
        href: `/${idKaryawan}/dashboard_divisi/${idDivisi}`,
      },
      {
        label: `Target`,
        href: `#`,
      },
    ]);
  });
</script>

<h2 class=" mt-24 w-full p-2 text-lg text-center">Target divisi markrting</h2>
<div class="flex text-gray-700 p-5 w-fullh-40 mt-3 bg-slate-50 flex-col mx-2.5">
  <h3>{target.judul}</h3>
  <div class="  h-full w-fuull flex">
    <div class=" w-7/12 pr-3 text-xs mt-3">{target.deskripsi}</div>
    <div class=" border-l w-5/12 p-2 h-[80%] mt-2 flex justify-center flex-col">
      <button
        on:click={() => {
          currentOpenUpCapaian(true);
        }}
        class=" text-xxs BtnSubmitMini w-auto p-1 mb-2">update capaian</button
      >
      <h6>KPI : {target.kpi}</h6>

      <h6 class=" text-xxs mt-2">persentase capaian {target.progres}%</h6>
      <div class=" w-28 h-1 bg-slate-200">
        <div class=" h-1 bg-green-500" style="width: {target.progres}%;"></div>
      </div>
      <h6 class=" text-xxs mt-2">diperbarui 10 september</h6>
    </div>
  </div>
</div>

<!-- rencana kerja -->
<!-- llist rencana kerja-->
<div class=" container p-5">
  <h5 class="ml-2 mb-2 text-gray-500 text-center text-sm">rencana kerja</h5>

  {#each rencanaKerjas as rk}
    <RencanaKerjaRow rencana_kerja={rk}></RencanaKerjaRow>
  {/each}
  <!-- card -->

  <!-- <div class=" w-full flex justify-center"> <a href="/#" class=" text-xxs text-blue-500 mt-2">lihat lebih banyak v</a></div> -->
</div>

<button
  on:click={() => {
    currentOpenTambahRk(true);
  }}
  class=" fixed w-10 h-10 bg-red-400 rounded-full bottom-2 right-2"
  ><Plus ukuran="w-10 h-10" warna="stroke-white"></Plus></button
>

<!-- pop up tambah Rencana kerja -->
{#if $open_pop_tambah_rk}
  <TambahRencanaKerja></TambahRencanaKerja>
{/if}

{#if $open_pop_up_capaian}
  <UploadCapaianTarget {target}></UploadCapaianTarget>
{/if}
