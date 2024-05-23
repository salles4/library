<script>
  import { supabase } from "../supabase";
  import { pop } from "svelte-spa-router";
  import { onMount } from "svelte";
  import TitleLabel from "./components/TitleLabel.svelte";
  import { fade } from "svelte/transition";
  export let params;
  let authorID = params.authorID;

  let author;
  async function getData() {
    const { data, error } = await supabase
      .from("author")
      .select()
      .eq("id", authorID);
    console.log(data);
    author = data[0];
  }
  onMount(getData);

  let img = "./default-profile.jpg";
</script>

<section class="container" in:fade="{{duration: 500}}">
  <!--* Section Label -->
  <TitleLabel text="Author Details" />
  <!--* Section Content -->
  <div class="d-md-flex d-block">
    <!--* Image -->
    <div id="author-cover" class="d-flex justify-content-center my-1">
      <img
        id="img-cover"
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
      <div id="details-container" class="container">
        <h1 id="author-name" class="mb-2 pb-2">{author.name}</h1>
        <p id="author-bio" class="">
          Lorem ipsum dolor sit amet pariatur est libero! Facilis ipsum est
          voluptas animi aliquam dolorem sunt, iure consequuntur dignissimos
          doloremque! Neque velit quas, illum, facere aliquam sed exercitationem
          at voluptatem incidunt beatae voluptate deserunt.
        </p>
        <p>
          <b>Website:</b>
          <a href="https://github.com/salles4/" id="author-website"
            >salles4.github.io</a
          >
        </p>
      </div>
    {/if}
  </div>
</section>
<!-- ! Author Books -->
<section class="container">
  <!--* Section Label -->
  <div
    id="book-title"
    class="border-bottom border-2 d-flex justify-content-between"
  >
    <h4 class="my-3"><i class="bi bi-journal"></i> Books</h4>
  </div>
  <!--* Section Loading -->
  <div class="d-flex justify-content-center" id="book-loading">
    <div class="spinner-grow text-primary m-5" role="status"></div>
  </div>
  <!--* Section Content -->
  <div class="row" id="book-list"></div>
</section>
