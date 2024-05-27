<script>
  import TitleLabel from "./components/TitleLabel.svelte";
  import { supabase } from "../supabase";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import Loading from "./components/Loading.svelte";
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
</main>