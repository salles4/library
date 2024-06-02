<script>
  import { accType } from "../../store";
  
  let logged;
  accType.subscribe((value) => logged = value)
  
  let classTheme = localStorage.getItem("theme") || "light"
  function toggle(){
    classTheme = classTheme == "light" ? "dark" : "light";
    localStorage.setItem("theme", classTheme)
  }
  $: document.querySelector('body').setAttribute("data-bs-theme", classTheme)
  $: themeIcon = classTheme == "dark" ? "moon-stars-fill" : "brightness-high-fill";

  function logOut(){
    accType.set("")
    localStorage.removeItem("accType")
  }
</script>
<!-- svelte-ignore a11y-invalid-attribute -->
<!-- Blue Bar -->
<nav class="navbar navbar-expand-lg bg-primary bg-gradient shadow">
  <!-- Adds margin -->
  <div class="container px-4 fw-semibold">
    <!-- Left Content (Title) -->
    <a class="navbar-brand m-0" href="./#/">
      <i class="bi bi-book"></i> 
      Library System
      <small class="fs-6 text-white-50 ms-2 d-sm-inline d-none"> 
        CTADVDBL Project
      </small>
    </a>
    <!-- Small devices button -->
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarContent"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <!-- If small device hide nav links (right side content) -->
    <div class="collapse navbar-collapse" id="navbarContent">
      <!-- Align links to right  -->
      <div class="navbar-nav ms-auto text-center">
        <a class="nav-link" href="./#/search">Books</a>
        <a class="nav-link" href="./#/search/author">Authors</a>
        <a class="nav-link" href="./#/search/publisher">Publishers</a>
        {#if logged == "staff"}
        <a class="nav-link" href="./#/add-book">Add book</a>
        {/if}
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="bi bi-person-fill"></i> {localStorage.getItem("user_id")}
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item disabled" href="#">Profile</a></li>
            <li><a class="dropdown-item disabled" href="#">Settings</a></li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <a class="dropdown-item text-danger" href="./#/" on:click={logOut}>Log Out</a>
            </li>
          </ul>
        </li>
        <button title="Switch theme" class="px-1 border-0 bg-transparent nav-link" on:click={toggle}>
          <span class="bi bi-{themeIcon}"></span>
        </button>
      </div>
    </div>
  </div>
</nav>

<style>
  .nav-link,
  .navbar-brand {
    color: white !important;
  }
  .navbar-nav .disabled {
    color: rgb(202, 202, 202) !important;
  }
</style>
