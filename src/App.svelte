<script>
  import Router from 'svelte-spa-router';
  
  import Navbar from "./lib/Navbar.svelte";
  import Home from "./lib/Home.svelte";
  import Book from "./lib/Book.svelte";

</script>

<main>
  <Navbar />
  <Router routes={{
    '/': Home,
    '/book/:bookID': Book
  }} />
</main>

<style>

</style>
