<script>
  import { onMount } from "svelte";
  import { fetchSuppliers} from "../api";

  let suppliers = [];

  onMount(async () => {
    try {
      suppliers = await fetchSuppliers();
    } catch (error) {
      console.error(error);
    }
  });
</script>

<main class="container mx-auto p-10">
  <div class="p-6 bg-[#f1efefdc]">
    <h1 class="text-3xl font-bold mb-6 text-black">Supplier Directory</h1>

    <!-- Supplier List -->
    {#if suppliers.length}
      <table class="min-w-full table-auto bg-background shadow-md rounded-lg">
        <thead>
          <tr
            class="bg-[#bbbaba] text-foreground uppercase text-sm leading-normal"
          >
            <th class="py-3 px-6 text-left">Supplier ID</th>
            <th class="py-3 px-6 text-left">Name</th>
            <th class="py-3 px-6 text-left">Contact Number</th>
            <th class="py-3 px-6 text-left">Address</th>
          </tr>
        </thead>
        <tbody class="text-foreground text-sm font-light">
          {#each suppliers as supplier}
            <tr class="border-b border-white hover:bg-gray-600">
              <td class="py-3 px-6">{supplier.supplierId}</td>
              <td class="py-3 px-6">{supplier.name}</td>
              <td class="py-3 px-6">{supplier.contactNumber}</td>
              <td class="py-3 px-6">{supplier.address}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      <p>No suppliers found</p>
    {/if}
  </div>
</main>
