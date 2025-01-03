<script>
    import NotifRow from "$lib/compo/notif_row.svelte";
    import { fly } from "svelte/transition";
    import { quintInOut } from "svelte/easing";
    import { user } from "$lib/stores/userLogin";
  import { currentOpenProfile, open_profile } from "$lib/stores/general";
  import { logout } from "$lib/stores/cokies";
    let maxChar = 25
    let nama = $user.username
    let input_focus= false
    let nama_lengkap = $user.full_name
    let no_wa = $user.noWa
    let input_wa_focus = false

    

</script>

<div transition:fly={{ delay: 100, duration: 700, x: 900, y: 0, opacity: 1, easing: quintInOut }} class=" w-screen fixed top-0 z-50 bg-gray-100 p-5 min-h-screen flex  flex-col py-5  " >

    <div  class=" w-full h-20 p-3 text-2xl justify-start flex px-5  "> 

        <div class=" w-2/6  flex items-start">
            {#if input_focus}
            <button class=" text-lg ">batal</button>
            {:else}
            <button on:click={()=>{currentOpenProfile(!$open_profile)}} class=" rotate-45 translate-y-2  w-4 h-4 border-b-2 border-l-2 border-black"> </button>
            {/if}
        </div>

        <h1 class="mx-2 w-2/6  text-center text-lg">Edit Profile</h1>
        
        <div class=" w-2/6  flex justify-end items-start">
            {#if input_focus}
            <button class=" text-lg">simpan</button>
            {:else}
            <div class=" w-1 h-1 flex "> </div>
            {/if}
        </div>

    </div>

    <div class=" w-full  bg-white rounded-xl p-5 flex flex-col">
        <div class=" flex border-b">
            <div class=" flex flex-col items-center">
                <div id="photoP" class=" min-w-20 min-h-20 bg-slate-200 rounded-full"> </div>
                <label for="photoP" class="mt-2 text-green-600">Edit</label>
            </div>
            <p class=" text-gray-700 text-sm  ml-5">Ubah nama panggilan anda dan tambahkan foto profil (opsional) </p>
        </div>
        <div class=" w-full border-b flex items-center">
            <input on:focus={()=>input_focus = true} on:blur={()=>input_focus = false} bind:value={nama} type="text" name="nama_panggilan" id="nama_panggilan" class="w-full h-10 focus:outline-none text-xl font-light">
            {#if input_focus}
            <p class=" text-sm text-green-600 ">
                {maxChar - nama.length}
            </p>
            {/if}
        </div>
        <div class=" w-full border-b h-10 flex items-center">
      
            <label for=""  class="w-full  h-min text-gray-500 text-xl font-light">{nama_lengkap} </label>
        </div>
    </div>

    <div class="w-full rounded-xl bg-white py-5 flex flex-col mt-10 p-5 ">
        <h3 class=" text-gray-400">No Whatsapp</h3>
        <div class=" w-full border-b flex items-center">
            <input on:focus={()=>input_wa_focus = true} on:blur={()=>input_wa_focus = false} bind:value={no_wa} type="text" name="nowa" id="nama_panggilan" class="w-full h-10 focus:outline-none text-xl font-light">
            {#if input_wa_focus}
            <p class=" text-sm text-green-600 ">
                {14 - no_wa.length}
            </p>
            {/if}
        </div>

        <div class=" w-full border-b  items-center">
            <h3 class=" text-gray-400 mt-3">Jabatan</h3>
            <p class="text-gray-500">{$user.jabatan} </p>
        </div>

        <div class=" w-full border-b  items-center">
            <h3 class=" text-gray-400 mt-3">Divisi</h3>
            <p class="text-gray-500">{$user.nama_divisi} </p>
        </div>
    </div>

    <button  on:click={()=>{logout()}} class="TbPasif text-gray-500 w-24 mt-10"> keluar</button>
</div>
