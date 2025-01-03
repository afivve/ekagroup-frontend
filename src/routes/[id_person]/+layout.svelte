<script>
  // @ts-nocheck

  import "../../app.css";
  // @ts-ignore
  // @ts-ignore
  import Bell2 from "$lib/svg/bell2.svelte";
  // @ts-ignore
  // @ts-ignore
  import { goto } from "$app/navigation";
  import { user } from "$lib/stores/userLogin";

  import {
    currentOpenNotifPage,
    currentOpenProfile,
    open_notif,
    open_profile,
  } from "$lib/stores/general";
  import NontifPage from "$lib/compo/nontif_page.svelte";
  import EditProfile from "$lib/compo/edit_profile.svelte";
  import Breadcrumb from "$lib/compo/Breadcrumb.svelte";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { GetCookie } from "$lib/stores/cokies";
  // @ts-ignore
  import { requestNotificationPermission } from "$lib/dependedncies/firebase";

  let notifications_length = writable(0); // Store the count of unread notifications
  let accessKey = "";
  let idKaryawanCookie = "";

  onMount(async () => {
    try {
      // @ts-ignore
      accessKey = GetCookie("accesskey");
      idKaryawanCookie = GetCookie("idKaryawan");

      // Fetch unread notifications count from the API
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/unread_notifications`, // Your API endpoint for unread notifications count
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessKey,
          },
        }
      );

      // Parse the response to get the unread count
      const data = await response.json();
      console.log("notif belum dibaca", data);

      // Update the notifications_length store with the count of unread notifications
      notifications_length.set(data.unread_count);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }

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
      try {
        const newNotification = JSON.parse(event.data);

        // Assuming the WebSocket message contains a flag for unread notifications
        if (
          newNotification &&
          typeof newNotification.unread_count === "number"
        ) {
          notifications_length.set(newNotification.unread_count); // Directly set the unread count
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
        console.error("Error event WebSocket message:", event);
      }
    };

    ws.onerror = (event) => console.error("WebSocket error:", event);
    ws.onclose = (event) => {
      console.log("WebSocket connection closed:", event.code, event.reason);
    };
  });
</script>

<div
  class="fixed z-20 top-0 flex w-full p-3 px-6 text-gray-800 bg-white drop-shadow"
>
  <div class="w-full flex justify-between items-center flex-row">
    <div class="flex flex-col">
      <p>hai, {$user.full_name}</p>
    </div>
    <div class="flex flex-col justify-end w-40">
      <div class="flex justify-between items-center">
        <button
          on:click={() => {
            currentOpenNotifPage(!$open_notif);
          }}
          class="relative mx-2"
        >
          <svg
            class="w-6 h-6 fill-gray-400"
            version="1.1"
            id="_x32_"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512 512"
            xml:space="preserve"
          >
            <g>
              <path
                d="M193.499,459.298c5.237,30.54,31.518,52.702,62.49,52.702c30.98,0,57.269-22.162,62.506-52.702l0.32-1.86
                        H193.179L193.499,459.298z"
              />
              <path
                class="st0"
                d="M469.782,371.98c-5.126-5.128-10.349-9.464-15.402-13.661c-21.252-17.648-39.608-32.888-39.608-96.168v-50.194
                        c0-73.808-51.858-138.572-123.61-154.81c2.876-5.64,4.334-11.568,4.334-17.655C295.496,17.718,277.777,0,255.995,0
                        c-21.776,0-39.492,17.718-39.492,39.492c0,6.091,1.456,12.018,4.334,17.655c-71.755,16.238-123.61,81.002-123.61,154.81v50.194
                        c0,63.28-18.356,78.521-39.608,96.168c-5.052,4.196-10.276,8.533-15.402,13.661l-0.466,0.466v49.798h428.496v-49.798
                        L469.782,371.98z"
              />
            </g>
          </svg>
          <!-- Show the unread notifications count -->
          {#if $notifications_length > 0}
            <span
              class="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center"
            >
              {$notifications_length}
            </span>
          {/if}
        </button>
        <button
          on:click={() => {
            currentOpenProfile(!$open_profile);
          }}
          class="h-8 w-8 bg-slate-400 rounded-full"
        ></button>
      </div>
      <ul class="mt-1 self-end text-xs">
        {$user.jabatan}
        {$user.nama_divisi}
      </ul>
    </div>
  </div>
</div>

<div
  class="fixed z-20 top-16 flex w-full p-1 px-11 bg-white drop-shadow text-xs"
>
  <Breadcrumb />
</div>

<div class="w-screen items-center flex-col flex">
  <div class="container">
    <slot></slot>
  </div>
</div>

{#if $open_notif}
  <NontifPage></NontifPage>
{/if}

{#if $open_profile}
  <EditProfile></EditProfile>
{/if}

<!-- 


// let notificationToken = "";

  // const checkNotificationToken = async () => {
  //   try {
  //     const idKaryawan = $user.id_karyawan;
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_BASE_URL}/notification?id_karyawan=${idKaryawan}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + GetCookie("accesskey"),
  //         },
  //       }
  //     );

  //     const result = await response.json();
  //     return result.exists;
  //   } catch (error) {
  //     console.error("Error checking notification token:", error);
  //     return false;
  //   }
  // };

  // // @ts-ignore
  // const saveNotificationToken = async (token) => {
  //   try {
  //     const idKaryawan = $user.id_karyawan;
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_BASE_URL}/notification`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + GetCookie("accesskey"),
  //         },
  //         body: JSON.stringify({
  //           // @ts-ignore
  //           id_karyawan: idKaryawan,
  //           token: token,
  //           status: true,
  //         }),
  //       }
  //     );

  //     const result = await response.json();

  //     if (response.ok) {
  //       console.log("Notification token saved successfully:", result);
  //     } else {
  //       console.error("Failed to save notification token:", result.detail);
  //     }
  //   } catch (error) {
  //     console.error("Error saving notification token:", error);
  //   }
  // };

  // const getNotificationPermission = async () => {
  //   try {
  //     // @ts-ignore
  //     notificationToken = await requestNotificationPermission();
  //     console.log("TOKEN FIREBASE:", notificationToken);

  //     if (notificationToken) {
  //       await saveNotificationToken(notificationToken);
  //     } else {
  //       console.error("Failed to retrieve notification token.");
  //     }
  //   } catch (error) {
  //     console.error("Error requesting notification permission:", error);
  //   }
  // };

  // if (typeof window !== "undefined") {
  //   // Check if token exists before requesting notification permission
  //   const tokenExists = checkNotificationToken();
  //   if (!tokenExists) {
  //     getNotificationPermission();
  //   } else {
  //     console.log("Token already exists, no need to request permission.");
  //   }
  // }

 -->
