<script>
  import { goto } from "$app/navigation";

  // @ts-nocheck

  import logo from "$lib/img/LOGO_EG.svg";
  import { loadinge } from "$lib/stores/load";
  // @ts-ignore
  import { user } from "$lib/stores/userLogin";
  import toast from "svelte-french-toast";

  let password = "";
  let confirm_password = "";
  let nik = "";
  let username = "";

  const Tampilkanpassword = () => {
    const input = document.getElementsByClassName("inppassword");
    // console.log((input.attributes["type"].value))
    // @ts-ignore
    if (input[0].attributes["type"].value == "password") {
      input[0].setAttribute("type", "text");
      input[1].setAttribute("type", "text");
    } else {
      input[0].setAttribute("type", "password");
      input[1].setAttribute("type", "password");
    }
  };

  const push_daftar = async () => {
    loadinge(true);
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
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
          confirm_password,
          nik,
        }),
      }
    );
    // @ts-ignore
    if (response.ok) {
      // console.log("yreesss")
      goto("/login");
      loadinge(false);
    } else {
      console.log("user error");

      loadinge(false);
      const errore = await response.json();
      const erore = errore.detail;

      console.log(" ereoorr");
      console.log(erore);
      toast.error(erore);
      // const targetHtml = document.getElementById("error");
      // targetHtml?.classList.remove("hidden");
      // setTimeout(() => {
      // 	targetHtml?.classList.add("hidden");
      // }, 5000);
      // targetHtml.innerHTML = erore;
    }
  };
</script>

<div class="  flex flex-col items-center justify-center p-5 bg-gray-100">
  <img class=" w-28 mt-5 mb-10" src={logo} alt="logo" />
  <div
    class=" p-5 text-gray-700 flex container rounded-lg drop-shadow-lg justify-center flex-col items-center bg-white"
  >
    <h1 class=" text-lg font-semibold mb-3">Daftar Task Managemet</h1>
    <form action="" class=" w-full">
      <!-- svelte-ignore missing-declaration -->

      <div class="w-full flex flex-col my-1">
        <label for="nik" class=" text-xs">Nik</label>
        <input
          id="nik"
          bind:value={nik}
          placeholder="Contoh: 3307011203000000"
          class=" placeholder:text-gray-300 px-3 placeholder:text-sm my-1 h-9 rounded-lg border border-collapse border-gray-300 focus:border-gray-700 focus:border"
          type="text"
        />
        <p id="alert_nik" class="text-xs text-red-400 hidden">
          NIK harus diisi
        </p>
      </div>
      <div class="w-full flex flex-col my-1">
        <label for="username" class=" text-xs">Username</label>
        <input
          id="username"
          bind:value={username}
          placeholder="Contoh: putra_petir"
          class=" placeholder:text-gray-300 px-3 placeholder:text-sm my-1 h-9 rounded-lg border border-collapse border-gray-300 focus:border-gray-700 focus:border"
          type="text"
        />
        <p id="alert_username" class="text-xs text-red-400 hidden">
          username harus diisi
        </p>
      </div>
      <div class="w-full flex flex-col my-1">
        <label for="password" class=" text-xs">Kata password</label>
        <input
          bind:value={password}
          placeholder="Contoh: password123!"
          id="inppassword"
          class=" inppassword placeholder:text-gray-300 px-3 placeholder:text-sm my-1 h-9 rounded-lg border border-collapse border-gray-300 focus:border-gray-700"
          type="password"
        />

        <label for="password" class=" text-xs mt-1">Ulang Kata password</label>
        <input
          bind:value={confirm_password}
          placeholder="Contoh: password123!"
          class=" inppassword placeholder:text-gray-300 px-3 placeholder:text-sm my-1 h-9 rounded-lg border border-collapse border-gray-300 focus:border-gray-700"
          type="password"
        />
        <p id="alert_password" class="text-xs text-red-400 hidden">
          NIK harus diisi
        </p>

        <button
          on:click={() => {
            Tampilkanpassword();
          }}
          class="text-xs self-end mr-3">tampilkan password</button
        >
      </div>

      <button
        on:click={() => {
          push_daftar();
        }}
        type="submit"
        disabled={!confirm_password}
        id="TbMasuk"
        class=" mt-5 cursor-default BtnSubmit w-full h-10 rounded-lg items-center flex justify-center font-semibold"
        >Masuk</button
      >
    </form>
  </div>
  <p class=" text-sm text-gray-400 my-10">2024. Eka Group Indonesia</p>
</div>
