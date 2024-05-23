<script>
  import TitleLabel from "./components/TitleLabel.svelte";
  import { supabase } from "../supabase";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  export let params;
  let bookID = params.bookID;
  
  let book;
  async function getData(){
    const {data, error} = await supabase
    .from("books")
    .select("title, description, author(id, name), publisher(id, name)")
    .eq("id", bookID)
    console.log(data);
    book = data[0]
  }
  onMount(getData)
</script>

<section class="container" in:fade="{{duration: 500}}">
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
      <h1 id="book-title" class="mb-2 pb-2">{book.title}</h1>
      <p id="book-description" class="">{book.description}</p>
      <p><b>Author:</b> <a href="./#/author/{book.author.id}">{book.author.name}</a></p>
      <p><b>Publisher:</b> <a href="./#/publisher/{book.publisher.id}">{book.publisher.name}</a></p>
      <p><b>Category:</b> <a href="/">{book.category}</a></p>
      <button class="btn btn-primary">Borrow</button>
      <button class="btn btn-primary">Reserve</button>
    </div>
  </div>
  {/if}
</section>
