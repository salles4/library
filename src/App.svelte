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
  import Login from './lib/Login.svelte';
  import Borrow from './lib/staff/Borrow.svelte';


  let logged;

  accType.subscribe((value) => {
    logged = value;
  })
  
</script>


  {#if logged == "client"}
  <Navbar />
  <Router routes={{
    '/': Home,
    '/book/:bookID': Book,
    '/author/:authorID': Author,
    '/publisher/:publisherID': Publisher,
    '/search': Search,
    '/search/author': Search,
    '/search/publisher': Search
  }} />
  {:else if logged == "staff"}
  <Navbar />
  <Router routes={{
    '/': StaffHome,
    '/book/:bookID': Book,
    '/author/:authorID': Author,
    '/publisher/:publisherID': Publisher,
    '/search': Search,
    '/search/author': Search,
    '/search/publisher': Search,
    '/add-book': AddBook,
    '/borrow': Borrow
  }} />
  {:else}
    <Router routes={{
      '*': Login
    }} />
  {/if}

