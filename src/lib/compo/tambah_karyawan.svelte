<script>
  // @ts-nocheck

  import { circInOut, quintOut } from "svelte/easing";
  import Check from "$lib/svg/check.svelte";

  import { fly, slide } from "svelte/transition";
  import Dropdown from "$lib/svg/dropdown.svelte";
  import { writable } from "svelte/store";
  import { page } from "$app/stores";
  import { loadinge } from "$lib/stores/load";
  import { Falidate } from "$lib/dependedncies/falidate_session_login";
  import { GetCookie } from "$lib/stores/cokies";
  import { onMount } from "svelte";
  import {
    currentOpenTambahKaryawan,
    open_pop_tambah_karyawan,
  } from "$lib/stores/openPopKaryawan";
  import toast from "svelte-french-toast";

  // form pengisian
  let openform = false;
  let opDdDivisi = false;
  let Divisi = [
    { nama: "alpen", id: "A004", atribut: "text-black stroke-green-400" },
    { nama: "devi", id: "A005", atribut: "text-black stroke-green-400" },
    { nama: "nanang", id: "A003", atribut: "text-black stroke-green-400" },
    { nama: "sibon", id: "A006", atribut: "text-black stroke-green-400" },
  ];
  /**
   * @type {any[]}
   */

  export let divisies;

  let id_karyawan = "";
  let nik = "";
  let full_name = "";
  let alamat = "";
  let jenis_kelamin = "";
  let divisi;
  let jabatan;

  let nama_divisi = "";

  let accessKey = "";
  let is_lengkap = true;

  const post_add_karyawan = async () => {
    loadinge(true);
    Falidate();
    accessKey = GetCookie("accesskey");

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/karyawan/karyawan_add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessKey,
        },
        credentials: "include",
        body: JSON.stringify({
          id_karyawan,
          nik,
          full_name,
          alamat,
          jenis_kelamin,
          divisi,
          jabatan,
        }),
      }
    );
    if (response.ok) {
      toast.success("berhasil menambahkan karyawan");
      location.reload();
    } else {
      const errore = await response.json();
      const erore = errore.detail;
      toast.error(`terjadi kesalahan, ${erore}`);
      loadinge(false);
    }
  };

  const divisi_change = (id_divisi) => {
    is_lengkap = false;
    divisi = id_divisi;
    nama_divisi = divisies.filter(
      (divisies) => divisies.id_divisi == id_divisi
    )[0].nama_divisi;
  };

  onMount(async () => {});
</script>

<div
  transition:fly={{
    delay: 250,
    duration: 700,
    x: 0,
    y: 900,
    opacity: 0.5,
    easing: quintOut,
  }}
  id="popaddrk"
  class=" flex fixed w-screen h-screen max-h-screen overflow-y-scroll min-h-screen flex-col pb-20 items-center pt-20 top-0 z-30 backdrop-blur-xl backdrop-brightness-100 bg-gray-200 bg-opacity-5"
>
  <div class="w-80 flex bg-black rounded-3xl p-5 bg-opacity-30 flex-col">
    <h4 class=" text-white text-center w-full">Tambah Karyawan</h4>
    <form action="" class=" flex flex-col form_pop">
      <label for="nama" class=" text-sm text-white mb-1">nama</label>
      <input
        name="nama"
        type="text"
        class=" h-8 rounded-lg px-2 mb-4"
        bind:value={full_name}
      />

      <label for="NIK" class=" text-sm text-white mb-1">NIK</label>
      <input
        name="NIK"
        type="text"
        class=" h-8 rounded-lg px-2 mb-4"
        bind:value={nik}
      />

      <label for="id_karyawan" class=" text-sm text-white mb-1"
        >id karyawan</label
      >
      <input
        name="id_karyawan"
        type="text"
        class=" h-8 rounded-lg px-2 mb-4"
        bind:value={id_karyawan}
      />

      <label for="alamat" class=" text-sm text-white mb-1">alamat</label>
      <input
        name="alamat"
        type="text"
        class=" h-8 rounded-lg px-2 mb-4"
        bind:value={alamat}
      />

      <label for="alamat" class=" text-sm text-white mb-1">jenis_kelamin</label>
      <select
        name="jenis_kelamin"
        class=" h-8 rounded-lg px-2 mb-4"
        bind:value={jenis_kelamin}
        id="jk"
      >
        <option value="Laki-laki">Laki-laki</option>
        <option value="Perempuan">Perempuan</option>
      </select>

      <label for="jabatan" class=" text-sm text-white mb-1">jabatan</label>
      <input
        name="jabatan"
        type="text"
        class=" h-8 rounded-lg px-2 mb-4"
        bind:value={jabatan}
      />

      <label for="pelaksana" class=" text-sm text-white mb-1">divisi </label>

      <div class=" bg-white py-2 rounded-lg px-2 mb-4 cursor-pointer">
        <button
          on:click={() => {
            opDdDivisi = !opDdDivisi;
          }}
          class=" w-full flex justify-between items-center px-2"
        >
          <label for="">{nama_divisi}</label>
          {#if opDdDivisi}
            <div class="rotate-180">
              <Dropdown kelas="w-8 h-8"></Dropdown>
            </div>
          {:else}
            <Dropdown kelas="w-8 h-8"></Dropdown>
          {/if}
        </button>
        {#if opDdDivisi}
          <div
            transition:slide={{
              delay: 250,
              duration: 300,
              easing: circInOut,
              axis: "y",
            }}
            id="dropdownDivisi"
            class=" duration-700 w-full flex-col text-gray-500 flex overflow-hidden"
          >
            {#each divisies as div}
              <button
                on:click={divisi_change(div.id_divisi)}
                id={div.id_divisi}
                class=" p-1 px-5 border-b flex justify-between"
                >{div.nama_divisi}
                <Check kelas="w-5 h-5  " kelas2="stroke-2 "></Check></button
              >
            {/each}
          </div>
        {/if}
      </div>

      <div class=" mt-5 grid grid-cols-2 grid-rows-1 gap-3">
        <button
          on:click={() => {
            currentOpenTambahKaryawan(false);
          }}
          class=" BtnNegative">batal</button
        >
        <button
          id="BtnSubmit"
          type="submit"
          disabled={is_lengkap}
          on:click={() => {
            post_add_karyawan();
          }}
          class="   BtnSubmit w-full h-10">simpan</button
        >
      </div>
    </form>
  </div>
</div>
