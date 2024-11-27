<script>
  import { Link } from "svelte-routing"; // Optional if you're using <Link> instead of <a>
</script>

<div
  class="flex flex-col items-center py-10 bg-[#c4c5c6] text-foreground w-[260px] backdrop-blur-2xl h-screen rounded-br-xl shadow-lg shadow-foreground">
    <a href="/"><span class="text-3xl font-semibold font-sans">PHARMA <br class="">HUB</span></a>
    <ul class="flex flex-col pt-12 space-y-5">

      <li class="text-xl font-bold p-5 hover:scale-110">
        <a href="/" class="flex items-center space-x-1 font-semibold"
          ><span>Medicine</span></a
        >
      </li>
      <li class="text-xl font-bold p-5 hover:scale-110">
        <a href="/supplier" class="flex items-center space-x-1 font-semibold "
          ><span>Supplier</span></a
        >
      </li>
      <li class="text-xl font-bold p-5 hover:scale-110">
        <a href="/orders" class="flex items-center space-x-1 font-semibold"
          ><span>Orders</span></a
        >
      </li>
      <li class="text-xl font-bold p-5 hover:scale-110">
        <a href="/customer" class="flex items-center space-x-1 font-semibold"
          ><span>Customer</span></a
        >
      </li>
      

    </ul>
</div>
