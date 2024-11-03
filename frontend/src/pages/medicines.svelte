<script>
  import { Route, Router, Link } from "svelte-routing";

  let medicines = [
    {
      id: 1,
      name: "Paracetamol",
      type: "Tablet",
      quantity: 100,
      expiry: "2024-12-31",
    },
    {
      id: 2,
      name: "Amoxicillin",
      type: "Capsule",
      quantity: 50,
      expiry: "2025-01-15",
    },
    {
      id: 3,
      name: "Ibuprofen",
      type: "Tablet",
      quantity: 200,
      expiry: "2025-06-10",
    },
    {
      id: 4,
      name: "Metformin",
      type: "Tablet",
      quantity: 150,
      expiry: "2024-11-05",
    },
    {
      id: 5,
      name: "Cetirizine",
      type: "Syrup",
      quantity: 75,
      expiry: "2026-03-30",
    },
  ];

  let searchTerm = "";

  $: filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
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
            <th class="py-3 px-6 text-left">Type</th>
            <th class="py-3 px-6 text-left">Stock Quantity</th>
            <th class="py-3 px-6 text-left">Expiry Date</th>
          </tr>
        </thead>
        <tbody class="text-foreground text-sm font-light">
          {#each medicines as medicine}
            <tr class="border-b border-white hover:bg-gray-600">
              <td class="py-3 px-6">{medicine.id}</td>
              <td class="py-3 px-6">{medicine.name}</td>
              <td class="py-3 px-6">{medicine.type}</td>
              <td class="py-3 px-6">{medicine.quantity}</td>
              <td class="py-3 px-6">{medicine.expiry}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      <p>No medicines found</p>
    {/if}
  </div>
</main>
