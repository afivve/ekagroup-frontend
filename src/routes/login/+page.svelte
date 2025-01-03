<script>
  // @ts-nocheck
  import { SetCookie, GetCookie, logout, logout_ } from "$lib/stores/cokies";
  import { onMount } from "svelte/internal";
  import logo from "$lib/img/LOGO_EG.svg";
  import { Input } from "postcss";
  import { loadinge } from "$lib/stores/load";
  import { goto } from "$app/navigation";
  import { RefreshToken } from "$lib/stores/auth";
  import { updateUser, user } from "$lib/stores/userLogin";
  import { Portal } from "$lib/dependedncies/portal";
  import { Falidate } from "$lib/dependedncies/falidate_session_login";
  import { toast, Toaster } from "svelte-french-toast";

  let password = "";
  let username = "";
  let Lengkap = false;
  let accessKey = "";
  let refreshKey = "";

  const CekSandi = () => {
    console.log(password);
    const target = document.getElementById("TbMasuk")?.classList;
    if (password.length > 0) {
      target?.remove("TbPasif");
      target?.add("TbAktif");
      Lengkap = true;
    } else {
      target?.remove("TbAktif");
      target?.add("TbPasif");
      Lengkap = false;
    }
  };

  const TampilkanSandi = () => {
    const input = document.getElementById("inpSandi");
    // console.log((input.attributes["type"].value))
    if (input.attributes["type"].value == "password") {
      input.setAttribute("type", "text");
    } else {
      input.setAttribute("type", "password");
    }
  };

  onMount(async () => {
    // console.log("masuk login");

    if (await Falidate()) {
      console.log("----user" + $user);
      await Portal($user.access, $user.id_karyawan, $user.divisi);
    }
  });

  const submited = async () => {
    // console.log(username)
    if (!username) {
      console.log("!username");
      return;
    }
    // console.log("aaass")
    loadinge(true);
    const getuser = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    if (getuser.ok) {
      // logout_ = true
      // console.log("user sukses")
      let user1 = await getuser.json();
      // console.log(user1.data);
      const accessKey = user1.data.access_token;
      const expired_at = user1.data.expired_at;
      const refreshKey = user1.data.refresh_token;
      const idKaryawan = user1.data.id_karyawan;

      await SetCookie("accesskey", accessKey, expired_at);
      await SetCookie("idKaryawan", idKaryawan, expired_at);
      await SetCookie("refreshkey", refreshKey, 3600000 * 24);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/get_profile`,
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

      if (content.data.access == 0) {
        toast.error(
          "menunnggu persetujuan akses dari HRGA , mohon hubungi nomor Hrga unntuk meminta akses"
        );
        await logout();
      } else {
        await updateUser(content.data);
      }
      await Portal(
        content.data.access,
        content.data.id_karyawan,
        content.data.divisi
      );
    } else {
      console.log("user error");

      loadinge(false);
      const errore = await getuser.json();
      const erore = errore.detail;

      console.log(" ereoorr");
      console.log(erore);
      toast.error(erore);
      /* alert(erore); */
    }
  };
</script>

<div class="  flex flex-col items-center justify-center p-5 bg-gray-100">
  <img class=" w-28 mt-5 mb-10" src={logo} alt="logo" />
  <div
    class=" p-5 text-gray-700 max-w-96 flex container rounded-lg drop-shadow-lg justify-center flex-col items-center bg-white"
  >
    <h1 class=" text-lg font-semibold mb-3">Masuk ke Task Managemet</h1>
    <form class=" w-full" on:submit={() => submited()}>
      <div class="w-full flex flex-col my-1">
        <label for="nik" class=" text-xs">Username</label>
        <input
          bind:value={username}
          id="username"
          placeholder="Contoh: rojul"
          class=" placeholder:text-gray-300 px-3 placeholder:text-sm my-1 h-9 rounded-lg border border-collapse border-gray-300 focus:border-gray-700 focus:border"
          type="text"
        />
        <p id="alert_username" class="text-xs text-red-400 hidden">
          username harus diisi
        </p>
      </div>
      <div class="w-full flex flex-col my-1">
        <label for="sandi" class=" text-xs">Kata Sandi</label>
        <input
          id="inpSandi"
          on:keyup={() => {
            CekSandi();
          }}
          bind:value={password}
          placeholder="Contoh: Sandi123!"
          class=" placeholder:text-gray-300 px-3 placeholder:text-sm my-1 h-9 rounded-lg border border-collapse border-gray-300 focus:border-gray-700"
          type="password"
        />
        <p id="alert_sandi" class="text-xs text-red-400 hidden">
          username harus diisi
        </p>

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          on:click={() => {
            TampilkanSandi();
          }}
          class="text-xs self-end mr-3"
        >
          tampilkan sandi
        </div>
      </div>
      <label
        for=""
        class="text-xs self-start mt-2 mb-5 text-gray-400 font-semibold"
        >Lupa kata sandi?</label
      >

      <button
        type="submit"
        id="TbMasuk"
        class=" mt-5 cursor-default TbPasif w-full h-10 rounded-lg items-center flex justify-center font-semibold"
        >Masuk</button
      >
    </form>
    <div class=" text-sm text-gray-400 my-5">
      Belum punya akun ? <a href="/daftar" class="mx-2 font-semibold">Daftar</a>
    </div>
  </div>
  <p class=" text-sm text-gray-400 my-10">2024. Eka Group Indonesia</p>
</div>
