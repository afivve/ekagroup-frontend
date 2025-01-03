<script>
  // @ts-nocheck

  import { circInOut, quintOut } from "svelte/easing";
  import Check from "$lib/svg/check.svelte";

  import { currentOpenTambahTugas } from "$lib/stores/openPopTugas";
  import { fly, slide } from "svelte/transition";
  import Dropdown from "$lib/svg/dropdown.svelte";
  import { writable } from "svelte/store";
  import { page } from "$app/stores";
  import { loadinge } from "$lib/stores/load";
  import { Falidate } from "$lib/dependedncies/falidate_session_login";
  import { GetCookie } from "$lib/stores/cokies";
  import { onMount } from "svelte";
  import { each } from "svelte/internal";
  import toast from "svelte-french-toast";
  // import { user } from "$lib/stores/userLogin";

  // form pengisian
  let openform = false;
  let opDdStaff = false;
  let staff = [
    { nama: "alpen", id: "A004", atribut: "text-black stroke-green-400" },
    { nama: "devi", id: "A005", atribut: "text-black stroke-green-400" },
    { nama: "nanang", id: "A003", atribut: "text-black stroke-green-400" },
    { nama: "sibon", id: "A006", atribut: "text-black stroke-green-400" },
  ];
  /**
   * @type {any[]}
   */

  export let renker;
  export let karyawans;

  let accessKey = "";
  let staf_terpilih = [];
  let staf_terpilih_value = "";
  let is_lengkap = true;

  let deskripsi = writable("");
  let judul = "";
  let kpi = "";
  let start_date = "";
  let deadline = "";
  let id_renker = parseInt($page.params.id_rk);
  let id_karyawan = "";
  let id_divisi = "";

  let renkers = [];

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

    // pelaksana jammak
    // if(staf_terpilih.some(element => element.id === id_staff)){
    //     // remove jika ga ada
    //     // staf_terpilih = staf_terpilih.filter( staf_terpilih => staf_terpilih.id !== id_staff)
    //     // staf_terpilih = staf_terpilih.filter( staf_terpilih => staf_terpilih.id !== id_staff)
    //     // styling
    //     target?.remove('stroke-green-500')
    //     target?.remove('text-black')
    // }else{
    //     // add jika ada
    //     staf_terpilih.push(staff.filter( staff => staff.id == id_staff)[0])
    //     // styling
    //     target?.add('text-black')
    //     target?.add('stroke-green-500')
    // }

    // if(staf_terpilih.length !== 0){
    //     is_lengkap = false
    //     // @ts-ignore
    //     staf_terpilih_value = staf_terpilih.map(function(item) {
    //                                             return item['nama'];
    //                                             });
    // }else{
    //     is_lengkap = true
    //     staf_terpilih_value=''
    // }
  };

  const get_karyawans = async () => {
    // @ts-ignore
    if (!renker) {
      toast.error("rencana kerja tidak yes");
    }
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
          divisi: "9",
        }),
        credentials: "include",
      }
    );
    if (response.ok) {
      let karyawans_ = await response.json();
      staff = karyawans_.data.data;
      console.log(staff);
    }
  };

  const post_add_tugas = async () => {
    loadinge(true);
    Falidate();
    accessKey = GetCookie("accesskey");
    var textatea = document.getElementById("deskripsi");
    var deskripsi = textatea.value;

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/tugas/add_tugas`,
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
          id_renker,
          id_divisi,
          id_karyawan,
        }),
      }
    );
    if (response.ok) {
      toast.success("berhasil menambahkan tugas");
      loadinge(false);
      currentOpenTambahTugas(false);
    } else {
      const errore = await response.json();
      const erore = errore.detail;
      toast.error(`terjadi kesalahan, ${erore}`);
      loadinge(false);
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
      renkers = renker.data;
    }
  };

  const pilih_renker = () => {};

  onMount(async () => {
    if (renker) {
      await get_karyawans();
      id_divisi = renker.id_divisi;
    } else {
      await get_renkers();
      id_divisi = $page.params.id_divisi;
      id_karyawan = $page.params.id_person;
    }
  });
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
    <h4 class=" text-white text-center w-full">Tambah Tugas</h4>
    <form action="" class=" flex flex-col form_pop">
      {#if !renker}
        <select class=" h-8 rounded-lg px-2 mb-4" bind:value={id_renker}>
          {#each renkers as renker_}
            <option value={renker_.id_renker}>{renker_.judul}</option>
          {/each}
        </select>
      {/if}

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

      <label for="start_date" class=" text-sm text-white mb-1">start_date</label
      >
      <input
        name="start_date"
        type="date"
        class=" h-8 rounded-lg px-2 mb-4"
        bind:value={start_date}
      />

      <label for="deadline" class=" text-sm text-white mb-1">deadline</label>
      <input
        name="deadline"
        on:change={() => (is_lengkap = false)}
        type="date"
        class=" h-8 rounded-lg px-2 mb-4"
        bind:value={deadline}
      />

      {#if renker}
        <label for="pelaksana" class=" text-sm text-white mb-1"
          >pelaksanan
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
              {#each karyawans as stafff}
                <button
                  on:click={updateStaffPilih(stafff.id_karyawan)}
                  id={stafff.id_karyawan}
                  class=" p-1 px-5 border-b flex justify-between"
                  >{stafff.nama}
                  <Check kelas="w-5 h-5  " kelas2="stroke-2 "></Check></button
                >
              {/each}
            </div>
          {/if}
        </div>
      {/if}

      <div class=" mt-5 grid grid-cols-2 grid-rows-1 gap-3">
        <button
          on:click={() => {
            currentOpenTambahTugas(false);
          }}
          class=" BtnNegative">batal</button
        >
        <button
          id="BtnSubmit"
          type="submit"
          disabled={is_lengkap}
          on:click={() => {
            post_add_tugas();
          }}
          class="   BtnSubmit w-full h-10">simpan</button
        >
      </div>
    </form>
  </div>
</div>
