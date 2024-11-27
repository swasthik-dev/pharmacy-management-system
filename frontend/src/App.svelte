<script>
  import { Route, Router, Link } from 'svelte-routing';
  import Sidebar from './components/sidebar.svelte';
  import MedicinePage from './pages/medicines.svelte';
  import Supplier from './pages/supplier.svelte';
  import Orders from './pages/orders.svelte';
  import Customers from './pages/customers.svelte';
  import Addmedicine from './pages/addmedicine.svelte';
  import Updatemedicine from './pages/updatemedicine.svelte';
  import Deletemedicine from './pages/deletemedicine.svelte';
  import Password from './pages/password.svelte';
</script>

<div class="flex">
  <!-- Sidebar with Navigation Links -->
  <Sidebar />
  <main class="max-w-full overflow-x-scroll overflow-hidden p-4" style="scrollbar-width: none;">
    <Router>
      <!-- Main Route for the Medicine Page -->
      <Route path="/" component={MedicinePage} />

      <!-- Define other routes for your pages -->
      <Route path="/addmedicine" component={Addmedicine} />
      <Route path="/updatemedicine" component={Updatemedicine} />
      <Route path="/deletemedicine" component={Deletemedicine} />
      <Route path="/supplier" component={Supplier} />
      <Route path="/orders" component={Orders} />
      <Route path="/customer" component={Customers} />
      <Route path="/password" component={Password} />
    </Router>
  </main>
</div>
