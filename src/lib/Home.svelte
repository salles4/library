<script>
  import Router from "svelte-spa-router";
  import Navbar from "./components/Navbar.svelte";
  import Carousel from "./components/Carousel.svelte";
  import BookItem from "./components/BookItem.svelte";

  import { supabase } from "../supabase";
  import { onMount } from "svelte";

  let books;
  async function getBooks(){
    const {data, error} = await supabase.from("books").select("id, title")
    books = data
    console.log(books);
  }
getBooks()
</script>
<main>
  <Carousel />
  <section class="container">
    <!--* Section Label -->
    <div
        id="book-title"
        class="border-bottom border-2 d-flex justify-content-between mb-2">
        <h2 class="my-3"><i class="bi bi-journal"></i> Books</h2>
        <div class="align-middle align-self-center">
            <button class="btn btn-primary btn-sm">See All -</button>
        </div>
    </div>
    {#if !books}
      <!--* Book Loading -->
      <div class="d-flex justify-content-center" id="book-loading">
        <div class="spinner-grow text-primary m-5" role="status"></div>
      </div>
    {:else}
    <!--* Book List -->
      <div class="row" id="book-list">
        {#each Object.entries(books) as [i, book]}
          <BookItem title={book.title} id={book.id}/>
        {/each}
      </div>
    {/if}
    
  </section>
</main>