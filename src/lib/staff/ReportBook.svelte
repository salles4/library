<script>
  import { fade } from "svelte/transition";
  import TitleLabel from "../components/TitleLabel.svelte";
  import { supabase } from "../../supabase";
  import { onMount } from "svelte";

  let bookReport;
  let sortSelect;
  let sortValue = "total";
  let searchValue = "";
  let directionSelect;
  let directionValue = "asc";

  let bookSummary;

  async function getReport() {
    sortValue = sortSelect.value;
    directionValue = directionSelect.value;

    const { data, error } = await supabase.rpc("getbooksreport", {
      sortby: sortValue,
      search: searchValue,
    });
    if (error) {
      console.error(error);
      return;
      }
    if (directionValue == "asc") {
      data.sort((a, b) => {
        return a[sortValue.toLowerCase()] - b[sortValue.toLowerCase()];
      });
    }
    if (sortValue == "Title" && directionValue == "asc"){
      data.sort(function(a, b) {
          let textA = a.title.toUpperCase();
          let textB = b.title.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
    }
    if (sortValue == "Title" && directionValue == "desc"){
      data.sort(function(a, b) {
          let textA = a.title.toUpperCase();
          let textB = b.title.toUpperCase();
          return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
      });
    }
    bookReport = data;
  }
  onMount(getReport)
  onMount(getBookSummary)

  async function getBookSummary(){
    const {data:pReport, error:pError} = await supabase.rpc("booksummary").single()
    if (pError) console.error(pError);
    bookSummary = pReport
  }
  
</script>

<main class="container" in:fade={{ duration: 500 }}>
  <TitleLabel text="Books Report" print={true} />
  <div class="d-flex justify-content-center gap-5 my-3">
    {#if bookSummary}
    <div>
      <div># of Books</div>
      <h1>{bookSummary.bookscount}</h1>
    </div>
    <div>
      <div># of Library Holdings</div>
      <h1>{bookSummary.holdingscount}</h1>
    </div>
    <div>
      <div>Lowest Book Copies</div>
      <h1>{bookSummary.lowest}</h1>
    </div>
    <div>
      <div>Highest Borrowing Activity</div>
      <h1>{bookSummary.highest}</h1>
    </div>
    {/if}
  </div>
  <div class="d-none d-print-flex align-items-center gap-2 my-3">
    <b>Sorted by:</b>
    <span>{sortValue} <i>{directionValue.toUpperCase()}</i></span>
    {#if searchValue}
      <b>Search Query:</b>
      <span>{searchValue}</span>
    {/if}
  </div>
  <div
    class="d-flex justify-content-end align-items-center gap-2 mb-3 d-print-none"
  >
    <div>Sort by:</div>
    <div>
      <select name="filter" class="form-select" bind:this={sortSelect} on:change={getReport}>
        <option value="Title">Title</option>
        <option value="Total">Total</option>
        <option value="Available">Available</option>
        <option value="Reserved">Reserved</option>
        <option value="Borrowed">Borrowed</option>
      </select>
    </div>
    <div>
      <select name="order" class="form-select" bind:this={directionSelect} on:change={getReport}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
    <form on:submit|preventDefault={() => {}} class="d-flex ms-3">
      <input
        type="text"
        placeholder="Search title..."
        name="search"
        class="form-control"
        bind:value={searchValue}
      />
      <button type="submit" class="btn btn-outline-success" on:click={getReport}
        ><i class="bi bi-search"></i></button
      >
    </form>
  </div>
  <div class="">
    <table
      class="table table-bordered table-striped table-hover text-center align-middle"
    >
      <thead>
        <tr class="sticky-top">
          <th class="py-3 col-2  d-md-table-cell">ISBN</th>
          <th class="py-3 col-5">Book Title</th>
          <th class="py-3 col-1 text-bg-success">Available</th>
          <th class="py-3 col-1 text-bg-secondary">Reserved</th>
          <th class="py-3 col-1 text-bg-danger">Borrowed</th>
          <th class="py-3 col-1 text-bg-primary">Total</th>
        </tr>
      </thead>
      <tbody>
        {#if bookReport}
          {#each Object.entries(bookReport) as [i, report]}
            <tr>
              <td class=" d-md-table-cell ">{report.isbn}</td>
              <td>{report.title}</td>
              <td>{report.available}</td>
              <td>{report.reserved}</td>
              <td>{report.borrowed}</td>
              <td class="fw-bold">{report.total}</td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>
</main>

<style>
  @media print {
    th {
      color: black !important;
      background-color: transparent !important;
    }
    td {
      padding: 0 1em;
    }
  }
</style>
