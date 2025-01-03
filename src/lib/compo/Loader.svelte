<script>
	import { onMount } from "svelte";
	onMount(() => {
		if (document.readyState) {
			const target = document.getElementById("loader")?.classList;
			setTimeout(() => {
				target?.remove("backdrop-blur-lg");
				setTimeout(() => {
					target?.add("hidden");
				}, 800);
			}, 800);
		}
	});
</script>

<div
	id="loader"
	class="backdrop-blur-lg z-50 transition duration-500  fixed grid justify-center items-center bg-opacity-20 bg-gray-100 w-screen h-screen"
>
	<div class="flex flex-col justify-center items-center">
		<div
			class="  animate-spin w-8 h-8  rounded-full border--500 border-dotted border-t-4 border-r-8"
		/>

		<h1>memuat..</h1>
	</div>
</div>
