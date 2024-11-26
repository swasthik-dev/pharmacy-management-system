<script>
    // State to track if the support modal is visible
    let showSupportModal = false;
  
    // Function to open the modal
    function openSupportModal() {
      showSupportModal = true;
    }
  
    // Function to close the modal
    function closeSupportModal() {
      showSupportModal = false;
    }
  
    // Function to handle form submission
    function submitSupportRequest(event) {
      alert("Support request submitted!");
      closeSupportModal(); // Close the modal after submission
    }
  </script>
  
  <style>
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
  
    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 5px;
      width: 300px;
      text-align: center;
    }
  
    .modal-content input,
    .modal-content textarea {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  
    .modal-content button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 10px;
    }
  
    .modal-content button:hover {
      background-color: #0056b3;
    }
  </style>
  
  <!-- Main content -->
  <div class="container">
    <div class="header">
      <h1>Customer Dashboard</h1>
    </div>
  
    <!-- Contact Support Button -->
    <button class="button" on:click={openSupportModal}>Contact Support</button>
  
    <!-- Support Modal -->
    {#if showSupportModal}
      <div 
        class="modal-backdrop" 
        role="button" 
        tabindex="0" 
        on:click={closeSupportModal} 
        on:keydown={(e) => e.key === 'Enter' && closeSupportModal()}
        aria-label="Close modal"
      >
        <div class="modal-content" role="dialog" aria-labelledby="support-modal-title">
          <h2 id="support-modal-title">Contact Support</h2>
          <form on:submit|preventDefault={submitSupportRequest}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Describe your issue..." required></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    {/if}
  </div>
  