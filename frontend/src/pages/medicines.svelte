<script>
  import { onMount } from "svelte";
  import { fetchMedicines } from "../api";

  let medicines = []

  onMount(async () =>{
    try {
      medicines = await fetchMedicines();
    } catch (error) {
      console.error(error)
    }
  })
</script>

<main class="container mx-auto p-10">
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Medicine Inventory</h1>

    <!-- Search Filter -->

    <!-- Medicine List -->
    {#if medicines.length}
      <table class="min-w-full table-auto bg-background shadow-md rounded-lg">
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
      <p>No medicines found</p>
    {/if}
  </div>
</main>
