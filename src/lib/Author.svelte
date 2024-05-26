<script>
  import { supabase } from "../supabase";
  import { onMount } from "svelte";
  import TitleLabel from "./components/TitleLabel.svelte";
  import { fade } from "svelte/transition";
  import SectionLabel from "./components/SectionLabel.svelte";
  import Loading from "./components/Loading.svelte";
  import BookItem from "./item/BookItem.svelte";
  export let params;
  let authorID = params.authorID;

  let author;
  let authorBooks;
  async function getData() {
    const { data, error } = await supabase
      .from("author")
      .select()
      .eq("id", authorID);
    console.log(data);
    author = data[0];

    const { data: bookData, error: bookError } = await supabase
      .from("books")
      .select("id, title, author(name)")
      .eq("publisher_id", authorID);
    console.log(bookData);
    authorBooks = bookData;

  }
  onMount(getData);

  let img = "./default-profile.jpg";
</script>

<main class="container" in:fade={{ duration: 500 }}>
  <section>
    <!--* Section Label -->
    <TitleLabel text="Author Details" />
    <!--* Section Content -->
    <div class="d-md-flex d-block">
      <!--* Image -->
      <div class="d-flex justify-content-center my-1">
        <img
          class="border p-3"
          src={img}
          alt="author"
          height="300"
          width="300"
          style="object-fit: contain"
        />
      </div>
      <!--* Details -->
      {#if author}
        <div class="container">
          <h1 class="mb-2 pb-2">{author.name}</h1>
          <p class="">
            Lorem ipsum dolor sit amet pariatur est libero! Facilis ipsum est
            voluptas animi aliquam dolorem sunt, iure consequuntur dignissimos
            doloremque! Neque velit quas, illum, facere aliquam sed
            exercitationem at voluptatem incidunt beatae voluptate deserunt.
          </p>
          <p>
            <b>Website:</b>
            <a href="https://github.com/salles4/">salles4.github.io</a>
          </p>
        </div>
      {:else}
        <Loading />
      {/if}
    </div>
  </section>
  <!-- ! Author Books -->
  <SectionLabel title="Books" icon="journal">
    {#if authorBooks}
      <div class="row">
        {#each Object.entries(authorBooks) as [i, book]}
          <BookItem title={book.title} id={book.id} author={book.author.name} />
        {/each}
      </div>
    {:else}
    <Loading />
    {/if}
  </SectionLabel>
</main>
