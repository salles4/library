<script>
  import { accType, user_id } from "./store";
  import Router from "svelte-spa-router";

  import Navbar from "./lib/components/Navbar.svelte";
  import Home from "./lib/Home.svelte";
  import Book from "./lib/Book.svelte";
  import AddBook from "./lib/staff/AddBook.svelte";
  import Author from "./lib/Author.svelte";
  import Publisher from "./lib/Publisher.svelte";
  import StaffHome from "./lib/staff/StaffHome.svelte";
  import Search from "./lib/Search.svelte";
  import Login from "./lib/Login.svelte";
  import Borrow from "./lib/staff/Borrow.svelte";
  import Return from "./lib/staff/Return.svelte";
  import InvalidLink from "./lib/InvalidLink.svelte";
  import AddAuthor from "./lib/staff/AddAuthor.svelte";
  import AddPublisher from "./lib/staff/AddPublisher.svelte";
  import ReportBook from "./lib/staff/ReportBook.svelte";
  import ReportPayment from "./lib/staff/ReportPayment.svelte";
  import ReportStudents from "./lib/staff/ReportStudents.svelte";
  import Reports from "./lib/staff/Reports.svelte";
  import UpdateBook from "./lib/staff/UpdateBook.svelte";

  let logged;

  accType.subscribe((value) => {
    logged = value;
  });

</script>

{#if logged == "client"}
  <Navbar />
  <Router
    routes={{
      "/": Home,
      "/book/:bookID": Book,
      "/author/:authorID": Author,
      "/publisher/:publisherID": Publisher,
      "/search": Search,
      "/search/author": Search,
      "/search/publisher": Search,
      "*": InvalidLink,
    }}
  />
{:else if logged == "staff"}
  <Navbar />
  <Router
    routes={{
      "/": StaffHome,
      "/book/:bookID": Book,
      "/author/:authorID": Author,
      "/publisher/:publisherID": Publisher,
      "/search": Search,
      "/search/author": Search,
      "/search/publisher": Search,
      "/add-book": AddBook,
      "/add-author": AddAuthor,
      "/add-publisher": AddPublisher,
      "/borrow": Borrow,
      "/return": Return,
      "/book-report": ReportBook,
      "/payment-report": ReportPayment,
      "/student-report": ReportStudents,
      "/reports": Reports,
      "/update-book": UpdateBook,
      "*": InvalidLink,
    }}
  />
{:else}
  <Router
    routes={{
      "*": Login,
    }}
  />
{/if}