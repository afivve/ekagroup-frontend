<script>
  // @ts-nocheck

  import { circInOut, quintOut } from "svelte/easing";
  import Check from "$lib/svg/check.svelte";

  // @ts-ignore
  // @ts-ignore
  import {
    currentOpenEditTugas,
    pelaksana,
    currentOpenTambahTugas,
    currentOpenElementId,
    open_pop_element_id,
    open_pop_edit_tg,
  } from "$lib/stores/openPopTugas";
  import { fly, slide, blur } from "svelte/transition";
  import Dropdown from "$lib/svg/dropdown.svelte";
  import Delete from "$lib/svg/delete.svelte";
  import { onMount } from "svelte";

  import { open_pop_edit_rk } from "$lib/stores/openPopRenKer";
  import { writable } from "svelte/store";
  import { page } from "$app/stores";
  import { loadinge } from "$lib/stores/load";
  import { Falidate } from "$lib/dependedncies/falidate_session_login";
  import { GetCookie } from "$lib/stores/cokies";
  import toast, { Toaster } from "svelte-french-toast";

  let nama_pelaksana = "";

  /**
   * @type {any}
   */
  export let tugas;
  export let karyawans;

  let staff_sekarang = [];

  if (karyawans) {
    karyawans.slice();
  }

  /**
   * @type {any[]}
   */
  // @ts-ignore

  // @ts-ignore
  // @ts-ignore

  let staf_terpilih_id = [];
  let values_to_update = { id_tugas: tugas.id_tugas };

  let accessKey = "";

  let staf_terpilih_value = "";
  let is_lengkap = true;

  let deskripsi = writable("");
  let judul = "";
  let kpi = "";
  let start_date = "";
  let deadline = "";

  let id_karyawan = "";

  onMount(async () => {
    //falidasi element terpanggil
    //  if($open_pop_element_id == tugas.id ){
    // console.log('cek mount')
    // pelaksan ajammak
    // @ts-ignore
    // for(let x=0;x < tugas.pelaksana.length;x++){
    //     const id_staff = tugas.pelaksana[x].id
    //     console.log(id_staff)
    //     const target = document.getElementById(id_staff)?.classList
    //      staf_terpilih.push(staff.filter( (/** @type {{ id: any; }} */ staff_sekarang) => staff_sekarang.id == id_staff)[0])
    //     // styling
    //     var foundIndex = staff_sekarang.findIndex((/** @type {{ id: any; }} */ x) => x.id == id_staff);
    //     staff_sekarang[foundIndex].atribute = 'text-black stroke-green-500'
    //     is_lengkap = false
    //     // @ts-ignore
    //     nama_pelaksana = staf_terpilih.map(function(item) {
    //                                             return item['nama'];
    //                                             });
    // }
    // }
  });
  // form pengisian

  let opDdStaff = false;

  const updateStaffPilih = (/** @type {string} */ id_staff) => () => {
    // cek id in staf terpilih
    const target = document.getElementById(id_staff)?.classList;

    const target2 = document.getElementById(id_karyawan)?.classList;

    if (id_staff != id_karyawan) {
      target2?.remove("stroke-green-500");
      target2?.remove("text-black");

      target?.add("text-black");
      target?.add("stroke-green-500");

      id_karyawan = id_staff;
      staf_terpilih_value = karyawans.filter(
        (staff) => staff.id_karyawan == id_staff
      )[0].nama;

      is_lengkap = false;
    }

    values_to_update.id_karyawan = id_karyawan;
    // cari index staff di pelaksana

    // var foundIndex = staff_sekarang.findIndex((/** @type {{ id: any; }} */ x) => x.id == id_staff);

    // // cek id in staf terpilih
    // const target = document.getElementById(id_staff)?.classList
    // if(staf_terpilih.some(element => element.id === id_staff)){
    //     // remove jika  ada = remove
    //     staf_terpilih = staf_terpilih.filter( staf_terpilih => staf_terpilih.id !== id_staff)
    //     // styling
    //     staff_sekarang[foundIndex].atribute = ''

    // }else{
    //     // add jika ga ada = add
    //     staf_terpilih.push(staff.filter( (/** @type {{ id: string; }} */ staff) => staff.id == id_staff)[0])
    //     // styling
    //     staff_sekarang[foundIndex].atribute = 'text-black stroke-green-500'

    // }

    // if(staf_terpilih.length !== 0){
    //     is_lengkap = false
    //     // @ts-ignore
    //     nama_pelaksana = staf_terpilih.map(function(item) {
    //                                             return item['nama'];
    //                                             });
    // }else{
    //     is_lengkap = true
    //     nama_pelaksana=''
    // }
  };

  const post_edit_tugas = async () => {
    loadinge(true);
    Falidate();
    accessKey = GetCookie("accesskey");
    //  var textatea = document.getElementById("deskripsi")
    //  var deskripsi = textatea.value

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/tugas/update_tugas`,
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
      toast.success("berhasil update tugas");
      location.reload();
    } else {
      toast.error("terjadi kesalahan");
    }
  };

  let date = tugas.deadline.slice(0, 10);

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
  id="popaddrk"
  class=" flex fixed w-screen h-screen max-h-screen overflow-y-scroll min-h-screen flex-col pb-20 items-center pt-20 top-0 right-0 z-40"
>
  <div class=" w-80 h-10 flex justify-end items-end">
    <div class=" w-5 h-5 bg-black aux-container bg-opacity-40"></div>
    <div
      class=" h-10 w-10 bg-black rounded-t-2xl bg-opacity-40 flex justify-center items-end"
    >
      <Delete dimensi="w-8 h-8" color="stroke-white"></Delete>
    </div>
  </div>

  <form
    action=""
    class=" flex flex-col form_pop w-80 bg-black bg-opacity-40 rounded-3xl rounded-tr-none p-5"
  >
    <h4 class=" text-base text-white text-center w-full">edit tugas</h4>
    <label for="judul" class=" text-sm text-white mb-1">judul</label>
    <input
      bind:value={tugas.judul}
      on:change={() => {
        value_change("judul", tugas.judul);
      }}
      name="judul"
      type="text"
      class=" h-8 rounded-lg px-2 mb-4"
    />

    <label for="deskripsi" class=" text-sm text-white mb-1">deskripsi</label>
    <textarea
      name="deskripsi"
      class=" min-h-20 rounded-lg px-2 mb-4"
      deskripsi="deskripsi"
      bind:value={tugas.deskripsi}
      on:change={() => {
        value_change("deskripsi", tugas.deskripsi);
      }}
    />

    <label for="kpi" class=" text-sm text-white mb-1">KPI</label>
    <input
      name="kpi"
      type="text"
      class=" h-8 rounded-lg px-2 mb-4"
      bind:value={tugas.kpi}
      on:change={() => {
        value_change("kpi", tugas.kpi);
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

    {#if karyawans}
      <label for="pelaksana" class=" text-sm text-white mb-1"
        >pelaksanaan
      </label>

      <div class=" bg-white py-2 rounded-lg px-2 mb-4 cursor-pointer">
        <button
          on:click={() => {
            opDdStaff = !opDdStaff;
          }}
          class=" w-full flex justify-between items-center px-2"
        >
          <label for="">{staf_terpilih_value}</label>
          {#if opDdStaff}
            <div class="rotate-180">
              <Dropdown kelas="w-8 h-8"></Dropdown>
            </div>
          {:else}
            <Dropdown kelas="w-8 h-8"></Dropdown>
          {/if}
        </button>
        {#if opDdStaff}
          <div
            transition:slide={{
              delay: 250,
              duration: 300,
              easing: circInOut,
              axis: "y",
            }}
            id="dropdownstaff"
            class=" duration-700 w-full flex-col text-gray-500 flex overflow-hidden"
          >
            {#each staff_sekarang as stafff}
              <button
                on:click={updateStaffPilih(stafff.id_karyawan)}
                id={stafff.id_karyawan}
                class=" {stafff.id_karyawan} p-1 px-5 border-b flex justify-between {stafff.atribute}  "
                >{stafff.nama}
                <Check kelas="w-5 h-5  " kelas2="stroke-2 "></Check></button
              >
            {/each}
          </div>
        {/if}
      </div>
    {/if}

    <div class=" mt-5 grid grid-cols-2 grid-rows-1 gap-3">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        on:click={() => {
          currentOpenEditTugas(0);
        }}
        class=" BtnNegative"
      >
        batal
      </div>
      <button
        id="BtnSubmit"
        type="submit"
        disabled={is_lengkap}
        on:click={() => {
          post_edit_tugas();
        }}
        class="   BtnSubmit w-full h-10">simpan</button
      >
    </div>
  </form>
</div>

<div
  transition:blur={{ amount: 10, duration: 300 }}
  class=" w-screen h-screen fixed top-0 right-0 z-30 backdrop-blur-lg"
></div>
