<script>
  import { Route, Router, Link} from 'svelte-routing'
  import Sidebar from './components/sidebar.svelte';
  import MedicinePage from './pages/medicines.svelte'
  import Supplier from './pages/supplier.svelte';
  import Modifymedicine from './pages/modifymedicine.svelte';
    import Inventory from './pages/inventory.svelte';

</script>

<div class="flex">
  <!-- Sidebar -->
  <Sidebar />

  <!-- Main Content Area -->
  <main>
    <Router>
      <Route path="/medicines" > <!-- let:params -->
        <MedicinePage />
      </Route>
      <Route path="/modifymedicine">
        <Modifymedicine />
      </Route>
      <Route path="/supplier">
        <Supplier />
      </Route>
      <Route path="/inventory" >
        <Inventory />
      </Route>
    </Router>
  </main>
</div>

