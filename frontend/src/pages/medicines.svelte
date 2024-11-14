<script>
  import { onMount } from "svelte";
  import {
    fetchMedicines,
    fetchLowStockMedicines,
    fetchNearExpiryMedicines,
  } from "../api";
  import { link } from "svelte-routing";

  let medicines = [];
  let lowStockMedicines = [];
  let expiringMedicines = [];
  let category = ""; // Selected category for filtering
  let medicineId = ""; // Medicine ID for search
  let name = ""; // Medicine name for search

  // Function to load medicines based on selected filters
  async function loadMedicines() {
    try {
      medicines = await fetchMedicines({ medicineId, name });
    } catch (error) {
      console.error(error);
    }
  }

  // Get low-stock medicines
  async function getLowStockMedicines(threshold) {
    try {
      lowStockMedicines = await fetchLowStockMedicines(threshold);
    } catch (error) {
      console.error(error);
    }
  }

  // Get near-expiry medicines
  async function getNearExpiryMedicines(days) {
    try {
      expiringMedicines = await fetchNearExpiryMedicines(days);
    } catch (error) {
      console.error(error);
    }
  }

  // Load medicines on component mount
  onMount(() => {
    loadMedicines();
    getLowStockMedicines();
    getNearExpiryMedicines();
  });
</script>

<main class="container mx-auto p-3">
  <div class="p-6 bg-[#f1efefdc]">
    <h1 class="text-3xl font-semibold mb-6 text-black">Medicine Inventory</h1>

    <!-- Filter Section -->
    <div class="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
      
      <!-- Medicine ID Search -->
      <div>
        <label for="med-id-input" class="block text-black font-semibold mb-1"
        >Search by Medicine ID</label
        >
        <input
        id="med-id-input"
        type="text"
        bind:value={medicineId}
        on:input={loadMedicines}
        class="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
        placeholder="Enter Medicine ID"
        />
      </div>
      
      <!-- Medicine Name Search -->
      <div>
        <label for="name-input" class="block text-black font-semibold mb-1"
        >Search by Medicine Name</label
        >
        <input
        id="name-input"
        type="text"
        bind:value={name}
        on:input={loadMedicines}
        class="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
        placeholder="Enter Medicine Name"
        />
      </div>
      <!-- Low Stock Medicine & Expiry Medicine-->
      
    </div>
    
    <!-- Medicine List -->
    {#if medicines.length}
    <table class="min-w-full table-auto bg-white shadow-md rounded-lg">
      <thead>
        <tr
            class="bg-[#bbbaba] text-foreground uppercase text-sm leading-normal"
          >
            <th class="py-3 px-[18px] text-left">Med ID</th>
            <th class="py-3 px-6 text-left">Name</th>
            <th class="py-3 px-6 text-left">Description</th>
            <th class="py-3 px-6 text-left">Price</th>
            <th class="py-3 px-4 text-left">Stock Qty</th>
            <th class="py-3 px-6 text-left">Expiry Date</th>
          </tr>
        </thead>
        <tbody class="text-foreground text-sm font-light">
          {#each medicines as medicine}
            <tr class="border-b border-white hover:bg-[#d6d4d4]">
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

    <!-- Link to Add/Edit Medicine page -->
    <button class="bg-[#292767] hover:bg-blue-700 text-white font-bold mt-4 p-2 rounded"><a href="/addmedicine">Add Medicines</a></button>
    <button class="bg-[#292767] hover:bg-blue-700 text-white font-bold mt-4 p-2 rounded"><a href="/updatemedicine">Update Medicines</a></button>
    <button class="bg-[#292767] hover:bg-blue-700 text-white font-bold mt-4 p-2 rounded"><a href="/deletemedicine">Delete Medicines</a></button>
  </div>
</main>
