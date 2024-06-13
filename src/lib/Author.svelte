<script>
  import { supabase } from "../supabase";
  import { onMount } from "svelte";
  import TitleLabel from "./components/TitleLabel.svelte";
  import { fade } from "svelte/transition";
  import SectionLabel from "./components/SectionLabel.svelte";
  import Loading from "./components/Loading.svelte";
  import BookItem from "./item/BookItem.svelte";

  let logged = localStorage.getItem("accType")

  export let params;
  let authorID = params.authorID;
  let placeholder = false;
  let author;
  let authorBooks;
  async function getData() {
    const { data, error } = await supabase
      .from("author")
      .select()
      .eq("author_id", authorID);
    console.log(data);
    author = data[0];

    const { data: bookData, error: bookError } = await supabase
      .from("books")
      .select("book_id, title, publisher(name)")
      .eq("author_id", authorID);
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
        {#if placeholder}
          <img
            id="img-cover"
            class="border p-3"
            src="./book-cover.png"
            alt="book cover"
            height="300"
            width="300"
            style="object-fit: contain"
          />
          {:else}
          <img
            id="img-cover"
            class="border p-3"
            src="https://oatzrwezibkcabfwxppo.supabase.co/storage/v1/object/public/author/{authorID}.jpg"
            on:error={()=>placeholder=true}
            alt="book cover"
            height="300"
            width="300"
            style="object-fit: contain"
          />
          {/if}
      </div>
      <!--* Details -->
      {#if author}
        <div class="container">
          <div class="d-flex justify-content-between align-items-center flex-column flex-sm-row">
          <h1 class="mb-2 pb-2">{author.name}</h1>
          {#if logged == "staff"}
              <div class="d-print-none">
                <a href="./#/update-author?id={authorID}"
                  ><button class="btn btn-outline-primary"
                    ><i class="bi bi-pencil-square"></i>
                    <div class="d-inline">
                      Edit Details
                    </div>
                     </button
                  ></a
                >
              </div>
            {/if}
          </div>
          <p class="">
            {#if author.bio == null}
            <span class="text-secondary">No Bio</span>
            {:else}
            {author.bio}
            {/if}
          </p>
          <p>
            <b>Website:</b>
            <a href="{author.link}">{author.link}</a>
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
          <BookItem title={book.title} id={book.book_id} author={book.publisher.name} />
        {/each}
      </div>
    {:else}
    <Loading />
    {/if}
  </SectionLabel>
</main>
