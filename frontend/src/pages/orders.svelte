<script>
    import { onMount } from "svelte";
  import { fetchMedicines } from "../api";

  let medicines = [];

  async function loadMedicines() {
    try {
      medicines = await fetchMedicines();
    } catch (error) {
      console.error(error);
    }
  }

  onMount(() => {
    loadMedicines();
  })
</script>

<main class="w-full">
  <h1 class="text-2xl font-bold">Orders Page</h1>
  <div class="flex p-2 gap-5">
    <div class="overflow-x-scroll border-2 border-[#524A4A] rounded-md" style="scrollbar-width: none;">
      {#if medicines.length}
        <table
          class="min-w-full border-collapse table-auto bg-white shadow-md rounded-lg"
        >
          <thead>
            <tr
              class="bg-[#524A4A] text-foreground uppercase text-sm leading-normal"
            >
              <th class="py-3 px-6 text-left">Med ID</th>
              <th class="py-3 px-6 text-left">Name</th>
              <th class="py-3 px-6 text-left">Description</th>
              <th class="py-3 px-6 text-left">Price</th>
              <th class="py-3 px-6 text-left">Stock Quantity</th>
              <th class="py-3 px-6 text-left">Expiry Date</th>
            </tr>
          </thead>
          <tbody class="text-foreground text-sm font-light">
            {#each medicines as medicine}
              <tr class="border-b border-white hover:bg-gray-600">
                <td class="py-3 px-6">{medicine.medicineId}</td>
                <td class="py-3 px-6">{medicine.name}</td>
                <td class="py-3 px-6">{medicine.description}</td>
                <td class="py-3 px-6">{medicine.price}</td>
                <td class="py-3 px-6">{medicine.stockQty}</td>
                <td class="py-3 px-6">{medicine.expiryDate}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      {:else}
        <p class="text-white">No medicines found</p>
      {/if}
    </div>
    <div class="overflow-x-scroll border-2 border-[#524A4A] rounded-md" style="scrollbar-width: none;">
      {#if medicines.length}
        <table
          class="min-w-full border-collapse table-auto bg-white shadow-md rounded-lg"
        >
          <thead>
            <tr
              class="bg-[#524A4A] text-foreground uppercase text-sm leading-normal"
            >
              <th class="py-3 px-6 text-left">Med ID</th>
              <th class="py-3 px-6 text-left">Name</th>
              <th class="py-3 px-6 text-left">Description</th>
              <th class="py-3 px-6 text-left">Price</th>
              <th class="py-3 px-6 text-left">Stock Quantity</th>
              <th class="py-3 px-6 text-left">Expiry Date</th>
            </tr>
          </thead>
          <tbody class="text-foreground text-sm font-light">
            {#each medicines as medicine}
              <tr class="border-b border-white hover:bg-gray-600">
                <td class="py-3 px-6">{medicine.medicineId}</td>
                <td class="py-3 px-6">{medicine.name}</td>
                <td class="py-3 px-6">{medicine.description}</td>
                <td class="py-3 px-6">{medicine.price}</td>
                <td class="py-3 px-6">{medicine.stockQty}</td>
                <td class="py-3 px-6">{medicine.expiryDate}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      {:else}
        <p class="text-white">No medicines found</p>
      {/if}
    </div>
  </div>
</main>