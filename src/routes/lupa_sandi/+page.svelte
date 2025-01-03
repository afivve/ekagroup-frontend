<script>
// @ts-nocheck

    import logo from "$lib/img/LOGO_EG.svg"

    let Sandi = ""
    let ConfSandi = ""
    let NIK = ""
    let Lengkap = false

    const CekSandi = ()=>{
        console.log(Sandi)
        const target =  document.getElementById("TbMasuk")?.classList
        if(Sandi.length >0){
            target?.remove("TbPasif")
            target?.add("TbAktif")
            Lengkap = true
        }else{
            target?.remove("TbAktif")
            target?.add("TbPasif")
            Lengkap = false
        }

    }

    const TampilkanSandi = ()=> { 
        const input = document.getElementsByClassName("inpSandi")
        // console.log((input.attributes["type"].value))
        if(input[0].attributes["type"].value == 'password'){

            input[0].setAttribute("type", "text"); 
            input[1].setAttribute("type", "text"); 
        }else{
            input[0].setAttribute("type", "password"); 
            input[1].setAttribute("type", "password"); 
        }
        }

</script>
<div class="  flex flex-col items-center justify-center p-5 bg-gray-100">

    
    <img class=" w-28 mt-5 mb-10" src="{logo}" alt="logo">
    <div class="w-full h-16 flex justify-center items-center"><div class=" w-8 h-8 bg-blue-400 rounded-full"></div>  <div class=" w-20 h-1 bg-slate-200 "> </div> <div class=" w-8 h-8 bg-slate-200 rounded-full"></div>  <div class=" w-20 h-1 bg-slate-200 "> </div> <div class=" w-8 h-8 bg-slate-200 rounded-full"></div>  </div>
   
    <!-- step 1 -->
    <div class=" p-5 text-gray-700 flex container rounded-lg drop-shadow-lg justify-center flex-col items-center bg-white"> 
        <h1 class=" text-lg font-semibold mb-3 ">Lupa kata sandi ? </h1>
        <p>masukan identitas diri anda</p>
      <form action="" class=" w-full">
         <div class="w-full flex flex-col my-1 ">
             <label for="nik" class=" text-xs" >Nik</label>
             <input  id="nik"   placeholder="Contoh: 3307011203000000" class=" placeholder:text-gray-300  px-3 placeholder:text-sm  my-1 h-9 rounded-lg border border-collapse border-gray-300 focus:border-gray-700 focus:border "  type="text">
            <p id="alert_nik" class="text-xs text-red-400 hidden">NIK harus diisi</p>
            
            </div>
        <div class="w-full flex flex-col my-1 ">
            <label for="sandi" class=" text-xs" >nama ibu kandung</label>
            <input on:keyup={()=>{CekSandi()}} bind:value={Sandi}   placeholder="tulis dengan huruf kecil" id="inpSandi" class=" inpSandi placeholder:text-gray-300  px-3 placeholder:text-sm  my-1 h-9 rounded-lg border border-collapse border-gray-300 focus:border-gray-700"  type="text">
        </div>
        <input type="submit" id="TbMasuk" class=" mt-8 cursor-default TbPasif w-full h-10 rounded-lg  items-center flex justify-center font-semibold  " value="lanjutkan"/>
     </form>
    </div>

    <!-- step 2 -->
    <div class=" p-5 text-gray-700 flex container rounded-lg drop-shadow-lg justify-center flex-col items-center bg-white"> 
        <h1 class=" text-lg font-semibold mb-3 ">Lupa kata sandi ? </h1>
        <p>Hubungi <a class=" text-blue-600 mb-3" href="https://wa.me/+6282138917616"> 'mba kari' melalui whatsapp</a> untuk meminta kode OTP</p>
      <form action="" class=" w-full">
         <div class="w-full flex flex-col my-5 ">
             <label for="nik" class=" text-xs" >Masukan kode OTP</label>
             <input  id="nik"   placeholder="Contoh: 3307011203000000" class=" placeholder:text-gray-300  px-3 placeholder:text-sm  my-1 h-9 rounded-lg border border-collapse border-gray-300 focus:border-gray-700 focus:border "  type="text">
            <p id="alert_nik" class="text-xs text-red-400 hidden">NIK harus diisi</p>
            </div>
        <input type="submit" id="TbMasuk" class=" mt-8 cursor-default TbPasif w-full h-10 rounded-lg  items-center flex justify-center font-semibold  " value="lanjutkan"/>
     </form>
    </div>

    <!-- step 3 -->
    <div class=" p-5 text-gray-700 flex container rounded-lg drop-shadow-lg justify-center flex-col items-center bg-white"> 
        <h1 class=" text-lg font-semibold mb-3 ">Lupa kata sandi ? </h1>
        <p>Buat kata sandi baru !</p>
      <form action="" class=" w-full">  
        <div class="w-full flex flex-col my-1 ">
            <label for="sandi" class=" text-xs" >Kata Sandi</label>
            <input on:keyup={()=>{CekSandi()}} bind:value={Sandi}   placeholder="Contoh: Sandi123!" id="inpSandi" class=" inpSandi placeholder:text-gray-300  px-3 placeholder:text-sm  my-1 h-9 rounded-lg border border-collapse border-gray-300 focus:border-gray-700"  type="password">

            <label for="sandi" class=" text-xs mt-1" >Ulang Kata Sandi</label>
            <input on:keyup={()=>{CekSandi()}} bind:value={ConfSandi}   placeholder="Contoh: Sandi123!" class=" inpSandi placeholder:text-gray-300  px-3 placeholder:text-sm  my-1 h-9 rounded-lg border border-collapse border-gray-300 focus:border-gray-700"  type="password">
            <p id="alert_sandi" class="text-xs text-red-400 hidden">NIK harus diisi</p>
            <button type="submit"  on:click={()=>{TampilkanSandi()}} class="text-xs self-end mr-3">tampilkan sandi</button>
            <input type="submit" id="TbMasuk" class=" mt-8 cursor-default TbPasif w-full h-10 rounded-lg  items-center flex justify-center font-semibold  " value="simpan"/>


     </form>
   
    </div>
    <p class=" text-sm text-gray-400 my-10">2024. Eka Group Indonesia</p>
</div>