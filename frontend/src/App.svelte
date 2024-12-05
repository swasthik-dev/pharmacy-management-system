<script>
  import { Route, Router, Link } from "svelte-routing";
  import Sidebar from "./components/sidebar.svelte";
  import MedicinePage from "./pages/medicines.svelte";
  import Supplier from "./pages/supplier.svelte";
  import Orders from "./pages/orders.svelte";
  import Customers from "./pages/customers.svelte";
  import Addmedicine from "./pages/addmedicine.svelte";
  import Updatemedicine from "./pages/updatemedicine.svelte";
  import Deletemedicine from "./pages/deletemedicine.svelte";
  import Login from "./pages/login.svelte";
  import { authenticated } from "./store";



  let loading = true;
  // Simulating an async check (e.g., API call)
  setTimeout(() => {
    // Assuming after some API call, you set the authentication state
    authenticated.set(localStorage.getItem('authenticated') === 'true'); // Set to true when the user is authenticated
    loading = false;
  }, 1000);
</script>

<div class="flex">
  {#if loading}
  <div class="spinner-container">
    <div class="spinner"></div>
  </div>
  {:else}
  <Router>
  {#if $authenticated}
    <!-- Sidebar with Navigation Links -->
    <Sidebar />
    <main
      class="max-w-full overflow-x-scroll overflow-hidden p-4"
      style="scrollbar-width: none;"
    >
      
        <Route path="/medicine" component={MedicinePage} />
        <Route path="/addmedicine" component={Addmedicine} />
        <Route path="/updatemedicine" component={Updatemedicine} />
        <Route path="/deletemedicine" component={Deletemedicine} />
        <Route path="/supplier" component={Supplier} />
        <Route path="/orders" component={Orders} />
        <Route path="/customer" component={Customers} />
    </main>
  {:else}
    <!-- Login page when not authenticated -->
      <Route path="/" component={Login} />
  {/if}
</Router>
{/if}
</div>

<style>
  .spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.9); /* Optional: adds a subtle overlay */
    z-index: 1000; /* Ensures it's above all other content */
  }

  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #5e605e; /* Green */
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
