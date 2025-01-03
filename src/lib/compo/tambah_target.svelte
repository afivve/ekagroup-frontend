<script>
  // @ts-nocheck

  import { fade, fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { Falidate } from "$lib/dependedncies/falidate_session_login";
  let judul = "";
  let deskripsi = writable("");
  let kpi = "";
  let start_date = "";
  let deadline = "";
  let id_divisi = parseInt($page.params.id_divisi);

  let accessKey = "";
  const post_target = async () => {
    loadinge(true);
    Falidate();
    accessKey = GetCookie("accesskey");
    var textatea = document.getElementById("deskripsi");
    var deskripsi = textatea.value;

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/target/add_target`,

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
          id_divisi,
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

  let openform = false;

  import { currentOpenUpTambahTarget } from "$lib/stores/openPopTarget";
  import { writable } from "svelte/store";
  import { GetCookie } from "$lib/stores/cokies";

  import { page } from "$app/stores";
  import { loadinge } from "$lib/stores/load";
  import { text } from "@sveltejs/kit";
  import toast from "svelte-french-toast";
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
    <h4 class=" text-white text-center w-full">Tambah Target</h4>
    <form
      on:submit={() => {
        post_target();
      }}
      class=" flex flex-col"
    >
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

      <label for="deadline" class=" text-sm text-white mb-1">deadline</label>
      <input
        name="deadline"
        type="date"
        class=" h-8 rounded-lg px-2 mb-4"
        bind:value={deadline}
      />

      <div class=" mt-5 grid grid-cols-2 grid-rows-1 gap-3">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          on:click={() => {
            currentOpenUpTambahTarget(false);
          }}
          class=" BtnNegative"
        >
          batal
        </div>
        <button type="submit" class=" BtnSubmit w-full h-10">simpan</button>
      </div>
    </form>
  </div>
</div>
