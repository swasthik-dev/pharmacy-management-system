<script>
    let customer = {
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
    };
  
    function exportOrders() {
      alert("Orders exported successfully!");
    }
  
    function updatePersonalInfo() {
      alert("Redirecting to personal info update page...");
    }
  
    function changePassword() {
      alert("Redirecting to change password page...");
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
  
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
  
    .header {
      grid-column: span 2;
      text-align: center;
      margin-bottom: 30px;
    }
  
    h1 {
      margin: 0;
      font-size: 28px;
      color: #333;
    }
  
    section {
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background: #fdfdfd;
    }
  
    section h2 {
      font-size: 20px;
      margin-bottom: 15px;
      color: #444;
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
      background: #007bff;
      border: none;
      border-radius: 5px;
      font-size: 14px;
      cursor: pointer;
      text-align: center;
      text-decoration: none;
      transition: background 0.3s ease;
    }
  
    .button:hover {
      background: #0056b3;
    }
  
    .support {
      grid-column: span 2;
      text-align: center;
      margin-top: 20px;
    }
  
    @media (max-width: 768px) {
      .grid {
        grid-template-columns: 1fr;
      }
  
      section {
        margin-bottom: 20px;
      }
    }
  </style>
  
  <div class="container">
    <div class="grid">
      <!-- Header -->
      <div class="header">
        <h1>Customer Dashboard</h1>
      </div>
  
      <!-- Customer Information -->
      <section>
        <h2>Customer Information</h2>
        <p><strong>Customer ID:</strong> {customer.id}</p>
        <p><strong>First Name:</strong> {customer.firstName}</p>
        <p><strong>Last Name:</strong> {customer.lastName}</p>
        <p><strong>Contact Number:</strong> {customer.contact}</p>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>Address:</strong> {customer.address}</p>
      </section>
  
      <!-- Order History -->
      <section>
        <h2>Order History</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody>
            {#each customer.orders as order}
              <tr>
                <td>{order.orderId}</td>
                <td>{order.date}</td>
              </tr>
            {/each}
          </tbody>
        </table>
        <button class="button" on:click={exportOrders}>Export Orders</button>
      </section>
  
      <!-- Account Settings -->
      <section>
        <h2>Account Settings</h2>
        <button class="button" on:click={updatePersonalInfo}>Update Personal Info</button>
        <button class="button" on:click={changePassword}>Change Password</button>
      </section>
  
      <!-- Customer Support -->
      <section class="support">
        <h2>Need Assistance?</h2>
        <p>If you need help, feel free to <a href="mailto:support@example.com" class="button">Contact Support</a></p>
      </section>
    </div>
  </div>
  