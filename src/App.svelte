<script>
  import Router from 'svelte-spa-router';
  
  import Navbar from "./lib/components/Navbar.svelte";
  import Home from "./lib/Home.svelte";
  import Book from "./lib/Book.svelte";
  import AddBook from './lib/AddBook.svelte';
  import Author from './lib/Author.svelte';

</script>

<main>
  <Navbar />
  <Router routes={{
    '/': Home,
    '/book/:bookID': Book,
    '/add-book': AddBook,
    '/author/:authorID': Author
  }} />
</main>

<style>

</style>
