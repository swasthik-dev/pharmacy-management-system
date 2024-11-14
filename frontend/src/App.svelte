<script>
  import { Route, Router, Link} from 'svelte-routing'
  import Sidebar from './components/sidebar.svelte';
  import MedicinePage from './pages/medicines.svelte'
  import Supplier from './pages/supplier.svelte';
  import Orders from './pages/orders.svelte';
  import Addmedicine from './pages/addmedicine.svelte';
  import Updatemedicine from './pages/updatemedicine.svelte';
  import Deletemedicine from './pages/deletemedicine.svelte';

</script>

<div class="flex">
  <!-- Sidebar -->
  <Sidebar />

  <!-- Main Content Area -->
  <main class="max-w-full overflow-x-scroll p-4 ">
    <Router>
      <Route path="/medicines" > <!-- let:params -->
        <MedicinePage />
      </Route>
      <Route path="/addmedicine">
        <Addmedicine />
      </Route>
      <Route path="/updatemedicine">
        <Updatemedicine />
      </Route>
      <Route path="/deletemedicine">
        <Deletemedicine />
      </Route>
      <Route path="/supplier">
        <Supplier />
      </Route>
      <Route path="/orders" >
        <Orders />
      </Route>
    </Router>
  </main>
</div>

