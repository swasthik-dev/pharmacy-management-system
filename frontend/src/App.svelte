<script>
  import { Route, Router, Link} from 'svelte-routing'
  import Sidebar from './components/sidebar.svelte';
  import MedicinePage from './pages/medicines.svelte'

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
    </Router>
  </main>
</div>

