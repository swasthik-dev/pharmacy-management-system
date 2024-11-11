<script>
  import { deleteMedicine } from "../api";

  let medicineId = "";
  let name = "";
  let description = "";
  let price = 0.0;
  let stockQty = 0;
  let expiryDate = "";
  
  const handleDeleteMedicine = async () => {
    try {
      await deleteMedicine(medicineId);
      alert("Deleted medicine successfully!");
    } catch (error) {
      console.error('Failed to delete medicine', error);
      alert("Failed to delete medicine")
    }
  }
</script>

<main class="container mx-auto p-3">
  <h1 class="text-3xl font-bold mb-6">Delete Medicine</h1>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <div class="mb-4">
      <label for="med-id" class="block text-gray-700">Medicine ID</label>
      <input bind:value={medicineId} class="w-full px-3 py-2 border rounded" />
    </div>
  </div>
  <!-- Add more fields for other attributes -->

  <button
    on:click={handleDeleteMedicine}
    class="bg-green-500 text-white py-2 px-4 rounded"
  >
    Delete Medicine
  </button>
</main>