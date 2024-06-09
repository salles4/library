<script>
  import { fade } from "svelte/transition";
  import TitleLabel from "../components/TitleLabel.svelte";
  import { supabase } from "../../supabase";

  async function getReport() {
    const { data, error } = await supabase.rpc("getbooksreport");
    if(error){
      console.error(error);
      return;
    }
    console.table(data);
    return data;
    
  }
</script>

<main class="container" in:fade={{ duration: 500 }}>
  <TitleLabel text="Books Report" />
  <div class="d-flex justify-content-end align-items-center gap-2 mb-3">
    <div>Filters:</div>
    <div> 
      <select name="filter" class="form-select">
        <option value="">Total</option>
        <option value="">Available</option>
        <option value="">Reserved</option>
        <option value="">Borrowed</option>
      </select>
    </div>
    <div>
      <select name="order" class="form-select">
        <option value="">Ascending</option>
        <option value="">Descending</option>
      </select>
    </div>
    <form on:submit|preventDefault={() => {}} class="d-flex ms-3">
      <input
        type="text"
        placeholder="Search title..."
        name="search"
        class="form-control"
      />
      <button type="submit" class="btn btn-outline-success"
        ><i class="bi bi-search"></i></button
      >
    </form>
  </div>
  <div class="table-responsive">
    <table
      class="table table-bordered table-striped table-hover text-center align-middle"
    >
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
