<script>
  // @ts-nocheck

  import { goto } from "$app/navigation";
  import PersonRow from "$lib/compo/person_row.svelte";
  import { Falidate } from "$lib/dependedncies/falidate_session_login";
  import { GetCookie } from "$lib/stores/cokies";
  import Search from "$lib/svg/search.svelte";
  import { onMount } from "svelte";

  import {
    currentOpenTambahKaryawan,
    open_pop_tambah_karyawan,
  } from "$lib/stores/openPopKaryawan";
  import Plus from "$lib/svg/plus.svelte";
  import TambahKaryawan from "$lib/compo/tambah_karyawan.svelte";
  import { divisi_value, divisies } from "$lib/stores/divisies";
  import { user } from "$lib/stores/userLogin";
  import { breadcrumbs } from "$lib/stores/breadcrumb";

  let accessKey = "";
  let karyawans = [];
  let karyawan_by_divisi = [];

  let is_cari = false;
  let cari_result = [];
  let cari_value = "";

  const portal = () => {
    goto("dashboard_manager");
  };

  const cari_update = () => {
    if (cari_value == "") {
      is_cari = false;
    } else {
      let regex = new RegExp(cari_value, "i");
      is_cari = true;
      cari_result = karyawans.filter((karyawan) => regex.test(karyawan.nama));
    }
  };

  const get_divisies = async () => {
    accessKey = GetCookie("accesskey");
    // console.log(accessKey)
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/divisi/get_divisies`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessKey,
        },
        credentials: "include",
      }
    );

    const content = await response.json();

    $divisies = content.data;
    // console.log(divisies)
  };

  const generate_data_karyawan = async () => {
    let data_divisi = [];
    $divisies.forEach((divisi) => {
      let my_karyawan = karyawans.filter(
        (karyawans) => karyawans.divisi == divisi.id_divisi
      );
      data_divisi.push({
        divisi: {
          nama_divisi: divisi.nama_divisi,
          id_divisi: divisi.id_divisi,
        },
        karyawans: my_karyawan,
      });
    });
    karyawan_by_divisi = data_divisi;
  };

  const get_karyawans = async () => {
    accessKey = GetCookie("accesskey");
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/karyawan/get_karyawans`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessKey,
        },
        body: JSON.stringify({}),
        credentials: "include",
      }
    );
    if (response.ok) {
      let karyawans_ = await response.json();

      karyawans = karyawans_.data.data;
    }
  };

  onMount(async () => {
    await Falidate();
    await get_divisies();
    await get_karyawans();
    await generate_data_karyawan();
    console.log(karyawan_by_divisi);
    const idKaryawan = $user.id_karyawan;
    const userAccess = $user.access;

    if (userAccess === 5) {
      breadcrumbs.set([
        {
          label: `Dashboard`,
          href: `/${idKaryawan}/dashboard_hrga`,
        },
      ]);
    }
  });
</script>

<div
  class=" relative w-full h-24 max-w-screen-md overflow-x-scroll mt-24 flex items-center"
>
  <div
    style=" width: auto;"
    class="flex absolute w-full min-h-20 items-center px-2"
  >
    {#each $divisies as div}
      <div class="flex text-gray-700 items-center min-w-24 flex-col mx-2.5">
        <div class="  h-14 w-14 rounded-full bg-gray-400"></div>
        <ul class=" text-xs max-w-40 h-5 text-nowrap mt-2">
          {div.nama_divisi}
        </ul>
      </div>
    {/each}
  </div>
</div>

<div class=" w-full flex mt-5 px-8">
  <div class=" flex justify-center items-center pl-3 bg-gray-100 rounded-l-lg">
    <Search warna="stroke-gray-400" ukuran="w-6 h-6 "></Search>
  </div>
  <input
    bind:value={cari_value}
    on:keyup={() => {
      cari_update();
    }}
    type="text"
    class="bg-gray-100 outline-none rounded-r-lg h-10 w-full px-3 placeholder:text-lg placeholder:font-light font-light text-lg"
    placeholder="cari karyawan"
  />
</div>

<div class=" w-full flex flex-col text-sm pt-6">
  <!-- inni card jobs divisi report  -->
  {#if !is_cari}
    {#if karyawan_by_divisi.length > 0}
      {#each karyawan_by_divisi as div}
        <div class=" w-full h-16 border-b border-gray-300 px-5 py-7">
          {div.divisi.nama_divisi}
        </div>

        <div class=" w-full flex flex-col pl-3">
          {#each div.karyawans as karyawan}
            <!-- <h1> {karyawan.nama}</h1> -->
            <PersonRow {karyawan}></PersonRow>
          {/each}
        </div>
      {/each}
    {/if}
  {:else}
    <div class=" w-full h-16 border-b border-gray-300 px-5 py-7">Cari</div>
    <div class=" w-full flex flex-col pl-3">
      {#each cari_result as karyawan}
        <!-- <h1> {karyawan.nama}</h1> -->
        <PersonRow {karyawan}></PersonRow>
      {/each}
    </div>
  {/if}
</div>

<!-- svelte-ignore missing-declaration -->
<button
  on:click={() => {
    currentOpenTambahKaryawan(true);
  }}
  class=" fixed w-10 h-10 bg-red-400 rounded-full bottom-2 right-2"
  ><Plus ukuran="w-10 h-10" warna="stroke-white"></Plus></button
>

{#if $open_pop_tambah_karyawan}
  <TambahKaryawan divisies={$divisies}></TambahKaryawan>
{/if}
