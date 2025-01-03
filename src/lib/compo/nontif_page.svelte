<!-- <script>
  // @ts-nocheck

  import { onMount } from "svelte";
  import NotifRow from "$lib/compo/notif_row.svelte";
  import { fly } from "svelte/transition";
  import { quintInOut } from "svelte/easing";
  import { currentOpenNotifPage, open_notif } from "$lib/stores/general";
  import { GetCookie } from "$lib/stores/cokies";

  // @ts-ignore
  let notifications = [];
  let accessKey = "";

  // Fetch notifications from the API
  onMount(async () => {
    try {
      accessKey = GetCookie("accesskey");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/notifications`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessKey,
          },
        }
      );

      const data = await response.json();
      console.log("NOTIFF", data);
      notifications = data.data; // Assuming your API returns an array of notifications in 'data'
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  });
</script>

<div
  transition:fly={{
    delay: 100,
    duration: 700,
    x: 900,
    y: 0,
    opacity: 1,
    easing: quintInOut,
  }}
  class=" px-4 w-screen fixed top-0 z-50 bg-white min-h-screen flex flex-col py-8"
>
  <button
    on:click={() => {
      currentOpenNotifPage(!open_notif);
    }}
    class=" w-full h-20 p-3 text-2xl flex px-5"
  >
    <div
      class=" rotate-45 translate-y-2 w-4 h-4 border-b-2 border-l-2 border-black"
    ></div>
    <h1 class="mx-2">Notifikasi</h1>
  </button>
  {#each notifications as notif}
    <NotifRow {notif} />
  {/each}
</div> -->

<!-- <script>
  // @ts-nocheck

  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import NotifRow from "$lib/compo/notif_row.svelte";
  import { fly } from "svelte/transition";
  import { quintInOut } from "svelte/easing";
  import { currentOpenNotifPage, open_notif } from "$lib/stores/general";
  import { GetCookie } from "$lib/stores/cokies";
  import { user } from "$lib/stores/userLogin";

  // Store untuk menyimpan notifikasi
  const notifications_store = writable([]);
  // @ts-ignore
  let filteredNotifications = [];

  let accessKey = "";

  // Fetch notifications from API initially
  onMount(async () => {
    try {
      // @ts-ignore
      accessKey = GetCookie("accesskey");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/notifications`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessKey,
          },
        }
      );
      const data = await response.json();
      notifications_store.set(data.data); // Set initial notifications
      filteredNotifications = data.data; // Default filter is all notifications
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }

    const userId = $user.id_karyawan;
    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    // WebSocket connection to receive notifications in real-time
    const ws = new WebSocket(
      `ws://localhost:8000/ws/notifications?user_id=${userId}`
    );

    ws.onopen = () => {
      console.log("WebSocket connected.");
    };

    ws.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      // @ts-ignore
      notifications_store.update((current) => [newNotification, ...current]); // Add new notification
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected.");
    };
  });

  // Fungsi untuk memfilter notifikasi berdasarkan status
  // @ts-ignore
  function filterNotifications(status) {
    notifications_store.subscribe((notifications) => {
      if (status === "all") {
        filteredNotifications = notifications; // Tampilkan semua notifikasi
      } else if (status === "read") {
        // @ts-ignore
        filteredNotifications = notifications.filter((notif) => notif.isRead); // Tampilkan notifikasi yang sudah dibaca
      } else if (status === "unread") {
        // @ts-ignore
        filteredNotifications = notifications.filter((notif) => !notif.isRead); // Tampilkan notifikasi yang belum dibaca
      }
    });
  }

  notifications_store.subscribe(($notifications_store) => {
    filteredNotifications = $notifications_store;
  });
</script>

<div
  transition:fly={{
    delay: 100,
    duration: 700,
    x: 900,
    y: 0,
    opacity: 1,
    easing: quintInOut,
  }}
  class="px-4 w-screen fixed top-0 z-50 bg-white min-h-screen flex flex-col py-4"
>
  <button
    on:click={() => {
      currentOpenNotifPage(!open_notif);
    }}
    class="w-full h-16 p-3 text-2xl flex items-center justify-start px-5"
  >
    <div
      class="rotate-45 translate-y-2 w-4 h-4 border-b-2 border-l-2 border-black"
    ></div>
    <h1 class="mx-2">Notifikasi</h1>
  </button>

  <div class="flex justify-between p-3 border-b mt-2 space-x-4">
    <button
      on:click={() => filterNotifications("all")}
      class="text-blue-500 hover:text-blue-700"
    >
      Semua
    </button>
    <button
      on:click={() => filterNotifications("read")}
      class="text-blue-500 hover:text-blue-700"
    >
      Dibaca
    </button>
    <button
      on:click={() => filterNotifications("unread")}
      class="text-blue-500 hover:text-blue-700"
    >
      Belum Dibaca
    </button>
  </div>

  <div class="flex-1 overflow-y-auto max-h-[calc(100vh-5rem)]">
    {#each filteredNotifications as notif}
      <NotifRow {notif} />
    {/each}
  </div>
</div> -->

<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import NotifRow from "$lib/compo/notif_row.svelte";
  import { fly } from "svelte/transition";
  import { quintInOut } from "svelte/easing";
  import { currentOpenNotifPage, open_notif } from "$lib/stores/general";
  import { GetCookie } from "$lib/stores/cokies";
  // @ts-ignore
  import { user } from "$lib/stores/userLogin";

  // @ts-ignore
  let notifications = writable([]);
  let accessKey = "";
  let idKaryawanCookie = "";

  // Fetch notifications initially
  onMount(async () => {
    try {
      // @ts-ignore
      accessKey = GetCookie("accesskey");
      // @ts-ignore
      idKaryawanCookie = GetCookie("idKaryawan");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/notifications`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessKey,
          },
        }
      );
      const data = await response.json();
      notifications.set(data.data); // Set initial notifications
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }

    // WebSocket connection to receive notifications in real-time
    // const ws = new WebSocket(
    //   `wss://eka-backend-dev.ekagroup.co/ws/notifications?user_id=${idKaryawanCookie}`
    // );

    const ws = new WebSocket(
      `ws://localhost:8002/ws/notifications?user_id=${idKaryawanCookie}`
    );

    ws.onopen = () => {
      console.log("WebSocket connected.");
    };

    ws.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      // @ts-ignore
      notifications.update((current) => [newNotification, ...current]); // Add new notification
    };

    ws.onerror = (event) => console.error("WebSocket error:", event);
    ws.onclose = (event) => {
      console.log("WebSocket connection closed:", event.code, event.reason);
    };
  });
</script>

<div
  transition:fly={{
    delay: 100,
    duration: 700,
    x: 900,
    y: 0,
    opacity: 1,
    easing: quintInOut,
  }}
  class="px-4 w-screen fixed top-0 z-50 bg-white min-h-screen flex flex-col py-8"
>
  <button
    on:click={() => {
      currentOpenNotifPage(!open_notif);
    }}
    class="w-full h-20 p-3 text-2xl flex px-5"
  >
    <div
      class="rotate-45 translate-y-2 w-4 h-4 border-b-2 border-l-2 border-black"
    ></div>
    <h1 class="mx-2">Notifikasi</h1>
  </button>
  <div class="flex-1 overflow-y-auto max-h-[calc(100vh-5rem)]">
    {#each $notifications as notif}
      <NotifRow {notif} />
    {/each}
  </div>
</div>
