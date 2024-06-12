<script>
  import { fade } from "svelte/transition";
  import TitleLabel from "../components/TitleLabel.svelte";
  import { supabase } from "../../supabase";
  import moment from "moment";

  //Inventory of each student will be stored here
  let studentData;

  let filterSelect = { value: "" };
  let filterValue = "";
  let searchSelect;
  let searchValue
  
  async function getList() {
    const { data, error } = await supabase.rpc("getstudentreport");
    if (error) console.error(error);
    studentData = data;
    console.log(data);
  }
  getList();
</script>

<main class="container" in:fade={{ duration: 500 }}>
  <TitleLabel text="Student Inventory Report" print={true} />
  <div
    class="d-flex justify-content-end align-items-center gap-2 mb-3 d-print-none"
  >
    <div>Filters:</div>
    <div>
      <select
        name="filter"
        class="form-select"
        bind:this={filterSelect}
        on:change={() => {
          filterValue = filterSelect.value;
          console.log(filterValue);
        }}
      >
        <option value="fname">Student Name</option>
        <option value="title">Book Title</option>
        <option value="status">Status</option>
        <option value="">Due Date</option>
      </select>
    </div>
    <div>
      <select name="order" class="form-select">
        {#if filterValue == "status"}
        <option value="">Borrowed</option>
        <option value="">Reserved</option>
        {:else}
        <option value="">Ascending</option>
        <option value="">Descending</option>
        {/if}
      </select>
    </div>
    <form on:submit|preventDefault={() => {}} class="d-flex ms-3 align-items-center gap-2">
      <div>Search: </div>
      <select
        name="filter"
        class="form-select"
        bind:this={searchSelect}
        on:change={() => {
          
        }}
      >
        <option value="fname">Student Name</option>
        <option value="title">Book Title</option>
      </select>
      <input
        type="text"
        placeholder="Search..."
        name="search"
        class="form-control"
        bind:value={searchValue}
      />
      <button type="submit" class="btn btn-outline-success"
        ><i class="bi bi-search"></i></button
      >
    </form>
  </div>
  <table class="table table=striped table-bordered text-center">
    <thead>
      <tr class="align-middle">
        <th>Student ID</th>
        <th>Student Name</th>
        <th>Book</th>
        <th>Status</th>
        <th>Due Date</th>
        <th class="d-print-none">Actions</th>
      </tr>
    </thead>
    <tbody>
      {#if studentData}
        {#each studentData as row}
          <tr>
            <td>{row.bb_stud_id || row.br_stud_id}</td>
            <td>{row.fname} {row.lname}</td>
            <td><a href="./#/book/{row.book_id}">{row.title}</a></td>
            <td>{row.status}</td>
            <td
              >{moment(row.date_reserved || row.due_date).format(
                "MM-DD-YYYY"
              )}</td
            >
            <td class="d-print-none">
              <a href="mailto:{row.email}">
                <button class="btn btn-sm btn-outline-primary"><i class="bi bi-envelope-fill"></i></button
                ><!--Call-->
              </a>
              <a href="tel:{row.contact}">
                <button class="btn btn-sm btn-outline-success"><i class="bi bi-telephone-fill"></i></button
                ><!--Mail-->
              </a>
              {#if row.status == "Reserved"}
              <button class="btn btn-sm btn-outline-danger"><i class="bi bi-trash-fill"></i></button
                ><!--Remove-->
              {/if}
            </td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</main>
