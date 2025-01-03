<script>
  import { currentOpenProfile, open_profile } from "$lib/stores/general";
  import { open_pop_edit_karyawan ,currentOpenEditKaryawan } from "$lib/stores/openPopKaryawan";
  import EditKaryawan from "./edit_karyawan.svelte";
  import EditProfile from "./edit_profile.svelte";
  export let karyawan;

  let open_id = ""


</script>

{#if $open_pop_edit_karyawan  == karyawan.id_karyawan}
<EditKaryawan karyawan={karyawan} ></EditKaryawan>
{/if}
  <!-- card -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class=" w-full flex p-1 border-b " on:click={()=>{ currentOpenEditKaryawan(karyawan.id_karyawan)}}>
    <div class=" w-1/3 h-10   flex items-center border-r border-slate-300">
      <div class="h-8 w-8 bg-slate-400 mx-2 rounded-full"></div>
      <h4>{karyawan.nama.split(' ')[0]}</h4>
    </div>
    <div class=" w-2/3 h-10  justify-between flex items-start p-1 ">
    <h4>{karyawan.jabatan}</h4>  

    <div class=" flex flex-col" >
    
    </div>
  </div>
</div>
