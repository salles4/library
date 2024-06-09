<script>
  import Carousel from "./components/Carousel.svelte";
  import BookItem from "./item/BookItem.svelte";
  import SectionLabel from "./components/SectionLabel.svelte";

  import { supabase } from "../supabase";
  import { fade } from "svelte/transition";
  import Loading from "./components/Loading.svelte";
  import AuthorItem from "./item/AuthorItem.svelte";
  import PublisherItem from "./item/PublisherItem.svelte";
  import Error from "./components/Error.svelte";
  import BookLabelItem from "./item/BookLabelItem.svelte";
  import moment from "moment";

  const stud_id = localStorage.getItem("user_id") || "";

  let books;
  let authors;
  let publishers;
  let inventory;

  let bookCatch;
  let authorCatch;
  let publisherCatch;
  let inventoryCatch
  async function getBooks() {
    const { data: bookData, error: bookError } =
      await supabase.rpc("get_books");
    books = bookData;
    bookCatch = bookError ? bookError.message : "";
  }
  async function getAuthors() {
    const { data: authorData, error: authorError } =
      await supabase.rpc("get_authors");
    authors = authorData;
    authorCatch = authorError ? authorError.message : "";
  }
  async function getPublishers() {
    const { data: publisherData, error: publisherError } =
      await supabase.rpc("get_publishers");
    publishers = publisherData;
    publisherCatch = publisherError ? publisherError : "";
  }
  async function getInventory(){
    const { data:inventoryData, error:inventoryError} = await supabase.rpc("get_inventory",{loggedid: stud_id})
    inventory = inventoryData;
    inventoryCatch = inventoryError ? inventoryError : "";
  }
  getBooks();
  getAuthors();
  getPublishers();
  getInventory();
</script>

<main class="container mb-5" in:fade={{ duration: 500 }}>
  <Carousel />

  <!--* Books Section -->
  <SectionLabel title="Account Inventory" icon="backpack2">
    {#if inventory}
      <div class="row justify-content-center justify-content-md-start">
        {#each Object.entries(inventory) as [i, data]} 
        <BookLabelItem
          id={data.id}
          title={data.title}
          label={data.status == "Borrowed" ? `Due: ${moment(data.due_date).format("MM-DD-YYYY")}` : "Reserved" }
          color={data.status == "Borrowed" ? "danger" : "secondary"}
        />
        {/each}
      </div>
    {:else if inventoryCatch}
      <Error message={inventoryCatch} />
    {:else}
      <Loading />
    {/if}
  </SectionLabel>

  <SectionLabel title="Books" icon="journal" link="search/">
    {#if books}
      <div class="row justify-content-around">
        {#each Object.entries(books) as [i, book]}
          <BookItem title={book.title} id={book.book_id} author={book.author} />
        {/each}
      </div>
    {:else if bookCatch}
      <Error message={bookCatch} />
    {:else}
      <Loading />
    {/if}
  </SectionLabel>

  <!--* Authors Section  -->

  <SectionLabel title="Authors" icon="person" link="search/author">
    {#if authors}
      <div class="row justify-content-around">
        {#each Object.entries(authors) as [i, author]}
          <AuthorItem id={author.author_id} name={author.name} />
        {/each}
      </div>
    {:else if authorCatch}
      <Error message={authorCatch} />
    {:else}
      <Loading />
    {/if}
  </SectionLabel>

  <!--* Publishers Section  -->

  <SectionLabel title="Publishers" icon="building" link="search/publisher">
    {#if publishers}
      <div class="row justify-content-around">
        {#each Object.entries(publishers) as [i, publisher]}
          <PublisherItem id={publisher.publisher_id} name={publisher.name} />
        {/each}
      </div>
    {:else if publisherCatch}
      <Error message={publisherCatch} />
    {:else}
      <Loading />
    {/if}
  </SectionLabel>
</main>
