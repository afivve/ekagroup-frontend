<script>
  // @ts-nocheck
  import { fade, fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  let openform = false;
  import { currentOpenTambahRk } from "$lib/stores/openPopRenKer";
  import { loadinge } from "$lib/stores/load";
  import { Falidate } from "$lib/dependedncies/falidate_session_login";
  import { GetCookie } from "$lib/stores/cokies";
  import { page } from "$app/stores";
  import { writable } from "svelte/store";
  import toast from "svelte-french-toast";

  let judul = "";
  let deskripsi = writable("");
  let kpi = "";
  let start_date = "";
  let deadline = "";
  let id_divisi = parseInt($page.params.id_divisi);

  let accessKey;
  let id_target = parseInt($page.params.id_target);
  const post_rencana_kerja = async () => {
    loadinge(true);
    Falidate();
    accessKey = GetCookie("accesskey");
    var textatea = document.getElementById("deskripsi");
    var deskripsi = textatea.value;

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/rencana_kerja/add_rencana_kerja`,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessKey,
        },
        credentials: "include",
        body: JSON.stringify({
          judul,
          deskripsi,
          kpi,
          start_date,
          deadline,
          id_target,
        }),
      }
    );
    if (response.ok) {
      toast.success("berhasil menambahkan target");
      location.reload();
    } else {
      toast.error("terjadi kesalahan");
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
  id="popaddrk"
  class=" flex fixed w-screen h-screen max-h-screen overflow-y-scroll flex-col items-center pt-20 top-0 z-30 backdrop-blur-xl backdrop-brightness-100 bg-gray-200 bg-opacity-5"
>
  <div class="w-80 flex bg-black rounded-3xl p-5 bg-opacity-30 flex-col">
    <h4 class=" text-white text-center w-full">Tambah rencana kerja</h4>
    <form action="" class=" flex flex-col">
      <label for="judul" class=" text-sm text-white mb-1">judul</label>
      <input
        name="judul"
        type="text"
        class=" h-8 rounded-lg px-2 mb-4"
        bind:value={judul}
      />

      <label for="deskripsi" class=" text-sm text-white mb-1">deskripsi</label>
      <textarea
        name="deskripsi"
        class=" min-h-20 rounded-lg px-2 mb-4"
        id="deskripsi"
      >
      </textarea>

      <label for="kpi" class=" text-sm text-white mb-1">KPI</label>
      <input
        name="kpi"
        type="text"
        class=" h-8 rounded-lg px-2 mb-4"
        bind:value={kpi}
      />

      <label for="start_date" class=" text-sm text-white mb-1">mulai</label>
      <input
        name="start_date"
        type="date"
        class=" h-8 rounded-lg px-2 mb-4"
        bind:value={start_date}
      />

      <label for="kpi" class=" text-sm text-white mb-1">deadline</label>
      <input
        name="kpi"
        type="date"
        class=" h-8 rounded-lg px-2 mb-4"
        bind:value={deadline}
      />
      <div class=" mt-5 grid grid-cols-2 grid-rows-1 gap-3">
        <button
          on:click={() => {
            currentOpenTambahRk(false);
          }}
          class=" BtnNegative">batal</button
        >
        <button
          type="submit"
          on:click={() => {
            post_rencana_kerja();
          }}
          class=" BtnSubmit w-full h-10">simpan</button
        >
      </div>
    </form>
  </div>
</div>
