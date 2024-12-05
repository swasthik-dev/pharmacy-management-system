<script>
  import { authenticated, login } from "../store";

  let email = '';
  let password = '';
  let errorMessage = '';

  async function handleLogin(event) {
    event.preventDefault();
    try {      
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if(response.ok){
        login();
        window.location.href = "/medicine";
      }else{
        errorMessage = 'Error occured while logging in: Invalid credentials';
      }
    } catch (error) {
      console.error(error);
    }
  }
</script>

<div class="flex items-center justify-center  min-h-screen bg-[#f0f0f0] w-screen">
  <form class="flex flex-col p-10 rounded-[10px] bg-[#dcdcdc] w-[400px] shadow-md" on:submit={handleLogin}>
    <h2 class="text-center text-3xl mb-5 text-[#333]">LogIn</h2>
    {#if errorMessage}
      <div class="text-red-600 text-center mb-4">{errorMessage}</div>
    {/if}
    <input class="mb-4 p-3 border border-gray-300 rounded-md" type="email" placeholder="Email" bind:value={email} required />
    <input class="mb-4 p-3 border border-gray-300 rounded-md" type="password" placeholder="Password" bind:value={password} required />
    <button class="p-3 bg-indigo-700 text-white rounded-md hover:bg-indigo-900" type="submit">Login</button>
  </form>
</div>

