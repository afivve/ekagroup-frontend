<script>
  // @ts-nocheck
  import { goto } from "$app/navigation";
  import { Falidate } from "$lib/dependedncies/falidate_session_login";
  import { GetCookie, logout } from "$lib/stores/cokies";
  import { loadinge } from "$lib/stores/load";
  import { onMount } from "svelte";
  import { SetCookie } from "$lib/stores/cokies";
  import { user } from "$lib/stores/userLogin";
  import { breadcrumbs } from "$lib/stores/breadcrumb";
  import { requestNotificationPermission } from "$lib/dependedncies/firebase";

  let divisies = [];
  const idKaryawan = $user.id_karyawan;

  const portalLokal = (divisi) => {
    goto("dashboard_divisi/" + divisi.id_divisi + "/");
  };

  let accessKey = "";
  let notificationToken = "";

  const get_divisies = async () => {
    accessKey = GetCookie("accesskey");
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
    divisies = content.data;
  };

  const tokenFirebase = async () => {
    const reqToken = await requestNotificationPermission();

    if (reqToken) {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/save_firebase_token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessKey,
          },
          credentials: "include",
          body: JSON.stringify({ token: reqToken }),
        }
      );
    }
  };

  onMount(async () => {
    await Falidate();
    console.log("lolos valliadte di dasb direlsi");
    if (!($user.access == 4 || $user.access == 3)) {
      logout();
    }

    await get_divisies();
    await loadinge(false);

    await tokenFirebase();

    breadcrumbs.set([
      { label: "Dashboard", href: `/${idKaryawan}/dashboard_direksi` },
    ]);
  });
</script>

<div class=" w-full flex flex-col text-sm mt-24 pt-8 bg-gray-50">
  <!-- inni card jobs divisi report  -->
  {#each divisies as divisi}
    <button
      on:click={() => {
        portalLokal(divisi);
      }}
      id="card_div"
      class="w-full flex p-3 my-2 px-5 drop-shadow bg-white h-40"
    >
      <div id="kanan" class="  w-[40%]">
        <div class=" flex items-center">
          <div class="  h-12 w-12 rounded-full bg-gray-400"></div>
          <h4 class=" mx-2">{divisi.nama_divisi}</h4>
        </div>
        <h5 class=" text-xs">
          Manager :
          {#if divisi.manager}
            {divisi.manager.full_name}
          {:else}
            -
          {/if}
        </h5>
        <h5 class=" text-xs mt-3">Jumlah karyawan : {divisi.jml_karyawan}</h5>
      </div>
      <div class=" text-xxs flex flex-col items-center w-[60%]">
        <p class=" text-sm border-b border-slate-400 pb-2">
          6 target | 10 rencana kerja
        </p>
        <div id="nilai" class=" text-center hidden flex-col item-center">
          <h4>capaian pelaksanaan tugas</h4>
          <h8 class=" text-xxs">bulan september</h8>
          <div class=" grid grid-cols-2 grid-row-2 gap-2 mt-1 text-xs">
            <div class=" flex">
              <div class=" w-8 rounded bg-yellow-400 mr-1">P0</div>
              8<i class=" ml-1 text-xxxs"> tugas tercapai </i>
            </div>
            <div class=" flex">
              <div class=" w-8 rounded bg-yellow-300 mr-1">P1</div>
              8<i class=" ml-1 text-xxxs"> tugas tercapai </i>
            </div>
            <div class=" flex">
              <div class=" w-8 rounded bg-yellow-200 mr-1">P2</div>
              8<i class=" ml-1 text-xxxs"> tugas tercapai </i>
            </div>
            <div class=" flex">
              <div class=" w-8 rounded bg-yellow-100 mr-1">P3</div>
              8<i class=" ml-1 text-xxxs"> tugas tercapai </i>
            </div>
          </div>
          <div class="w-28 mt-2 bg-red-400 text-white rounded">
            10 tugas terhambat
          </div>
        </div>
      </div>
    </button>
  {/each}
</div>
