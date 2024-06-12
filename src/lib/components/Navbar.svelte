<script>
  import { onMount } from "svelte";
  import { accType, user_id } from "../../store";
  import { supabase } from "../../supabase";

  let logged;
  let userID = localStorage.getItem("user_id");
  accType.subscribe((value) => (logged = value));

  getName();
  let lname = "";
  async function getName() {
    const { data, error } = await supabase
      .from("account_details")
      .select("lname")
      .eq("user_id", userID)
      .single();
    if (error) console.error(error);
    console.log(userID, data);
    lname = data.lname;
  }
  let classTheme = localStorage.getItem("theme") || "light";
  function toggle() {
    classTheme = classTheme == "light" ? "dark" : "light";
    localStorage.setItem("theme", classTheme);
  }
  $: document.querySelector("body").setAttribute("data-bs-theme", classTheme);
  $: themeIcon =
    classTheme == "dark" ? "brightness-high-fill" : "moon-stars-fill";
  $: themeText = classTheme == "dark" ? "Light Theme" : "Dark Theme";

  async function logOut() {
    if (logged == "client") {
      const { error: reportError } = await supabase.from("reports").insert({
        report_type: "Log Out",
        report_details: `${userID} logged out`,
        stud_id: userID,
      });
      if (reportError) console.error(reportError);
    } else {
      const { error: reportError } = await supabase.from("reports").insert({
        report_type: "Log Out",
        report_details: `${userID} logged out`,
        staff_id: userID,
      });
      if (reportError) console.error(reportError);
    }
    accType.set("");
    user_id.set("");
    localStorage.removeItem("accType");
    localStorage.removeItem("user_id");
  }
</script>

<!-- svelte-ignore a11y-invalid-attribute -->
<!-- Blue Bar -->
<nav class="navbar navbar-expand-lg bg-primary bg-gradient shadow d-print-none">
  <!-- Adds margin -->
  <div class="container px-4 fw-semibold">
    <!-- Left Content (Title) -->
    <a class="navbar-brand m-0 px-2" href="./#/">
      <i class="bi bi-book"></i>
      Zenodotus
      <small class="fs-6 text-white-50 ms-2 d-xl-inline d-none">
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
      <div class="navbar-nav ms-auto text-center align-items-center">
        <a class="nav-link" href="./#/"><i class="bi bi-house-door"></i> Home</a
        >
        <a class="nav-link" href="./#/search"
          ><i class="bi bi-journal"></i> Books</a
        >
        <a class="nav-link" href="./#/search/author"
          ><i class="bi bi-person"></i> Authors</a
        >
        <a class="nav-link" href="./#/search/publisher"
          ><i class="bi bi-building"></i> Publishers</a
        >
        {#if logged == "staff"}
        |
          <a class="nav-link" href="./#/borrow"
            ><i class="bi bi-journal-arrow-up"></i> Borrow</a
          >
          <a class="nav-link" href="./#/return"
            ><i class="bi bi-journal-arrow-down"></i> Return</a
          >
        {/if}
        | 
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="bi bi-person-fill"></i>
            {lname}
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="./#/profile"><i class="bi bi-person-fill"></i> Profile</a></li>
            <li><a class="dropdown-item" href="./#/" on:click|preventDefault={toggle}><span class="bi bi-{themeIcon}"></span>&nbsp; {themeText}</a></li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <a class="dropdown-item text-danger" href="./#/" on:click={logOut}
                ><i class="bi bi-door-open-fill"></i> Log Out</a
              >
            </li>
          </ul>
        </li>
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
  a {
    border-radius: 6px;
  }
  .nav-link:hover {
    background-color: black;
  }
</style>
