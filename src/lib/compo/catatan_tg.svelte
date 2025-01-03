<script>
  // @ts-nocheck

  import Delete from "$lib/svg/delete.svelte";
  import Plus from "$lib/svg/plus.svelte";
  import X from "$lib/svg/X.svelte";
  import { quintOut } from "svelte/easing";
  import { blur, fly } from "svelte/transition";
  import { slide } from "svelte/transition";
  import { circInOut } from "svelte/easing";
  import { GetCookie } from "$lib/stores/cokies";
  import { loadinge } from "$lib/stores/load";

  import { currentOpenCatatan } from "$lib/stores/openPopTugas";
  import { page } from "$app/stores";
  import toast from "svelte-french-toast";
  export let catatans = [{}];
  export let id_karyawan;

  let tambah_open = false;
  let rotate = 0;
  let accessKey = "";
  let id_tugas = $page.params.id_tugas;

  let catatan_baru = "";
  const post_catatan = async () => {
    accessKey = GetCookie("accesskey");
    loadinge(true);

    const getuser = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/catatan_tugas/add_catatan_tugas`,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessKey,
        },
        credentials: "include",
        body: JSON.stringify({
          catatan: catatan_baru,
          id_tugas,
          id_karyawan,
        }),
        credentials: "include",
      }
    );
    if (getuser.ok) {
      loadinge(false);
      toast.success("catatan baru ditambahkan ");
      catatans.unshift({ catatan: catatan_baru });
      catatans = catatans;
      console.log("catatans====", catatans);
      catatan_baru = "";
    }
  };
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
  id="popeditrk"
  class=" fixed form_pop flex left-0 w-screen h-screen flex-col items-center pt-20 top-0 z-40"
>
  <div class=" w-80 h-10 flex justify-between items-end">
    <button class=" flex">
      <button
        on:click={() => {
          (tambah_open = !tambah_open), (rotate = rotate < 40 ? 45 : 0);
        }}
        class=" h-10 w-10 bg-black rounded-t-2xl bg-opacity-40 flex justify-center items-end"
      >
        <div class=" rotate-{rotate} transition-all duration-500">
          <Plus ukuran="w-10 h-10" warna="stroke-white"></Plus>
        </div>
      </button>
      <div
        class=" w-5 h-5 bg-black aux-container rotate-90 bg-opacity-40 self-end"
      ></div>
    </button>

    <div class=" flex">
      <div class=" w-5 h-5 bg-black aux-container bg-opacity-40 self-end"></div>
      <button
        on:click={() => {
          currentOpenCatatan(false);
        }}
        class=" h-10 w-10 bg-black rounded-t-2xl bg-opacity-40 flex justify-center items-end"
      >
        <X></X>
      </button>
    </div>
  </div>

  <div class="w-80 flex bg-black rounded-b-3xl p-5 bg-opacity-40 flex-col">
    {#if tambah_open}
      <div
        transition:slide={{
          delay: 250,
          duration: 300,
          easing: circInOut,
          axis: "y",
        }}
        id="dropdownstaff"
        class=" duration-700 w-full flex-col mb-5 text-gray-500 flex overflow-hidden"
      >
        <p class=" w-full capitalize text-white text-center mb-2">
          tambah catatn
        </p>

        <textarea
          class=" rounded-lg w-full min-h-20 h-auto p-2 mb-2"
          bind:value={catatan_baru}
        />
        <button
          disabled={!catatan_baru}
          on:click={() => {
            post_catatan();
          }}
          class=" BtnSubmit w-full p-2">tambah</button
        >
        <!-- <div class=' hidden w-full '>
            <button class=" BtnNegative mr-1">batal</button>
            <button disabled={!catatan_baru} class=" BtnSubmit ml-1 w-full p-2">tambah</button>
         </div>  -->
      </div>
    {/if}
    {#each catatans as catatan}
      <div class="w-full bg-white rounded-lg p-2 my-2">{catatan.catatan}</div>
    {/each}
  </div>
</div>
<div
  transition:blur={{ amount: 10, duration: 300 }}
  class=" w-screen h-screen fixed top-0 right-0 z-30 backdrop-blur-lg"
></div>
