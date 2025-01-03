<script>
// @ts-nocheck

  import { pelaksana ,open_pop_element_id, currentOpenElementId, currentOpenEditTugas ,open_pop_edit_tg  } from "$lib/stores/openPopTugas";
  import Edit from "$lib/svg/edit.svelte";
  import Person from "$lib/svg/person.svelte";
  import Work from "$lib/svg/work.svelte";
  import EditTugas from "./edit_tugas.svelte";
  import { page } from "$app/stores";

  export let tugas;
  export let karyawans;
  let this_elaksana = tugas.pelaksana

  let local_id_element_pop = "x"

  let open_edit = false

  
  import { goto } from "$app/navigation";

const portal = ()=>{
    if($page.route.id.includes("dashboard_staff")){
        goto('../../tugas/'+tugas.id_tugas)
    }else{
        goto('../tugas/'+tugas.id_tugas)
    }
}
  
</script>
<div  class=" flex w-full  bg-slate-50 my-2 py-2 px-5 mt-{tugas.id} ">
    <div class=" items-center flex border-r pr-2 ">
     
        <div class=" h-8 w-8  rounded-full bg-slate-200 flex justify-center items-center">
            <Person kelas='w-5 h-5 fill-gray-500' ></Person> 
        </div>
        <div>
            <h3 class=" ml-3 ">{tugas.pelaksana.split(' ')[0]}</h3>
        </div>
    </div>
    <div class=" block w-full ">
        <div class=" flex justify-between flex-row w-full mb-2">
            <button on:click={()=>{portal()}} class=" text-xs ml-2">{tugas.judul} | {tugas.id_tugas}</button> 
            <div class=" flex justify-between  max-w-32">
                <button id='tg_edt_{tugas.id}' class=" " on:click={()=>{currentOpenEditTugas(tugas.id_tugas)}} >
                    <Edit kelas='w-5 h-5 mx-2 ' warna="stroke-gray-400"></Edit>
                </button>
                <Work kelas=' fill-green-500 w-5 h-5'></Work>
              </div>
        </div>
        <p class=" text-gray-600 text-xxs ml-2 text-end">mulai : {tugas.deadline.substr(0,10)}</p> 
        <p class=" text-gray-600 text-xxs ml-2 text-end">deadline : {tugas.start_date.substr(0,10)}</p> 
    </div>
</div>



{#if $open_pop_edit_tg  && $open_pop_edit_tg == tugas.id_tugas} 
<!-- <div class="w-full h-52 bg-green-100"> </div>
<div>     
    {$open_pop_edit_tg} \ \ {tugas.id_tugas}
</div> -->
<EditTugas tugas={tugas} karyawans = {karyawans} ></EditTugas>
{/if}
