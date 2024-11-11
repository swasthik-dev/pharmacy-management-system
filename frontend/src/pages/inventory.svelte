<script>
    import { onMount } from "svelte";
    import { fetchInventory } from "../api";
  
    let inventory = []
  
    onMount(async () =>{
      try {
        inventory = await fetchInventory();
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
      {#if inventory.length}
        <table class="min-w-full table-auto bg-background shadow-md rounded-lg">
          <thead>
            <tr
              class="bg-[#524A4A] text-foreground uppercase text-sm leading-normal"
            >
              <th class="py-3 px-6 text-left">InventoryID</th>
              <th class="py-3 px-6 text-left">medicineID</th>
              <th class="py-3 px-6 text-left">SupplierID</th>
              <th class="py-3 px-6 text-left">Quantity_Received</th>
              <th class="py-3 px-6 text-left">Date_Received</th>
            </tr>
          </thead>
          <tbody class="text-foreground text-sm font-light">
            {#each inventory as inventory}
              <tr class="border-b border-white hover:bg-gray-600">
                <td class="py-3 px-6">{inventory.InventoryID}</td>
                <td class="py-3 px-6">{inventory.medicineID}</td>
                <td class="py-3 px-6">{inventory.SupplierID}
                <td class="py-3 px-6">{inventory.Quantity_Received}</td>
                <td class="py-3 px-6">{inventory.Date_Received}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      {:else}
        <p>No inventory  found</p>
      {/if}
    </div>
  </main>
  