<script>
  import { onMount } from "svelte";
  import Loader from "$lib/compo/Loader.svelte";
  import "../app.css";

  import { toast, Toaster } from "svelte-french-toast";

  onMount(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service Worker berhasil didaftarkan:", registration);
        })
        .catch((error) => {
          console.error("Service Worker gagal didaftarkan:", error);
        });
    }
  });
</script>

<Loader />

<Toaster position="top-center" />

<slot></slot>
