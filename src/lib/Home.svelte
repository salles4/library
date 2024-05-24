<script>
  import Carousel from "./components/Carousel.svelte";
  import BookItem from "./item/BookItem.svelte";
  import SectionLabel from "./components/SectionLabel.svelte";

  import { supabase } from "../supabase";
  import { fade } from "svelte/transition";
  import Loading from "./components/Loading.svelte";
  import AuthorItem from "./item/AuthorItem.svelte";

  let books;
  let authors;
  async function getBooks() {
    // const { data:bookData, error:bookError } = await supabase.from("books").select("id, title, author(name)");
    const { data:bookData, error:bookError } = await supabase.rpc('get_books')
    books = bookData;
    console.log(books)
    const { data:authorData, error:authorError } = await supabase.from("author").select("id, name").neq('id', 0);
    authors = authorData;
  }
  getBooks();
</script>

<main class="container" in:fade={{ duration: 500 }}>
  <Carousel />
  <!--* Books Section -->
  <SectionLabel title="Books" icon="journal" link="#">
    {#if !books}
      <Loading />
    {:else}
      <div class="row">
        {#each Object.entries(books) as [i, book]}
          <BookItem title={book.title} id={book.id} author={book.author}/>
        {/each}
      </div>
    {/if}
  </SectionLabel>
  <!--* Authors Section  -->
  <SectionLabel title="Authors" icon="person" link="#">
    {#if !authors}
      <Loading />
    {:else}
      <div class="row">
        {#each Object.entries(authors) as [i, author]}
          <AuthorItem id={author.id} name={author.name} />
        {/each}
      </div>
    {/if}
  </SectionLabel>
  <!--* Publishers Section  -->
  <SectionLabel title="Publishers" icon="building" link="#">
    <Loading />
  </SectionLabel>
</main>
