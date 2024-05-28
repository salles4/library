<script>
  import { fade } from "svelte/transition";
  import { supabase } from "../supabase";

  import TitleLabel from "./components/TitleLabel.svelte";
  import BookItem from "./item/BookItem.svelte";
  import AuthorItem from "./item/AuthorItem.svelte";
  import PublisherItem from "./item/PublisherItem.svelte";
  import Loading from "./components/Loading.svelte";
  import { onMount } from "svelte";
  import { location } from "svelte-spa-router";

  let loading = true;
  function checkParam() {
    switch ($location) {
      case "/search/author":
        select.value = "author";
        break;
      case "/search/publisher":
        select.value = "publisher";
        break;
      default:
        select.value = "books";
    }
  }

  const sqlSelect = {
    books: "id, title, author(name)",
    author: "id, name",
    publisher: "id, name",
  };
  const sqlFilter = {
    books: "title",
    author: "name",
    publisher: "name",
  };
  let searchType = "books";
  let searchValue = "";
  let searchResults = {
    books: [],
    author: [],
    publisher: [],
  };
  let select;

  async function search() {
    loading = true;
    searchType = select.value;

    console.log(searchType);
    const { data, error } = await supabase
      .from(searchType)
      .select(sqlSelect[searchType])
      .ilike(sqlFilter[searchType], `%${searchValue}%`);

    error && console.log(error);
    searchResults.books = [];
    searchResults.author = [];
    searchResults.publisher = [];
    searchResults[searchType] = data;
    searchResults = searchResults;
    loading = false
    console.log(loading, searchResults);
  }
  onMount(checkParam);
  onMount(search);
</script>

<main class="container" in:fade={{ duration: 500 }}>
  <TitleLabel text="Library Holdings" />
  <div
    class="row justify-content-center align-items-center my-4 mx-auto col-12"
  >
    <div class="col-auto col-md-2 p-0 pe-md-4">
      <select
        name="searchtype"
        class="form-select"
        bind:this={select}
        on:change={search}
      >
        <option selected value="books">Books</option>
        <option value="author">Author</option>
        <option value="publisher">Publisher</option>
      </select>
    </div>
    <div class="col-6 col-md-6 p-0">
      <input
        bind:value={searchValue}
        on:keyup={(e) => e.key === "Enter" && search()}
        class="form-control form-control-lg"
        type="search"
        placeholder="Search"
        name="Search"
      />
    </div>
    <button
      on:click={search}
      class="btn btn-lg btn-success col-auto col-md-1"
      type="submit"
    >
      <i class="bi bi-search"></i>
    </button>
  </div>
  <div class="row">
    {#if searchResults.books.length > 0}
      {#each Object.entries(searchResults.books) as [i, data]}
        <BookItem title={data.title} id={data.id} author={data.author.name} />
      {/each}
    {:else if searchResults.author.length > 0}
      {#each Object.entries(searchResults.author) as [i, data]}
        <AuthorItem id={data.id} name={data.name} />
      {/each}
    {:else if searchResults.publisher.length > 0}
      {#each Object.entries(searchResults.publisher) as [i, data]}
        <PublisherItem id={data.id} name={data.name} />
      {/each}
    {:else}
    {#if !loading}
    <div class="d-flex justify-content-center">
      <div class="text-center">
        <h1><i class="bi bi-patch-question"></i></h1>
        <h4>No Results</h4>
      </div>
    </div>
      {:else}
      <Loading />
      {/if}
    {/if}
  </div>
</main>
