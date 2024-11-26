<script>
    import { onMount } from 'svelte';
  
    // Sample user data (this would typically come from an API or database)
    let user = {
      firstName: "John",
      lastName: "Doe",
      contactNumber: "1234567890",
      email: "john.doe@example.com",
      address: "123 Main Street, Cityville"
    };
  
    // Handle form submission
    function updatePersonalInfo() {
      console.log("Updated Information:", user);
  
      // Here you would typically make an API call to save the updated data
      // Example:
      // fetch('/api/update-user', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(user)
      // }).then(response => {
      //   console.log("User updated successfully:", response);
      // });
  
      alert("Personal information updated successfully!");
    }
  
    onMount(() => {
      console.log("Personal Info page loaded");
    });
  </script>
  
  <style>
    .form-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background: #f9f9f9;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
  
    h1 {
      text-align: center;
      margin-bottom: 20px;
    }
  
    .form-group {
      margin-bottom: 15px;
    }
  
    label {
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
    }
  
    input, textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  
    button {
      display: block;
      width: 100%;
      padding: 10px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
    }
  
    button:hover {
      background: #0056b3;
    }
  </style>
  
  <div class="form-container">
    <h1>Update Personal Info</h1>
    <form on:submit|preventDefault={updatePersonalInfo}>
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input id="firstName" type="text" bind:value={user.firstName} />
      </div>
  
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input id="lastName" type="text" bind:value={user.lastName} />
      </div>
  
      <div class="form-group">
        <label for="contactNumber">Contact Number</label>
        <input id="contactNumber" type="text" bind:value={user.contactNumber} />
      </div>
  
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" type="email" bind:value={user.email} />
      </div>
  
      <div class="form-group">
        <label for="address">Address</label>
        <textarea id="address" bind:value={user.address}></textarea>
      </div>
  
      <button type="submit">Update Personal Info</button>
    </form>
  </div>
  