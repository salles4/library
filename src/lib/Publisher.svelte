<script>
  import { supabase } from "../supabase";
  import { onMount } from "svelte";
  import TitleLabel from "./components/TitleLabel.svelte";
  import { fade } from "svelte/transition";
  import Loading from "./components/Loading.svelte";
  import SectionLabel from "./components/SectionLabel.svelte";
  import BookItem from "./item/BookItem.svelte";

  let logged = localStorage.getItem("accType")

  export let params;
  let publisherID = params.publisherID;

  let publisher;
  let publisherBooks;
  async function getData() {
    const { data, error } = await supabase
      .from("publisher")
      .select()
      .eq("publisher_id", publisherID);
    console.log(data);
    publisher = data[0];

    const { data: bookData, error: bookError } = await supabase
      .from("books")
      .select("book_id, title, author(name)")
      .eq("publisher_id", publisherID);
    console.log(bookData);
    publisherBooks = bookData;
  }
  onMount(getData);

  let img = "./default-profile.jpg";
  let placeholder = false
</script>

<section class="container" in:fade={{ duration: 500 }}>
  <!--* Section Label -->
  <TitleLabel text="Publisher Details" />
  <!--* Section Content -->
  <div class="d-md-flex d-block">
    <!--* Image -->
    <div id="publisher-cover" class="d-flex justify-content-center my-1">
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
            src="https://oatzrwezibkcabfwxppo.supabase.co/storage/v1/object/public/publisher/{publisherID}.jpg"
            on:error={()=>placeholder=true}
            alt="book cover"
            height="300"
            width="300"
            style="object-fit: contain"
          />
          {/if}
    </div>
    <!--* Details -->
    {#if publisher}
      <div class="container">
        <div class="d-flex justify-content-between align-items-center flex-column flex-sm-row">
        <h1 class="mb-2 pb-2">{publisher.name}</h1>
        {#if logged == "staff"}
              <div class="d-print-none">
                <a href="./#/update-publisher?id={publisherID}"
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
          {#if !publisher.description}
            <span class="text-secondary">No Description</span>
            {:else}
              {publisher.description}
            {/if}
        </p>
        <p>
          <b>Website:</b>
          <a href="{publisher.link}" id="publisher-website"
            >{publisher.link}</a
          >
        </p>
      </div>
    {/if}
  </div>
</section>
<!-- ! Publisher Books -->
<section class="container">
  <!--* Section Label -->
  <SectionLabel title="Books" icon="journal" />
  {#if publisherBooks}
  <div class="row">
    {#each Object.entries(publisherBooks) as [i, book]}
      <BookItem title={book.title} id={book.book_id} author={book.author.name} />
    {/each}
  </div>
  {:else}
  <Loading />
  {/if}
</section>
