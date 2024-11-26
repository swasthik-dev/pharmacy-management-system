<script>
  import { navigate } from 'svelte-routing';

  // Sample data for multiple customers
  let customers = [
    {
      id: 98765,
      firstName: "Alice",
      lastName: "Smith",
      contact: "987-654-3210",
      email: "alice.smith@example.com",
      address: "456 Park Avenue, New York, NY 10022",
      orders: [
        { orderId: 5678, date: "2023-03-10" },
        { orderId: 9123, date: "2023-06-15" },
      ],
    },
    {
      id: 12345,
      firstName: "John",
      lastName: "Doe",
      contact: "123-456-7890",
      email: "john.doe@example.com",
      address: "123 Elm Street, Los Angeles, CA 90001",
      orders: [
        { orderId: 2345, date: "2023-02-10" },
        { orderId: 6789, date: "2023-07-25" },
      ],
    },
    {
      id: 67890,
      firstName: "Emily",
      lastName: "Johnson",
      contact: "555-123-4567",
      email: "emily.johnson@example.com",
      address: "789 Oak Road, Chicago, IL 60007",
      orders: [
        { orderId: 1357, date: "2023-01-05" },
        { orderId: 2468, date: "2023-08-20" },
      ],
    },
  ];

  // State for search query and filtered customers
  let searchQuery = '';
  let filteredCustomers = [...customers];

  // Filter customers based on the search query
  function filterCustomers() {
    filteredCustomers = customers.filter(customer =>
      `${customer.firstName} ${customer.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }

  let showSupportModal = false;

  // Function to export orders
  function exportOrders(customer) {
    // Prepare the CSV content for the orders
    let csvContent = "Order ID,Date\n";
    customer.orders.forEach(order => {
      csvContent += `${order.orderId},${order.date}\n`;
    });

    // Create a Blob object for the CSV content
    const blob = new Blob([csvContent], { type: "text/csv" });

    // Create a download link and trigger it
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${customer.firstName}_${customer.lastName}_Orders.csv`;
    a.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);
  }

  function openSupportModal() {
    showSupportModal = true;
  }

  function closeSupportModal() {
    showSupportModal = false;
  }

  function submitSupportRequest() {
    alert("Support request submitted successfully!");
    showSupportModal = false;
  }
</script>

<style>
  :global(body) {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    background-color: #f4f5f7;
  }

  .container {
    max-width: 1200px;
    margin: 40px auto;
    padding: 20px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .header {
    text-align: center;
    margin-bottom: 30px;
  }

  h1 {
    margin: 0;
    font-size: 28px;
    color: #333;
  }

  .search-bar {
    margin-bottom: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }

  table th, table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  table th {
    background: #f8f8f8;
  }

  .button {
    display: inline-block;
    padding: 10px 15px;
    color: white;
    background:  #292767;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    transition: background 0.3s ease;
  }

  .button:hover {
    background:  #292767;
  }

  .buttons-group {
    margin-top: 20px;
    text-align: center;
  }

  .support {
    text-align: center;
    margin-top: 20px;
  }

  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    width: 400px;
  }

  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }

  @media (max-width: 768px) {
    table th, table td {
      font-size: 12px;
    }
  }
</style>

<div class="container">
  <!-- Header -->
  <div class="header">
    <h1>Customer Dashboard</h1>
  </div>

  <!-- Search Bar -->
  <div class="search-bar">
    <input 
      type="text" 
      placeholder="Search by Name..." 
      bind:value={searchQuery} 
      on:input={filterCustomers} 
      style="width: 100%; padding: 10px; margin-bottom: 15px; border-radius: 5px; border: 1px solid #ddd;"
    />
  </div>

  <!-- Customers Table -->
  <table>
    <thead>
      <tr>
        <th>Customer ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Contact Number</th>
        <th>Email</th>
        <th>Address</th>
        <th>Orders</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each filteredCustomers as customer}
        <tr>
          <td>{customer.id}</td>
          <td>{customer.firstName}</td>
          <td>{customer.lastName}</td>
          <td>{customer.contact}</td>
          <td>{customer.email}</td>
          <td>{customer.address}</td>
          <td>
            <ul>
              {#each customer.orders as order}
                <li>Order ID: {order.orderId}, Date: {order.date}</li>
              {/each}
            </ul>
          </td>
          <td>
            <button class="button" on:click={() => exportOrders(customer)}>Export Orders</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <!-- Customer Support -->
  <div class="support">
    <h2>Need Assistance?</h2>
    <button class="button" on:click={openSupportModal}>Contact Support</button>
  </div>
</div>

<!-- Support Modal -->
{#if showSupportModal}
  <div class="modal-backdrop" on:click={closeSupportModal}></div>
  <div class="modal">
    <h2>Contact Support</h2>
    <p>Please fill out the form below:</p>
    <form on:submit|preventDefault={submitSupportRequest}>
      <label for="name">Name:</label><br>
      <input id="name" type="text" required /><br><br>
      <label for="email">Email:</label><br>
      <input id="email" type="email" required /><br><br>
      <label for="message">Message:</label><br>
      <textarea id="message" required></textarea><br><br>
      <button class="button" type="submit">Submit</button>
    </form>
    <button class="button" on:click={closeSupportModal}>Close</button>
  </div>
{/if}
