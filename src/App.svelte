<script>
  import { accType } from './store'
  import Router from 'svelte-spa-router';
  
  import Navbar from "./lib/components/Navbar.svelte";
  import Home from "./lib/Home.svelte";
  import Book from "./lib/Book.svelte";
  import AddBook from './lib/staff/AddBook.svelte';
  import Author from './lib/Author.svelte';
  import Publisher from './lib/Publisher.svelte';
  import StaffHome from './lib/staff/StaffHome.svelte';
  import Search from './lib/Search.svelte';


  let logged;

  accType.subscribe((value) => {
    logged = value;
  })
  accType.set("client")
</script>


  {#if logged == "client"}
  <Navbar accType={logged} />
  <Router routes={{
    '/': Home,
    '/book/:bookID': Book,
    '/author/:authorID': Author,
    '/publisher/:publisherID': Publisher,
    '/search': Search
  }} />
  {:else if logged == "staff"}
  <Navbar accType={logged}/>
  <Router routes={{
    '/': StaffHome,
    '/add-book': AddBook,
    '/search': Search
  }} />
  {:else}
  <h1>Not Logged in</h1>
  {/if}


<style>

</style>
