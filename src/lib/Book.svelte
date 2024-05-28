<script>
  import TitleLabel from "./components/TitleLabel.svelte";
  import { supabase } from "../supabase";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { accType } from "../store";
  import Loading from "./components/Loading.svelte";
  import SectionLabel from "./components/SectionLabel.svelte";

  let logged;
  accType.subscribe(value => logged=value)

  export let params;
  let bookID = params.bookID;

  let book;
  async function getData() {
    const { data, error } = await supabase
      .from("books")
      .select("title, description, author(id, name), publisher(id, name), category(name)")
      .eq("id", bookID);
    console.log(data);
    book = data[0];
  }
  onMount(getData);

  let dataObj = {
    0:{barcode:"13251235173", status:"Available"},
    1:{barcode:"128736197689", status:"Reserved"},
    2:{barcode:"351313525135", status:"Borrowed"}
  }
  function getColor(status){
    return status == "Available" ? "table-success" : "table-secondary";
  }
</script>

<main class="container" in:fade={{ duration: 500 }}>
<section>
  <!-- * Label  -->
  <TitleLabel text="Book Details" />
  <!-- * Book Details Block -->
  {#if book}
    <div class="d-md-flex d-block">
      <div id="book-cover" class="d-flex justify-content-center my-1">
        <img
          id="img-cover"
          class="border p-3"
          src="./{bookID}.jpg"
          alt="book cover"
          height="300"
          width="300"
          style="object-fit: contain"
        />
      </div>

      <div id="details-container" class="container">
        <h1 id="book-title" class="mb-2 pb-2">
          {book.title}
        </h1>
        <p id="book-description">
          {book.description}
        </p>
        <p>
          <b>Author:</b>
          <a href="./#/author/{book.author.id}">
            {book.author.name}
          </a>
        </p>
        <p>
          <b>Publisher:</b>
          <a href="./#/publisher/{book.publisher.id}">
            {book.publisher.name}
          </a>
        </p>
        <p><b>Category:</b> 
          <a href="/">
            {book.category.name}
          </a>
        </p>
        
      </div>
    </div>
  {:else}
    <Loading />
  {/if}
</section>

{#if logged == "staff"}
<SectionLabel title="Status" icon="journal">
  <table class="table table-bordered table-striped text-center align-middle">
    <thead >
      <tr>
        <th class="py-3 col-3">Barcode</th>
        <th class="py-3 col-5">Student</th>
        <th class="py-3 col-2">Status</th>
        <!-- <th class="py-3">Actions</th> -->
      </tr>
    </thead>
    <tbody>
      {#each Object.entries(dataObj) as [i, data]}
        <tr>
          <td>{data.barcode}</td>
          <td>{data.status != "Available" ? "Francis James E. Salles" : "--"}</td>
            <td class={
              data.status == "Available" ? "text-bg-success" :
              data.status == "Reserved" ? "text-bg-secondary" : "text-bg-danger"
            }>{data.status}</td>
            <!-- <td>
              <button class="btn btn-outline-primary btn-sm fs-5" title="Borrow"><i class="bi bi-journal-arrow-up"></i></button>
              <button class="btn btn-outline-primary btn-sm fs-5" title="Return"><i class="bi bi-journal-arrow-down"></i></button>
              <button class="btn btn-outline-primary btn-sm fs-5" title="Hide"><i class="bi bi-eye"></i></button>
            </td> -->
        </tr>
      {/each}
    </tbody>
  </table>
  <div class="row justify-content-center align-items-center">
    <label for="copy" class="form=control col-auto">Add Copy:</label>
    <div class="col-7">
      <input type="text" class="form-control" placeholder="Barcode Number">
    </div>
    <button class="btn btn-primary col-auto">Add</button>
  </div>
</SectionLabel>
{/if}
<div class="my-5"></div>
</main>