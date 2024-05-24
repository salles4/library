<script>
  import { supabase } from "../supabase";
  import { onMount } from "svelte";
  import TitleLabel from "./components/TitleLabel.svelte";
  import { fade } from "svelte/transition";
  import Loading from "./components/Loading.svelte";
  import SectionLabel from "./components/SectionLabel.svelte";
  export let params;
  let publisherID = params.publisherID;

  let publisher;
  async function getData() {
    const { data, error } = await supabase
      .from("publisher")
      .select()
      .eq("id", publisherID);
    console.log(data);
    publisher = data[0];
  }
  onMount(getData);

  let img = "./default-profile.jpg";
</script>

<section class="container" in:fade="{{duration: 500}}">
  <!--* Section Label -->
  <TitleLabel text="Publisher Details" />
  <!--* Section Content -->
  <div class="d-md-flex d-block">
    <!--* Image -->
    <div id="publisher-cover" class="d-flex justify-content-center my-1">
      <img
        id="img-cover"
        class="border p-3"
        src={img}
        alt="publisher"
        height="300"
        width="300"
        style="object-fit: contain"
      />
    </div>
    <!--* Details -->
    {#if publisher}
      <div id="details-container" class="container">
        <h1 id="publisher-name" class="mb-2 pb-2">{publisher.name}</h1>
        <p id="publisher-bio" class="">
          Lorem ipsum dolor sit amet pariatur est libero! Facilis ipsum est
          voluptas animi aliquam dolorem sunt, iure consequuntur dignissimos
          doloremque! Neque velit quas, illum, facere aliquam sed exercitationem
          at voluptatem incidunt beatae voluptate deserunt.
        </p>
        <p>
          <b>Website:</b>
          <a href="https://github.com/salles4/" id="publisher-website"
            >salles4.github.io</a
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
  <!--* Section Loading -->
  <Loading />
  <!--* Section Content -->
  <div class="row" id="book-list"></div>
</section>
