<script>
  import { fade } from "svelte/transition";
  import TitleLabel from "../components/TitleLabel.svelte";
  import { supabase } from "../../supabase";

  async function getReport() {
    const { data, error } = await supabase.rpc("getbooksreport");
    console.table(data);
    return data;
  }
  getReport();
</script>

<main class="container" in:fade={{ duration: 500 }}>
  <TitleLabel text="Books Report" />
  <div>mga label</div>
  <div class="table-responsive">
    <table class="table table-bordered table-striped table-hover text-center align-middle">
      <thead>
        <tr class="sticky-top">
          <th class="py-3 col-2 d-none d-sm-table-cell">ISBN</th>
          <th class="py-3 col-5">Book Title</th>
          <th class="py-3 col-1 text-bg-success">Available</th>
          <th class="py-3 col-1 text-bg-secondary">Reserved</th>
          <th class="py-3 col-1 text-bg-danger">Borrowed</th>
          <th class="py-3 col-1 text-bg-primary">Total</th>
        </tr>
      </thead>
      <tbody>
        {#await getReport() then data}
          {#each Object.entries(data) as [i, report]}
            <tr>
              <td class="d-none d-sm-table-cell">{report.isbn}</td>
              <td>{report.title}</td>
              <td>{report.available}</td>
              <td>{report.reserved}</td>
              <td>{report.borrowed}</td>
              <td class="fw-bold">{report.total}</td>
            </tr>
          {/each}
        {/await}
      </tbody>
    </table>
  </div>
</main>
