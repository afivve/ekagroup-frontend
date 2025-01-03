<script>
  // @ts-ignore
  // @ts-ignore
  import Person from "$lib/svg/person.svelte";
  import { user } from "$lib/stores/userLogin";
  // @ts-ignore
  // @ts-ignore
  import { currentOpenNotifPage, open_notif } from "$lib/stores/general";
  import { GetCookie } from "$lib/stores/cokies";

  export let notif;

  const userId = $user.id_karyawan;
  const link = `https://eka-frontend-dev.ekagroup.co/${userId}/${notif.link}`;

  let isRead = notif.isRead; // Default to false for unread notification
  console.log(notif);

  const closeNotifPanel = async () => {
    try {
      await markNotificationRead(notif.id_notification_data, userId); // Send API request to mark as read
      currentOpenNotifPage(false); // Close the notification panel
    } catch (error) {
      console.log(error);
    }
  };

  // Function to send the read notification request to the backend using GET method
  // @ts-ignore
  const markNotificationRead = async (id_notification_data, id_karyawan) => {
    try {
      const accessKey = GetCookie("accesskey");
      // Assuming access token is stored in user store or elsewhere
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/mark_notification?id_notification_data=${id_notification_data}&id_karyawan=${id_karyawan}`,
        {
          method: "POST", // Use GET method instead of POST
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessKey, // Add Authorization header
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Optional: log success message
        isRead = true; // Set isRead to true after the notification is marked as read
      } else {
        console.error("Error marking notification as read", response.status);
      }
    } catch (error) {
      console.error("Error marking notification as read", error);
    }
  };
</script>

<div
  class="flex items-start w-full p-4 mb-4 text-sm rounded-lg shadow-sm"
  class:bg-white={isRead}
  class:bg-gray-200={!isRead}
>
  <a href={link} class="flex items-center w-full" on:click={closeNotifPanel}>
    <div class="flex flex-col justify-start">
      <p class="font-semibold text-gray-800">{notif.created_by}</p>
      <p>
        <span class="text-gray-800">{notif.title}</span>
        <span class="text-gray-600">: {notif.body}</span>
      </p>
      <p class="text-gray-500 text-xs italic">{notif.relative_time}</p>
    </div>
  </a>

  <!-- Conditional Text: Show "Dibaca" or "Belum Dibaca" -->
  <p class="text-gray-500 text-xs ml-4 mt-2">
    {isRead ? "Dibaca" : "Belum Dibaca"}
  </p>
</div>
