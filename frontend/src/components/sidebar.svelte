<script>
  import { Link } from "svelte-routing";
</script>

<div
  class="flex flex-col items-center py-10 bg-[#708090] text-foreground w-[260px] backdrop-blur-2xl h-screen rounded-br-xl shadow-lg shadow-foreground">
    <a href="/"><span class="text-3xl font-black">PharmaCo</span></a>
    <ul class="flex flex-col items-center pt-14 space-y-5">
      <li class="text-2xl font-bold p-5 hover:scale-110">
        <a href="/medicines" class="flex items-center space-x-1"
          ><span>Medicine</span></a
        >
      </li>
      <li class="text-xl font-bold p-5 hover:scale-110">
        <a href="/supplier" class="flex items-center space-x-1"
          ><span>Supplier</span></a
        >
      </li>
      <li class="text-xl font-bold p-5 hover:scale-110">
        <a href="/sales" class="flex items-center space-x-1"
          ><span>Orders</span></a
        >
      </li>
      <li class="text-xl font-bold p-5 hover:scale-110">
        <a href="/inventory" class="flex items-center space-x-1"
          ><span>Inventory</span></a
        >
      </li>
      <li class="text-xl font-bold p-5 hover:scale-110">
        <a href="/customer" class="flex items-center space-x-1"
          ><span>Customer</span></a
        >
      </li>
    </ul>
</div>
