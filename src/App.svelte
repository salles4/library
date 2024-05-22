<script>
  import Router from 'svelte-spa-router';
  
  import Navbar from "./lib/components/Navbar.svelte";
  import Home from "./lib/Home.svelte";
  import Book from "./lib/Book.svelte";
  import AddBook from './lib/AddBook.svelte';

</script>

<main>
  <Navbar />
  <Router routes={{
    '/': Home,
    '/book/:bookID': Book,
    '/add-book': AddBook
  }} />
</main>

<style>

</style>
