<script>
  // @ts-nocheck

  import { fade, fly, blur } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import Delete from "$lib/svg/delete.svelte";

  /**
   * @type {any}
   */
  export let rencana_kerja = {};
  import {
    currentOpenTambahRk,
    currentOpenEditRk,
    currentOpenElementEditId,
  } from "$lib/stores/openPopRenKer";

  import { writable } from "svelte/store";
  import { page } from "$app/stores";
  import { loadinge } from "$lib/stores/load";
  import { Falidate } from "$lib/dependedncies/falidate_session_login";
  import { GetCookie } from "$lib/stores/cokies";

  import toast, { Toaster } from "svelte-french-toast";

  let accessKey = "";
  let values_to_update = { id_renker: rencana_kerja.id_renker };
  let deskripsi = writable("");
  let judul = "";
  let kpi = "";
  let start_date = "";
  let deadline = "";
  let is_lengkap = true;

  const post_edit_renker = async () => {
    loadinge(true);
    Falidate();
    accessKey = GetCookie("accesskey");
    //  var textatea = document.getElementById("deskripsi")
    //  var deskripsi = textatea.value

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/rencana_kerja/update_rencana_kerja`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessKey,
        },
        credentials: "include",
        body: JSON.stringify(values_to_update),
      }
    );
    if (response.ok) {
      toast.success("berhasil update rencana kerja");
      location.reload();
    } else {
      toast.error("terjadi kesalahan");
      loadinge(false);
    }
  };

  let date = rencana_kerja.deadline.slice(0, 10);

  const value_change = (key, value) => {
    values_to_update[key] = value;
    is_lengkap = false;
    console.log(values_to_update);
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
  class="  fixed w-screen h-screen max-h-screen overflow-y-scroll form_pop flex left-0 flex-col items-center pt-20 top-0 z-40"
>
  <div class=" w-80 h-10 flex justify-end items-end">
    <div class=" w-5 h-5 bg-black aux-container bg-opacity-40"></div>
    <div
      class=" h-10 w-10 bg-black rounded-t-2xl bg-opacity-40 flex justify-center items-end"
    >
      <Delete dimensi="w-8 h-8" color="stroke-white"></Delete>
    </div>
  </div>
  <div
    class="w-80 flex bg-black rounded-b-3xl rounded-l-3xl p-5 bg-opacity-40 flex-col"
  >
    <h4 class=" text-white text-center w-full text-base">Edit rencana kerja</h4>
    <form action="" class=" flex flex-col">
      <label for="judul" class=" text-sm text-white mb-1">judul</label>
      <input
        name="judul"
        type="text"
        class=" h-8 rounded-lg px-2 mb-4"
        bind:value={rencana_kerja.judul}
        on:change={() => {
          value_change("judul", rencana_kerja.judul);
        }}
      />

      <label for="deskripsi" class=" text-sm text-white mb-1">deskripsi</label>
      <textarea
        class=" w-full min-h-20 h-auto p-2 mb-4"
        bind:value={rencana_kerja.deskripsi}
        on:change={() => {
          value_change("deskripsi", rencana_kerja.deskripsi);
        }}
      />

      <label for="kpi" class=" text-sm text-white mb-1">KPI</label>
      <input
        name="kpi"
        type="text"
        class=" h-8 rounded-lg px-2 mb-4"
        bind:value={rencana_kerja.kpi}
        on:change={() => {
          value_change("kpi", rencana_kerja.kpi);
        }}
      />

      <label for="deadline" class=" text-sm text-white mb-1">deadline</label>
      <input
        name="deadline"
        type="date"
        class=" h-8 rounded-lg px-2 mb-4"
        value={date}
        on:input={(e) => (date = e.target.value || date)}
        on:change={() => {
          value_change("deadline", date);
        }}
      />
      <div class=" mt-5 grid grid-cols-2 grid-rows-1 gap-3">
        <button
          on:click={() => {
            currentOpenElementEditId("false");
          }}
          class=" BtnNegative">batal</button
        >
        <button
          type="submit"
          on:click={() => {
            post_edit_renker();
          }}
          disabled={is_lengkap}
          class=" BtnSubmit w-full h-10">simpan</button
        >
      </div>
    </form>
  </div>
</div>

<div
  transition:blur={{ amount: 10, duration: 300 }}
  class=" w-screen h-screen fixed top-0 right-0 z-30 backdrop-blur-lg"
></div>
