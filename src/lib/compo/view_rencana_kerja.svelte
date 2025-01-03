<script>
    import { fade,fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    

    let openform = false
    import { currentOpenTambahRk } from "$lib/stores/openPopRenKer"
</script>

<div  		transition:fly={{ delay: 250, duration: 700, x: 0, y: 900, opacity: 0.5, easing: quintOut }} id="popaddrk" class=" flex fixed w-screen h-screen flex-col  items-center pt-20 top-0 z-30 backdrop-blur-xl backdrop-brightness-100  bg-gray-200 bg-opacity-5">

    <div class="w-80 flex bg-black rounded-3xl p-5 bg-opacity-30 flex-col  ">
      <h4 class=" text-white  text-center w-full ">Tambah rencana kerja</h4>
      <form action="" class=" flex flex-col">
         <label for="judul" class=" text-sm text-white mb-1">judul</label>
         <input name="judul" type="text" class=" h-8 rounded-lg px-2 mb-4" >
  
         <label for="deskripsi" class=" text-sm text-white mb-1">deskripsi</label>
         <textarea name="deskripsi"  class=" min-h-20 rounded-lg px-2 mb-4" > </textarea>
  
         <label for="kpi" class=" text-sm text-white mb-1">KPI</label>
         <input name="kpi" type="text" class=" h-8 rounded-lg px-2 mb-4" >
  
         <label for="kpi" class=" text-sm text-white mb-1">deadline</label>
         <input name="kpi" type="date" class=" h-8 rounded-lg px-2 mb-4" >
         <div class=" mt-5 grid grid-cols-2 grid-rows-1 gap-3">
            <button on:click={()=>{currentOpenTambahRk(false)}}  class=" BtnNegative  ">batal</button>
            <button type="submit" class=" BtnSubmit  ">simpan</button>
         </div>
      </form>
    </div>
  </div>