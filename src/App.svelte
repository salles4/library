<script>
  import Router from 'svelte-spa-router';
  
  import Navbar from "./lib/components/Navbar.svelte";
  import Home from "./lib/Home.svelte";
  import Book from "./lib/Book.svelte";
  import AddBook from './lib/AddBook.svelte';
  import Author from './lib/Author.svelte';
  import Publisher from './lib/Publisher.svelte';
  import StaffHome from './lib/staff/StaffHome.svelte';

  const client = true
  const staff = true
</script>


  {#if client}
  <Navbar />
  <Router routes={{
    '/': Home,
    '/book/:bookID': Book,
    '/author/:authorID': Author,
    '/publisher/:publisherID': Publisher
  }} />
  {:else if staff}
  <Navbar />
  <Router routes={{
    '/': StaffHome,
    '/add-book': AddBook
  }} />
  {:else}
  <h1>Not Logged in</h1>
  {/if}


<style>

</style>
