<script>
    let newPassword = "";
    let confirmPassword = "";
  
    function changePassword() {
      if (newPassword === confirmPassword) {
        alert("Password changed successfully!");
      } else {
        alert("Passwords do not match.");
      }
    }
  </script>
  
  <style>
    .form {
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
  
    input {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
  
    button {
      padding: 10px 20px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  
    button:hover {
      background: #0056b3;
    }
  </style>
  
  <div class="form">
    <h2>Change Password</h2>
    <input
      type="password"
      placeholder="New Password"
      bind:value={newPassword}
    />
    <input
      type="password"
      placeholder="Confirm Password"
      bind:value={confirmPassword}
    />
    <button on:click={changePassword}>Submit</button>
  </div>
  