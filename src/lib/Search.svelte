<script>
  import { fade } from "svelte/transition";
  import { supabase } from "../supabase";

  import TitleLabel from "./components/TitleLabel.svelte";
  import BookItem from "./item/BookItem.svelte";
  import AuthorItem from "./item/AuthorItem.svelte";
  import PublisherItem from "./item/PublisherItem.svelte";
  import Loading from "./components/Loading.svelte";
  import { onMount } from "svelte";

  const sqlSelect = {
    books: "id, title, author(name)",
    author: "id, name",
    publisher: "id, name",
  };
  const sqlFilter = {
    books: "title",
    author: "name",
    publisher: "name"
  }

  let searchType = 'books'
  let searchValue = ""
  let searchResults = {
    books:undefined,
    author:undefined,
    publisher:undefined
  };
  let select;


  async function search() {
    const newSearchType = select.value || "books"
    console.log(newSearchType);
    const { data, error } = await supabase
    .from(newSearchType)
    .select(sqlSelect[newSearchType])
    .ilike(sqlFilter[newSearchType], `%${searchValue}%`);


    error && console.log(error);
    searchType = select.value
    searchResults.books = undefined;
    searchResults.author = undefined
    searchResults.publisher = undefined
    searchResults[newSearchType] = data
    searchResults = searchResults
  }
  onMount(search)
</script>

<main class="container" in:fade={{ duration: 500 }}>
  <TitleLabel text="Library Holdings" />
  <div
    class="row justify-content-center align-items-center my-4 mx-auto col-12"
  >
    <div class="col-auto col-md-2 p-0 pe-md-4">
      <select name="searchtype" class="form-select" bind:this={select} on:change={search}>
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

      {#if searchResults.books}
        {#each Object.entries(searchResults.books) as [i, data]}
          <BookItem title={data.title} id={data.id} author={data.author.name} />
        {/each}
      {:else if searchResults.author}
        {#each Object.entries(searchResults.author) as [i, data]}
          <AuthorItem id={data.id} name={data.name} />
        {/each}
      {:else if searchResults.publisher}
        {#each Object.entries(searchResults.publisher) as [i, data]}
          <PublisherItem id={data.id} name={data.name} />
        {/each}
        {:else}
        <div class="d-flex justify-content-center">
          <div class="text-center">
            <h1><i class="bi bi-patch-question"></i></h1>
            <h4>No Results</h4>
          </div>
        </div>
      {/if}

  </div>
</main>
