<script>
  // @ts-nocheck

  import Delete from "$lib/svg/delete.svelte";
  import Plus from "$lib/svg/plus.svelte";
  import X from "$lib/svg/X.svelte";
  import { quintOut } from "svelte/easing";
  import { blur, fly } from "svelte/transition";
  import { slide } from "svelte/transition";
  import { circInOut } from "svelte/easing";

  import { user } from "$lib/stores/userLogin";
  import {
    open_pop_up_capaian,
    currentOpenUpCapaian,
  } from "$lib/stores/openPopTarget";
  import DownloadFile from "./download_file.svelte";

  let tambah_open = false;
  let rotate = 0;

  let catatan_baru = "";
  export let target;

  //   status report 0 = belum acc 1 , 1 = belum acc 2 , 2 = acc 2, 3 = dilaksanakan , 4 = uploaded (pengajuan selesai)  ,5 tolak revisi  6 = tolak selesai , 7 terima selesai,
  let status_report = target.status;
  //  status_report = 2
  let access_user = $user.access;

  let report_files;

  let prosentase = 30;
  let prosentase_change = false;
  let accessKey = "";
  let id_target = $page.params.id_target;

  let values_to_update = { id_target: target.id_target };

  import { Falidate } from "$lib/dependedncies/falidate_session_login";
  import { loadinge } from "$lib/stores/load";
  import { GetCookie } from "$lib/stores/cokies";
  import { page } from "$app/stores";
  import toast from "svelte-french-toast";

  const update_capaian = async (key, value) => {
    loadinge(true);
    Falidate();
    values_to_update[key] = value;

    accessKey = GetCookie("accesskey");
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/target/update_target`,
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
      toast.success("berhasil update progres");
      location.reload();
    } else {
      toast.error("terjadi kesalahan");
    }
  };

  const upload_file_report = async () => {
    loadinge(true);
    Falidate();
    accessKey = GetCookie("accesskey");
    let data = new FormData();
    var input = document.querySelector("#file_report");
    const file = input.files[0];
    // console.log(file);
    var blob = file.slice(0, file.size, { type: file.type });
    var newFile = new File(
      [blob],
      target.id_target.toString() + "_target_" + file.name,
      { type: file.type }
    );
    if (newFile.size < 3000000) {
      data.append("file", newFile);
      console.log(newFile);
      const request = new XMLHttpRequest();
      request.open(
        "POST",
        `${import.meta.env.VITE_API_BASE_URL}/target/upload_file_target`
      );
      request.send(data);
      request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const obj = JSON.parse(this.responseText);
          values_to_update["status"] = 4;
          update_capaian("file_name", obj.file_name);
        }
      };
    } else {
      toast.error("ukuran file terlalu besar !<br> maksimal 3 MB");
    }
    loadinge(false);
  };

  const download_file_report = async () => {
    loadinge(true);
    // Falidate()
    accessKey = GetCookie("accesskey");
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/divisi/report?file=` +
        target.file_name +
        "&type=target",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessKey,
        },
        credentials: "include",
      }
    )
      .then((res) => res.blob())
      .then((blob) => {
        var file = window.URL.createObjectURL(blob);
        window.location.assign(file);
      });

    loadinge(false);
    if (!response.ok) {
      toast.error("gagal mengunduh file");
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
  <div class=" w-80 h-10 flex justify-end items-end">
    <div class=" flex">
      <div class=" w-5 h-5 bg-black aux-container bg-opacity-40 self-end"></div>
      <button
        on:click={() => {
          currentOpenUpCapaian(false);
        }}
        class=" h-10 w-10 bg-black rounded-t-2xl bg-opacity-40 flex justify-center items-end"
      >
        <X></X>
      </button>
    </div>
  </div>
  <div
    class="w-80 flex text-white bg-black rounded-tl-3xl rounded-b-3xl p-5 bg-opacity-40 flex-col items-center"
  >
    <div class="flex flex-col items-center w-full justify-center">
      <h4
        class=" w-full text-center pb-1 border-b border-white text-white font-semibold mb-3"
      >
        {#if status_report == 0}upload report{:else}lihat report{/if}
      </h4>
      <p class=" pb-2 mb-4 text-white border-b border-white">
        KPI : {target.kpi} | {target.status}
      </p>

      {#if access_user == 2}
        <!-- jika access manager -->
        {#if status_report == 2}
          <button
            on:click={() => {
              update_capaian("status", 3);
            }}
            class=" BtnSubmit w-32 mt-3 h-10">laksanakan</button
          >
        {:else if status_report == 3 || status_report == 5}
          {#if status_report == 5}
            <h3 class=" mb-3 bg-yellow-300 text-black p-1 px-3">
              Pelaksanaan ditolak dan anda harus merevisi!
            </h3>
          {/if}
          <!-- form upload report -->
          <h3 class="mb-2">Upload File Report Target</h3>
          <label
            for="file_report"
            class=" w-32 h-28 bg-white flex justify-center items-center rounded-2xl"
          >
            <Plus ukuran="w-20 h-20" warna="stroke-gray-700 "></Plus></label
          >
          <input
            bind:files={report_files}
            type="file"
            name="file_report"
            id="file_report"
            class=" hidden"
          />
          <button
            type="submit"
            on:click={() => {
              upload_file_report();
            }}
            disabled={report_files == null}
            class=" BtnSubmit w-32 mt-3 h-10">simpan</button
          >
        {:else if status_report == 4}
          <h3 class=" text-center mb-3">
            Anda telah mengunggah file report , silahkan tunggu review dari
            Audit
          </h3>
          <button
            on:click={() => {
              download_file_report();
            }}
            class=" w-60 h-10 bg-cyan-400 rounded-lg flex justify-around text-base items-center"
          >
            <h5 class=" border-r border-white px-5">download file</h5>
            <DownloadFile ukuran="w-8 h-8"></DownloadFile></button
          >
        {:else if status_report == 6}
          <h3>tugas telah selesai dan mencapai target</h3>
        {:else if status_report == 7}
          <h3>tugas telah selesai dan tidak mencapai target</h3>
        {/if}
      {:else if access_user == 3}
        <!-- jika access audit -->
        {#if status_report == 0}
          <h3>direksi membuat target</h3>
          <div class=" w-full flex text-xxs justify-around mt-8">
            <button
              on:click={() => {
                update_capaian("status", 1);
              }}
              class=" Btn bg-green-500 p-2 w-32 my-1"
            >
              terima
            </button>
            <button
              on:click={() => {
                update_capaian("status", 0);
              }}
              class=" Btn bg-red-500 p-2 w-32 my-1"
            >
              tolak
            </button>
          </div>
        {:else if status_report < 4}
          <h3 class=" text-center">menunggu manager menyelesaikan tuugas</h3>
        {:else if status_report == 4}
          <!-- aksi setelah report -->
          <h3 class=" text-center mb-3">
            Manager telah mengunggah file report , silahkan review dari Audit
          </h3>
          <button
            on:click={() => {
              download_file_report();
            }}
            class=" w-60 h-10 bg-cyan-400 rounded-lg flex justify-around text-base items-center"
          >
            <h5 class=" border-r border-white px-5">download file</h5>
            <DownloadFile ukuran="w-8 h-8"></DownloadFile></button
          >
          <div class=" w-full flex text-xxs justify-between mt-8">
            <button
              on:click={() => {
                update_capaian("status", 7);
              }}
              class=" Btn bg-green-500 p-2 my-1"
            >
              terima & selesai
            </button>
            <button
              on:click={() => {
                update_capaian("status", 6);
              }}
              class=" Btn bg-red-500 p-2 my-1"
            >
              tolak & selesai
            </button>
            <button
              on:click={() => {
                update_capaian("status", 5);
              }}
              class=" Btn bg-yellow-500 p-2 my-1"
            >
              tolak & revisi
            </button>
          </div>

          <!-- update prosentase capaian (audit) -->
          <div class=" flex w-full p-2 mt-3 flex-col">
            <h4 class=" ">prosentase capaian %{target.progres}</h4>
            <input
              on:change={() => {
                prosentase_change = true;
              }}
              type="range"
              max="100"
              min="0"
              bind:value={target.progres}
              class="my-2"
            />
            <button
              on:click={() => {
                update_capaian("progres", target.progres);
              }}
              disabled={!prosentase_change}
              class=" BtnSubmit">update</button
            >
          </div>
        {:else if status_report == 5}
          <h3>
            Manager sedang merevisi pekerjaan, silahkan tunggu manager
            menyelesaikan tugas
          </h3>
        {:else if status_report == 6}
          <h3>tugas telah selesai dan mencapai target</h3>
        {:else if status_report == 7}
          <h3>tugas telah selesai dan tidak mencapai target</h3>
        {/if}
      {:else if access_user == 4}
        <!-- jika access audit -->
        {#if status_report == 0}
          <h3 class=" text-center">menunggu audit mmeneyetujui YEs</h3>
        {:else if status_report == 2}
          <h3 class=" text-center">menunggu manager melaksanakan tugas</h3>
        {:else if status_report == 4}
          <!-- aksi setelah report -->
          <h3 class=" text-center mb-3">
            Manager telah mengunggah file report , silahkan review dari direksi
          </h3>
          <button
            on:click={() => {
              download_file_report();
            }}
            class=" w-60 h-10 bg-cyan-400 rounded-lg flex justify-around text-base items-center"
          >
            <h5 class=" border-r border-white px-5">download file x</h5>
            <DownloadFile ukuran="w-8 h-8"></DownloadFile></button
          >
        {:else if status_report == 5}
          <h3>
            Manager sedang merevisi pekerjaan, silahkan tunggu manager
            menyelesaikan tugas
          </h3>
        {:else if status_report == 6}
          <h3>tugas telah selesai dan mencapai target</h3>
        {:else if status_report == 7}
          <h3>tugas telah selesai dan tidak mencapai target</h3>
        {/if}
      {/if}
    </div>
  </div>
</div>
<div
  transition:blur={{ amount: 10, duration: 300 }}
  class=" w-screen h-screen fixed top-0 right-0 z-30 backdrop-blur-lg"
></div>
