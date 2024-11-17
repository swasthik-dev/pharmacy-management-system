<script>
  import { onMount } from "svelte";
  import { fetchMedicines, placeOrders } from "../api";

  let medicines = [];
  let orders = [];
  let showModal = false;

  // Load Medicine to load medicine table when page loaded
  async function loadMedicines() {
    try {
      medicines = await fetchMedicines();
      medicines = medicines.map((medicine) => ({
        ...medicine,
        selectedQty: 1,
      }));
    } catch (error) {
      console.error(error);
    }
  }

  // Modal to add orders, toggle function in order to open and close the modal
  function toggleModal() {
    showModal = !showModal;
  }

  // Validating the qty of the medicine in modal
  function validateQuantity(medicine) {
    if (medicine.selectedQty < 1) {
      medicine.selectedQty = 1; // Default to 1 if invalid
    }
  }

  // Function to add medicine to order summary
  function addToOrder(medicine) {
    const existingOrderIndex = orders.findIndex(
      (order) => order.medicineId === medicine.medicineId,
    );

    if (existingOrderIndex !== -1) {
      // Update the quantity for the existing order
      orders = orders.map((order, index) =>
        index === existingOrderIndex
          ? { ...order, stockQty: medicine.selectedQty }
          : order,
      );

      // Reset the modal quantity for the medicine
      medicine.selectedQty = 1;
    } else {
      // Add a new order if it doesn't already exist
      orders = [
        ...orders,
        {
          ...medicine,
          stockQty: medicine.selectedQty,
        },
      ];
      // Reset the modal quantity for the medicine
      medicine.selectedQty = 1;
    }
  }

  function removeFromOrder(medicineId) {
    orders = orders.filter((order) => order.medicineId !== medicineId);
  }

  // Calculate grand total
  function calculateGrandTotal() {
    const grandTotal =  orders
      .reduce((total, order) => total + order.selectedQty * order.price, 0)
      .toFixed(2);
    return grandTotal
  }

  // Place order function
  async function placeOrder() {
    if (orders.length === 0){
      alert("No items in order");
      return;
    }

    const orderData = {
      orderDate: new Date(),
      customerId: "100",
      totalAmount: calculateGrandTotal(),
    }

    try {
      const response = await placeOrders(orderData);
      console.log('Order placed:', response)
      alert('Order Placed')
      orders = [];
    } catch (error) {
      alert('Failed to place order');
    }
  }

  onMount(() => {
    loadMedicines();
  });
</script>

<main class="w-full">
  <h1 class="text-2xl font-bold">Orders Page</h1>
  <div class="flex p-2 gap-5">
    <!-- Order Summary -->
    <div
      class="overflow-x-scroll border-2 border-[#524A4A] rounded-md"
      style="scrollbar-width: none;"
    >
      <div class="flex justify-between items-center">
        <h1 class="m-5 font-medium">Order Summary</h1>
        <button
          on:click={toggleModal}
          class="mr-5 bg-green-500 h-12 w-28 rounded-md shadow-md shadow-gray-600 hover:bg-green-600 hover:scale-110"
          >Add Medicines</button
        >
      </div>
      <table
        class="min-w-full border-collapse table-auto bg-white shadow-md rounded-lg"
      >
        <thead>
          <tr
            class="bg-[#bbbaba] text-foreground uppercase text-sm leading-normal"
          >
            <th class="py-3 px-6 text-left">Med ID</th>
            <th class="py-3 px-6 text-left">Name</th>
            <th class="py-3 px-6 text-left">Qty</th>
            <th class="py-3 px-6 text-left">PPU</th>
            <th class="py-3 px-6 text-left">Total Price</th>
            <th class="py-3 px-6 text-left"></th>
          </tr>
        </thead>
        {#if orders.length}
          <tbody class="text-foreground text-sm font-light">
            {#each orders as order}
              <tr class="border-b border-white hover:bg-[#d6d4d4]">
                <td class="py-3 px-6">{order.medicineId}</td>
                <td class="py-3 px-6">{order.name}</td>
                <td class="py-3 px-6">{order.stockQty}</td>
                <td class="py-3 px-6">₹{order.price}</td>
                <td class="py-3 px-6"
                  >₹{(order.stockQty * order.price).toFixed(2)}</td
                >
                <td class="py-3 px-6">
                  <button
                    on:click={() => removeFromOrder(order.medicineId)}
                    class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        {:else}
          <tbody><tr class="text-black"><td>No orders found</td></tr></tbody>
        {/if}
        <tfoot class="">
          <tr class="font-bold rounded-md shadow-sm shadow-gray-500">
            <td colspan="1" class="py-3 px-4">Grand Total:</td>
            <td class="py-3">{calculateGrandTotal()}</td>
          </tr>
        </tfoot>
      </table>
      <!-- Place Order Button -->
      <button
        on:click={placeOrder}
        class="bg-[#292767] hover:bg-blue-700 hover:scale-105 text-white px-6 py-2 rounded shadow-lg m-5"
      >
        Place Order
      </button>
    </div>

    <!-- Order Status -->
     <div class="overflow-x-scroll border-2 border-[#524A4A] rounded-md"
      style="scrollbar-width: none;">

      <div class="flex justify-between items-center">
        <h1 class="m-5 font-medium">Order Status</h1>
      </div>
     </div>
  </div>

  <!-- Modal for Adding Medicines -->
  {#if showModal}
    <div
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white w-[50%] p-6 rounded-lg shadow-lg relative">
        <h2 class="text-lg font-semibold mb-4">Select Medicines to Add</h2>
        <table
          class="min-w-full border-collapse table-auto bg-white shadow-md rounded-lg"
        >
          <thead>
            <tr
              class="bg-[#524A4A] text-foreground uppercase text-sm leading-normal"
            >
              <th class="py-3 px-6 text-left">Med ID</th>
              <th class="py-3 px-6 text-left">Name</th>
              <th class="py-3 px-6 text-left">Price</th>
              <th class="py-3 px-6 text-left">Quantity</th>
              <th class="py-3 px-6 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {#each medicines as medicine}
              <tr class="border-b border-gray-300 hover:bg-gray-200">
                <td class="py-3 px-6">{medicine.medicineId}</td>
                <td class="py-3 px-6">{medicine.name}</td>
                <td class="py-3 px-6">₹{medicine.price}</td>
                <td class="py-3 px-6">
                  <input
                    type="number"
                    min="1"
                    bind:value={medicine.selectedQty}
                    on:input={() => validateQuantity(medicine)}
                    class="w-16 text-center border rounded"
                  />
                </td>
                <td class="py-3 px-6">
                  <button
                    on:click={() => addToOrder(medicine)}
                    class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Add
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>

        <!-- Close Button -->
        <div class="flex justify-center mt-6">
          <button
            on:click={toggleModal}
            class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded"
          >
            Close Modal
          </button>
        </div>
      </div>
    </div>
  {/if}
</main>
