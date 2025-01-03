<script>
// @ts-nocheck


  import Edit from "$lib/svg/edit.svelte";
  
  import { currentOpenElementEditId,open_element_id } from "$lib/stores/openPopRenKer";
  import EditRencanaKerja from "./edit_rencana_kerja.svelte";

  import { page } from "$app/stores";


  export let rencana_kerja ;
  let local_id_element_pop = "x"

  import { goto } from "$app/navigation";

  const portal = ()=>{
    console.log($page.route.id)
    if($page.route.id.includes("dashboard_staff")){
      goto('../../rencana_kerja/'+rencana_kerja.id_renker)
    }else{
      goto('../rencana_kerja/'+rencana_kerja.id_renker)

    }
}
</script>
<div class=" rencanakerja_card p-1 px-2 min-h-12 my-2  w-full bg-white drop-shadow flex rounded-lg ">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click={()=>(portal())} class=" w-4/6 flex flex-col justify-between">

   
    <div class=" text-lg">{rencana_kerja.judul}</div>
    <h3 class=" text-xxs">deadline : {(rencana_kerja.deadline).slice(0, 10)}</h3>
  </div>

  <div class=" w-2/6 flex flex-col justify-start pl-2 border-l ml-1">
    <div class=" flex justify-around mb-1">
      
      <button on:click={()=>{currentOpenElementEditId(rencana_kerja.id_renker)}} >
        <Edit kelas='w-5 h5 ' warna="stroke-gray-400"></Edit>
      </button>
      
      <div class=" w-16 h-3 rounded bg-green-500 text-xxs text-center flex items-center justify-center text-white"> Tercapai  </div>
      
    </div>
    <h5 class="text-xxs ">progres kerja {rencana_kerja.progres}%</h5>
    <div name="progres" class=" mt-1   w-28 h-1 bg-slate-200  ">
      <div class=" h-1  bg-green-500" style="width: {rencana_kerja.progres}%;"></div>
    </div>
  </div>
</div>

{#if $open_element_id == rencana_kerja.id_renker}
<EditRencanaKerja rencana_kerja ={rencana_kerja}></EditRencanaKerja>
{/if}