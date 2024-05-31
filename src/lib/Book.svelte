<script>
  import TitleLabel from "./components/TitleLabel.svelte";
  import { supabase } from "../supabase";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { accType } from "../store";
  import Loading from "./components/Loading.svelte";
  import SectionLabel from "./components/SectionLabel.svelte";
  import Modal from "./components/Modal.svelte";

  let logged;
  accType.subscribe((value) => (logged = value));

  export let params;
  let bookID = params.bookID;

  let book;
  async function getData() {
    const { data, error } = await supabase
      .from("books")
      .select(
        "*, author(author_id, name), publisher(publisher_id, name)",
      )
      .eq("book_id", bookID);
    console.log(data);
    book = data[0];
  }
  onMount(getData);

  async function getHoldings(){
    const {data, error} = await supabase
    .from("library_holdings")
    .select()
    .eq("book_id", bookID)

    return data;
  }
  let dataObj = {
    0: { barcode: "13251235173", status: "Available" },
    1: { barcode: "128736197689", status: "Reserved" },
    2: { barcode: "351313525135", status: "Borrowed" },
  };
</script>

<main class="container" in:fade={{ duration: 500 }}>
  <section>
    <!-- * Label  -->
    <TitleLabel text="Book Details" />
    <!-- * Book Details Block -->
    {#if book}
      <div class="d-md-flex d-block">
        <div
          class="d-flex flex-column justify-content-center align-items-center gap-2"
        >
          <img
            id="img-cover"
            class="border p-3"
            src="./{bookID}.jpg"
            alt="book cover"
            height="300"
            width="300"
            style="object-fit: contain"
          />
          <small class="text-secondary">ISBN: {book.isbn}</small>
          {#if logged == "client"}
            <button class="btn btn-primary w-50" data-bs-toggle="modal" data-bs-target="#reserve">Reserve</button>
            <Modal id="reserve">
              <div>Reserving Form</div>
            </Modal>
          {/if}
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
            <a href="./#/author/{book.author.author_id}">
              {book.author.name}
            </a>
          </p>
          <p>
            <b>Publisher:</b>
            <a href="./#/publisher/{book.publisher.publisher_id}">
              {book.publisher.name}
            </a>
          </p>
          <p>
            <b>Shelf Number: </b>
              {book.shelf_number}
          </p>
          <p>
            <b>Category:</b>
            <a href="/">
              <!-- {book.category.name} -->
            </a>
          </p>
        </div>
      </div>
    {:else}
      <Loading />
    {/if}
  </section>
  {#if logged == "client"}
    <SectionLabel title="To Do" icon="check2-square">
      <div class="my-5">a</div>
    </SectionLabel>
  {/if}
  {#if logged == "staff"}
    <SectionLabel title="Status" icon="journal">
      {#await getHoldings() then holdings}
      {#if holdings.length <= 0}
      <div class="text-center my-5">
        <h3>No Library Holdings.</h3>
        <small>Add a copy below</small>
      </div>
      {:else}
      <table
        class="table table-bordered table-striped text-center align-middle"
      >
        <thead>
          <tr>
            <th class="py-3 col-3">Barcode</th>
            <th class="py-3 col-5">Student</th>
            <th class="py-3 col-2">Status</th>
            <th class="py-3 col-1">Actions</th>
          </tr>
        </thead>
        
        
        <tbody>
          {#each Object.entries(holdings) as [i, data]}
            <tr>
              <td>{data.barcode}</td>
              <td
                >{data.status != "Available"
                  ? "Francis James E. Salles"
                  : "--"}</td
              >
              <td
                class={data.status == "Available"
                  ? "text-bg-success"
                  : data.status == "Reserved"
                    ? "text-bg-secondary"
                    : "text-bg-danger"}>{data.status}</td
              >
              <td><a href="./#/borrow?barcode={data.barcode}" class="btn btn-outline-primary btn-sm"><small>Borrow <i class="bi bi-box-arrow-up-right"></i></small></a></td>
            </tr>
          {/each}
        </tbody>
      </table>
        
        {/if}
      {/await}
      <div class="row justify-content-center align-items-center">
        <label for="copy" class="form=control col-auto">Add Copy:</label>
        <div class="col-4">
          <input
            type="text"
            class="form-control"
            placeholder="Barcode Number"
          />
        </div>
        <button class="btn btn-primary col-2">Add</button>
      </div>
    </SectionLabel>
  {/if}
  <div class="my-5"></div>
</main>
