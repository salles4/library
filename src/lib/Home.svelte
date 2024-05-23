<script>
  import Carousel from "./components/Carousel.svelte";
  import BookItem from "./components/BookItem.svelte";
  import SectionLabel from "./components/SectionLabel.svelte";

  import { supabase } from "../supabase";
  import { fade } from "svelte/transition";
  import Loading from "./components/Loading.svelte";

  let books;
  async function getBooks() {
    const { data, error } = await supabase.from("books").select("id, title, author(name)");
    books = data;
    console.log(books);
  }
  getBooks();
</script>

<main in:fade={{ duration: 500 }}>
  <Carousel />
  <!--* Books Section -->
  <section class="container">
    <SectionLabel title="Books" icon="journal" link="#" />
    {#if !books}
      <Loading />
    {:else}
      <div class="row" id="book-list">
        {#each Object.entries(books) as [i, book]}
          <BookItem title={book.title} id={book.id} author={book.author.name}/>
        {/each}
      </div>
    {/if}
  </section>
  <!--* Authors Section  -->
  <section class="container">
    <SectionLabel title="Authors" icon="person" link="#" />
    <Loading />
  </section>
  <!--* Publishers Section  -->
  <section class="container">
    <SectionLabel title="Publishers" icon="building" link="#" />
    <Loading />
  </section>
</main>
