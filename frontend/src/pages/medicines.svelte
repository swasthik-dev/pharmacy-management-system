<script>
  import { onMount } from "svelte";
  import {
    fetchMedicines,
    fetchLowStockMedicines,
    fetchNearExpiryMedicines,
    deleteMedicine,
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

  // Handling delete medicine function
  async function handleDeleteMedicine(medicineId) {
    try {
      await deleteMedicine(medicineId);
    } catch (error) {}
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
    </div>
    <div class="flex gap-5">
      <div
        class="bg-white w-[65%] overflow-x-auto overflow-hidden border border-gray-300 rounded-md"
        style="scrollbar-width: none;"
      >
        <!-- Medicine List -->
        <table class="table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr
              class="bg-[#bbbaba] text-foreground uppercase text-sm leading-normal"
            >
              <th class="py-3 px-[18px] text-left">Med ID</th>
              <th class="py-3 px-6 text-left">Name</th>
              <th class="py-3 px-6 text-left min-w-[300px]">Description</th>
              <th class="py-3 px-6 text-left">Price</th>
              <th class="py-3 px-4 text-left">Stock Qty</th>
              <th class="py-3 px-6 text-left">Expiry Date</th>
              <th class="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          {#if medicines.length}
            <tbody class="text-foreground text-sm font-normal">
              {#each medicines as medicine}
                <tr class="border-b border-white hover:bg-[#d6d4d4]">
                  <td class="py-3 px-6">{medicine.medicineId}</td>
                  <td class="py-3 px-6">{medicine.name}</td>
                  <td class="py-3 px-6 min-w-[300px]">{medicine.description}</td
                  >
                  <td class="py-3 px-6">{medicine.price}</td>
                  <td class="py-3 px-6">{medicine.stockQty}</td>
                  <td class="py-3 px-6">{medicine.expiryDate}</td>
                  <td class="py-3 px-6"
                    ><button
                      class="bg-[#292767] hover:bg-blue-700 text-white font-semibold p-1 rounded-md"
                      on:click={() => handleDeleteMedicine(medicine.medicineId)}
                      >Delete medicine</button
                    ></td
                  >
                </tr>
              {/each}
            </tbody>
          {:else}
            <tbody
              ><tr class="text-black"><td>No medicines found</td></tr></tbody
            >
          {/if}
        </table>
      </div>
      <!-- Low Stock & Expiry div-->
      <div class="">

        <!-- Low Stock-->

        <div class="overflow-x-auto py-5" style="scrollbar-width: none;">
          <h1 class="font-semibold text-xl">Low Stock</h1>
          <table class="min-w-full table-auto bg-white shadow-md rounded-lg">
            <thead>
              <tr
                class="bg-[#bbbaba] text-foreground uppercase text-sm leading-normal"
              >
                <th class="py-3 px-[18px] text-left">Med ID</th>
                <th class="py-3 px-[18px] text-left">Name</th>
                <th class="py-3 px-[18px] text-left">Stock Qty</th>
              </tr>
            </thead>
            {#if lowStockMedicines.length}
              <tbody>
                {#each lowStockMedicines as lowstock}
                  <tr class="border-b border-white hover:bg-[#d6d4d4]">
                    <td class="py-3 px-6">{lowstock.medicineId}</td>
                    <td class="py-3 px-6">{lowstock.name}</td>
                    <td class="py-3 px-6">{lowstock.stockQty}</td>
                  </tr>
                {/each}
              </tbody>
            {:else}
              <tbody
                ><tr class="text-black"
                  ><td>No low stock medicines found</td></tr
                ></tbody
              >
            {/if}
          </table>
        </div>

        <!-- Expiry Date-->

        <div class="overflow-x-auto" style="scrollbar-width: none;">
          <h1 class="font-semibold text-xl">Expiry Date</h1>
          <table class="min-w-full table-auto bg-white shadow-md rounded-lg">
            <thead>
              <tr
                class="bg-[#bbbaba] text-foreground uppercase text-sm leading-normal"
              >
                <th class="py-3 px-[18px] text-left">Med ID</th>
                <th class="py-3 px-[18px] text-left">Name</th>
                <th class="py-3 px-[18px] text-left">Expiry Date</th>
              </tr>
            </thead>
            {#if expiringMedicines.length}
              <tbody>
                {#each expiringMedicines as nearexpiry}
                  <tr class="border-b border-white hover:bg-[#d6d4d4]">
                    <td class="py-3 px-6">{nearexpiry.medicineId}</td>
                    <td class="py-3 px-6">{nearexpiry.name}</td>
                    <td class="py-3 px-6">{nearexpiry.expiryDate}</td>
                  </tr>
                {/each}
              </tbody>
            {:else}
              <tbody
                ><tr class="text-black"
                  ><td>No near expiry medicines found</td></tr
                ></tbody
              >
            {/if}
          </table>
        </div>
      </div>
    </div>

    <!-- Link to Add/Edit Medicine page -->
    <button
      class="bg-[#292767] hover:bg-blue-700 text-white font-bold mt-4 p-2 rounded"
      ><a href="/addmedicine">Add Medicines</a></button
    >
    <button
      class="bg-[#292767] hover:bg-blue-700 text-white font-bold mt-4 p-2 rounded"
      ><a href="/updatemedicine">Update Medicines</a></button
    >
  </div>
</main>
