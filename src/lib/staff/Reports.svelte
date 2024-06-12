<script>
  import { fade } from "svelte/transition";
  import TitleLabel from "../components/TitleLabel.svelte";
  import { supabase } from "../../supabase";
  import { onMount } from "svelte";
  import moment from "moment";

  //All transactions will be recorded here
  let reportData;
  let reportTypes;
  let typeSelect = {value:"all"};
  let filterValue;
  let searchValue = "";

  async function getReports() {
    filterValue = typeSelect.value;
    const { data, error } = await supabase.rpc("getreports", {
      filter: filterValue,
      search: searchValue,
    });
    if (error) console.error(error);
    reportData = data;
  }
  async function getReportTypes() {
    const { data, error } = await supabase.rpc("getreporttypes");
    if (error) console.error(error);
    reportTypes = data;
  }
  onMount(getReports);
  onMount(getReportTypes);
</script>

<main class="container" in:fade={{ duration: 500 }}>
  <TitleLabel text="System Log" print={true} />
  <div class="d-none d-print-flex align-items-center gap-2 my-3">
    <b>Filter:</b>
    <span>{filterValue}</span>
    {#if searchValue}
      <b>Search Query:</b>
      <span>{searchValue}</span>
    {/if}
  </div>
  <div
    class="d-flex justify-content-end align-items-center gap-2 mb-3 d-print-none"
  >
    <div>Transaction:</div>
    <div>
      {#if reportTypes}
      <select
        name="filter"
        class="form-select"
        bind:this={typeSelect}
        on:change={() => getReports()}
      >
          <option value="all">All</option>
          {#each Object.entries(reportTypes) as [i, data]}
            <option>{data.report_type}</option>
          {/each}
          </select>
        {/if}
    </div>
    <form on:submit|preventDefault={() => getReports()} class="d-flex ms-3">
      <input
        type="text"
        placeholder="Search Details..."
        name="search"
        class="form-control"
        bind:value={searchValue}
      />
      <button type="submit" class="btn btn-outline-success"
        ><i class="bi bi-search"></i></button
      >
    </form>
  </div>
  <div>
    <table class="table table=striped table-bordered text-center">
      <thead>
        <tr>
          <th>Time</th>
          <th>Staff</th>
          <th>Student</th>
          <th>Transaction</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {#if reportData}
          {#each Object.entries(reportData) as [i, data]}
            <tr>
              <td>{moment(data.report_time).format("MM-DD-YYYY hh:mm a")}</td>
              <td>{data.staffname || "--"}</td>
              <td>{data.studentname || "--"}</td>
              <td>{data.report_type}</td>
              <td class="fs-6"><small>{data.report_details}</small></td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>
</main>
