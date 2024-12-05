<script>
  import { onMount } from "svelte";
  import { fetchCustomers, searchCustomerByPhone } from "../api";

  let customers = [];
  let searchQuery = "";
  let timeout;

  // Displaying all customers by fetching from database.
  async function displayCustomers() {
    try {
      customers = await fetchCustomers();
    } catch (error) {
      console.error(error);
    }
  }

  // Search customers by phone number
  async function handleSearch() {
    clearTimeout(timeout); // Clear any previous timeout
    timeout = setTimeout(async () => {
      if (searchQuery.trim() === "") {
        await displayCustomers();
      } else {
        try {
          customers = await searchCustomerByPhone(searchQuery);
        } catch (error) {
          console.error(error);
        }
      }
    }, 300); // Adjust the debounce time (300 ms)
  }

  // onMount() function to display data on page load.
  onMount(() => {
    displayCustomers();
  });
</script>

<main class="container mx-auto p-3">
  <div class="p-6 bg-[#f1efefdc]">
    <h1 class="text-3xl font-semibold mb-6 text-black">Customer Dashboard</h1>

    <!-- Search Bar -->
    <div class="mb-6">
      <input
        type="text"
        placeholder="Search by Contact Number..."
        bind:value={searchQuery}
        on:input={handleSearch}
        class="px-4 py-2 border border-gray-300 rounded-lg"
      />
    </div>

    <!-- Customers Table -->
    <table class="table-auto bg-white shadow-md rounded-lg">
      <thead>
        <tr
          class="bg-[#bbbaba] text-foreground uppercase text-sm leading-normal"
        >
          <th class="py-3 px-6 text-left">Customer ID</th>
          <th class="py-3 px-6 text-left">Customer Name</th>
          <th class="py-3 px-6 text-left">Contact Number</th>
          <th class="py-3 px-6 text-left">Email</th>
          <th class="py-3 px-6 text-left">Address</th>
          <!-- <th>Orders</th> -->
          <!-- <th>Actions</th> -->
        </tr>
      </thead>
      {#if customers.length}
        <tbody class="text-foreground text-sm font-normal">
          {#each customers as customer}
            <tr class="border-b border-white hover:bg-[#d6d4d4]">
              <td class="py-3 px-6">{customer.customerId}</td>
              <td class="py-3 px-6">{customer.name}</td>
              <td class="py-3 px-6">{customer.contactNumber}</td>
              <td class="py-3 px-6">{customer.email}</td>
              <td class="py-3 px-6">{customer.address}</td>
            </tr>
          {/each}
        </tbody>
      {:else}
        <tbody><tr class="text-black"><td>No customers found</td></tr></tbody>
      {/if}
    </table>
  </div>
</main>
