<!-- ModifyMedicine.svelte -->
<script>
  import { onMount } from "svelte";
  import { addMedicine, updateMedicine, deleteMedicine } from "../api";

  let medicineId = "";
  let name = "";
  let description = "";
  let price = 0;
  let stockQty = 0;
  let expiryDate = "";

  const handleAddMedicine = async () => {
    await addMedicine({ medicineId, name, description, price, stockQty, expiryDate });
  };

  const handleUpdateMedicine = async () => {
    await updateMedicine({ medicineId, name, description, price, stockQty, expiryDate });
  };

  const handleDeleteMedicine = async () => {
    await deleteMedicine(medicineId);
  };
</script>

<main class="container mx-auto p-3">
  <h1 class="text-3xl font-bold mb-6">Modify Medicine</h1>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <div class="mb-4">
      <label for="med-id" class="block text-gray-700">Medicine ID</label>
      <input bind:value={medicineId} class="w-full px-3 py-2 border rounded" />
    </div>
    <div class="mb-4">
      <label for="med-name" class="block text-gray-700">Name</label>
      <input bind:value={name} class="w-full px-3 py-2 border rounded" />
    </div>
    <div class="mb-4">
      <label for="med-description" class="block text-gray-700">Description</label>
      <input bind:value={description} class="w-full px-3 py-2 border rounded" />
    </div>
    <div class="mb-4">
      <label for="med-price" class="block text-gray-700">Price</label>
      <input bind:value={price} class="w-full px-3 py-2 border rounded" />
    </div>
    <div class="mb-4">
      <label for="med-stockqty" class="block text-gray-700">Stock Qty</label>
      <input bind:value={stockQty} class="w-full px-3 py-2 border rounded" />
    </div>
    <div class="mb-4">
      <label for="med-expdate" class="block text-gray-700">Expiry Date</label>
      <input bind:value={expiryDate} class="w-full px-3 py-2 border rounded" />
    </div>
  </div>
  <!-- Add more fields for other attributes -->

  <button on:click={handleAddMedicine} class="bg-green-500 text-white py-2 px-4 rounded">
    Add Medicine
  </button>
  <button on:click={handleUpdateMedicine} class="bg-yellow-500 text-white py-2 px-4 rounded">
    Update Medicine
  </button>
  <button on:click={handleDeleteMedicine} class="bg-red-500 text-white py-2 px-4 rounded">
    Delete Medicine
  </button>
</main>
