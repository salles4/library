<script>
  import { fade, fly, slide } from "svelte/transition";
  document.querySelector("body").setAttribute("data-bs-theme", "dark");
  import { accType } from "../store";
  import { supabase } from "../supabase";
  import { replace } from "svelte-spa-router";
  replace("/");
  /**
   * @param {string} id
   */
  function logClient(id) {
    accType.set("client");
    localStorage.setItem("accType", "client");
    localStorage.setItem("user_id", id);
  }
  /**
   * @param {string} id
   */
  function logStaff(id) {
    accType.set("staff");
    localStorage.setItem("accType", "staff");
    localStorage.setItem("user_id", id);
  }

  let log_in = true;
  let activeClass = "";
  $: activeClass = log_in ? "" : "active";

  function toggle() {
    log_in = !log_in;
  }

  let usernameInput;
  let passwordInput;
  async function logIn() {
    const { data, error } = await supabase
      .from("user_level")
      .select("account_type, user_id")
      .eq("username", usernameInput)
      .eq("password", passwordInput)
      .maybeSingle();

    if (error) {
      console.error(error);
      return;
    }
    if (!data && (await userExists(usernameInput))) {
      loginError = "Wrong password.";
      return;
    } else if (!data) {
      loginError = "User does not exist.";
      return;
    }
    if (data.account_type == "student") {
      logClient(data.user_id);
    } else if (data.account_type == "staff") {
      logStaff(data.user_id);
    } else {
      console.error(data);
    }
  }

  let moreinfo = false;
  $: moreinfoClass = moreinfo && !log_in ? "moreinfo" : "";

  /**
   * @param {string} usernameToCheck
   */
  async function userExists(usernameToCheck) {
    const { data, error } = await supabase
      .from("user_level")
      .select()
      .eq("username", usernameToCheck);

    if (error) console.error(error);
    return data.length > 0;
  }
  let loginError;
  let regError;
  let moreInfoError;
  //Register
  let regUserValue,
    regPassValue,
    confirmPassValue,
    studIDValue,
    fnameValue,
    lnameValue,
    contactValue,
    addressValue,
    emailValue;

  async function validateRegister() {
    if (await userExists(regUserValue)) {
      regError = "Username already exists.";
      return;
    } else if (regPassValue != confirmPassValue) {
      regError = "Password does not match.";
      return;
    }
    moreinfo = !moreinfo;
  }
  async function validateInfos() {
    const { data, error } = await supabase
      .from("user_level")
      .select()
      .eq("username", studIDValue);
    
    if (data.length == 0) {
      moreInfoError = "Student ID already exists"
      return
    }
    
  }
</script>

<main in:fade={{ duration: 500 }}>
  <!-- CONTAINER -->
  <div class="wrapper {activeClass} active-popup {moreinfoClass}">
    <!-- LOGIN PANEL -->
    <div class="form-box login">
      <h2>Login</h2>
      <form on:submit|preventDefault={logIn} id="form">
        <div class="input-box">
          <span class="icon"><i class="bi bi-person"></i></span>
          <input
            type="text"
            bind:value={usernameInput}
            id="usernameLogin"
            required
            autocomplete="off"
          />
          <label for="usernameLogin">Username</label>
        </div>
        <div class="input-box">
          <span class="icon"><i class="bi bi-eye"></i></span>
          <input
            minlength="6"
            maxlength="12"
            type="password"
            id="passwordLogin"
            required
            autocomplete="off"
            on:keyup={() => (loginError = "")}
            bind:value={passwordInput}
          />
          <label for="passwordLogin">Password</label>
        </div>
        {#if loginError}
          <div class="alert alert-danger p-1 text-center">
            {loginError}
          </div>
        {/if}
        <button type="submit" class="bton" id="loginBton">Login</button>
        <div class="login-register">
          <p>
            Don't have an account? <a
              href="./#/"
              on:click={toggle}
              class="register-link">Register</a
            >
          </p>
        </div>
      </form>
    </div>
    {#if !moreinfo}
      <!-- REGISTER PANEL -->
      <div class="form-box register" transition:fly={{ duration: 600, y: 500 }}>
        <h2>Registration</h2>

        {#if regError}
          <div class="alert alert-danger p-1 text-center">
            {regError}
          </div>
        {/if}
        <form on:submit|preventDefault={validateRegister}>
          <div class="input-box">
            <span class="icon"><i class="bi bi-person"></i></span>
            <input
              type="text"
              id="registerUsername"
              required
              autocomplete="off"
              on:keyup={() => (regError = "")}
              bind:value={regUserValue}
            />
            <label for="registerUsername">Username</label>
          </div>
          <div class="input-box">
            <span class="icon" id="showPass2"
              ><a href="./#/" on:click|preventDefault={() => {}}
                ><i class="bi bi-eye"></i></a
              ></span
            >
            <input
              type="password"
              id="registerPass"
              required
              autocomplete="off"
              minlength="6"
              on:keyup={() => (regError = "")}
              bind:value={regPassValue}
            />
            <label for="registerPass">Password</label>
          </div>
          <div class="input-box">
            <span class="icon" id="showPass3"
              ><a href="./#/" on:click|preventDefault={() => {}}
                ><i class="bi bi-eye"></i></a
              ></span
            >
            <input
              type="password"
              id="registerConfirm"
              required
              autocomplete="off"
              minlength="6"
              on:keyup={() => (regError = "")}
              bind:value={confirmPassValue}
            />
            <label for="registerConfirm">Confirm Password</label>
          </div>

          <button type="submit" class="bton" id="registerBtn">Next</button>
          <div class="login-register">
            <p>
              Already have an account? <a
                href="./#/"
                class="login-link"
                on:click={toggle}>Login</a
              >
            </p>
          </div>
        </form>
      </div>
      <!-- More Info PANEL -->
    {:else}
      <div
        class="form-box register d-flex flex-column justify-content-center text-center"
        style="height"
        transition:fly={{ duration: 600, y: 500 }}
      >
        <h2>Register</h2>
        <form
          on:submit|preventDefault={validateInfos}
          class="row justify-content-center"
        >
        {#if moreInfoError} 
        <div class="d-flex justify-content-center">
          <div class="alert alert-danger w-50 text-center p-1 m-0">
            {moreInfoError}
          </div>
        </div>
        {/if}
          <div class="col-12 col-sm-6">
            <div class="input-box">
              <span class="icon"><i class="bi bi-person-bounding-box"></i></span
              >
              <input
                type="text"
                id="sID"
                name="hidden"
                required
                minlength="6"
                maxlength="6"
                autocomplete="off"
              />
              <label for="sID">Student ID</label>
            </div>
            <div class="input-box">
              <span class="icon"><i class="bi bi-person-vcard-fill"></i></span>
              <input
                type="text"
                id="fname"
                name="hidden"
                required
                autocomplete="off"
              />
              <label for="fname">First Name</label>
            </div>
            <div class="input-box">
              <span class="icon"><i class="bi bi-person-vcard-fill"></i></span>
              <input
                type="text"
                id="lname"
                name="hidden"
                required
                autocomplete="off"
              />
              <label for="lname">Last Name</label>
            </div>
            <div class="input-box">
              <span class="icon"><i class="bi bi-envelope"></i></span>
              <input
                type="email"
                id="email"
                name="hidden"
                required
                autocomplete="off"
              />
              <label for="email">Email</label>
            </div>
          </div>
          <div class="col-12 col-sm-6">
            <div class="input-box">
              <span class="icon"><i class="bi bi-telephone-fill"></i></span>
              <input
                type="tel"
                id="contact"
                name="hidden"
                required
                autocomplete="off"
              />
              <label for="contact">Contact</label>
            </div>

            <div class="input-box">
              <span class="icon"><i class="bi bi-geo-alt-fill"></i></span>
              <input
                type="text"
                id="address"
                name="hidden"
                required
                autocomplete="off"
              />
              <label for="address">Address</label>
            </div>
            <div class="input-box">
              <span class="icon"><i class="bi bi-envelope"></i></span>
              <input
                type="number"
                id="yearLevel"
                name="hidden"
                required
                autocomplete="off"
              />
              <label for="yearLevel">Year Level</label>
            </div>
            <div class="input-box">
              <span class="icon"><i class="bi bi-envelope"></i></span>
              <input
                type="text"
                id="course"
                name="hidden"
                required
                autocomplete="off"
              />
              <label for="course">Course</label>
            </div>
          </div>
          <button
            type="submit"
            class="bton w-50"
            name="hidden"
            id="Proceed"
            on:click={() => {}}>Proceed</button
          >
        </form>
        <a href="./#/" class="mt-2" on:click={() => (moreinfo = !moreinfo)}
          >Back</a
        >
      </div>
    {/if}
  </div>
  <div class="d-none">
    <button
      class="m-2 btn btn-primary btn-lg"
      on:click={() => logClient("263690")}>Client</button
    >
    <button
      class="m-2 btn btn-danger btn-lg"
      on:click={() => logStaff("153827")}>Staff</button
    >
  </div>
</main>

<style>
  .alert-danger {
    font-weight: 700;
    --bs-alert-color: #ffacac;
    --bs-alert-bg: #491414;
    --bs-alert-border-color: #b30000;
  }
  .moreinfo {
    min-height: auto !important;
    width: 700px !important;
  }
  @media screen and (max-width: 576px) {
    .moreinfo {
      height: 800px !important;
      width: 90vw !important;
    }
  }
  :root {
    --group-color: rgb(0, 21, 78);
    --bs-color: #0d6efd;
    --main-color: var(--group-color);
  }

  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: url("./login-bg.jpg") no-repeat;
    background-size: cover;
    background-position: center;
    background-position-y: 5%;
  }

  .wrapper {
    position: relative;
    width: 400px;
    height: 460px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 5);
    border-radius: 20px;
    backdrop-filter: blur(20px);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    /* margin-right: 10%; */
    overflow: hidden;
    transform: scale(1);
    transition:
      transform 0.5s ease,
      height 0.6s ease,
      width 0.6s ease !important;
  }

  .wrapper.active {
    height: 520px;
  }

  .wrapper .form-box {
    width: 100%;
    padding: 40px;
  }

  .wrapper .form-box.login {
    transition: transform 0.5s ease;
    transform: translateX(0);
  }

  .wrapper .form-box.register {
    position: absolute;
    transition: none;
    transform: translateX(900px);
  }

  .wrapper.active .form-box.login {
    transition: none;
    transform: translateX(-900px);
  }

  .wrapper .form-box.register {
    position: absolute;
    transition: none;
    transform: translateX(900px);
  }

  .wrapper.active .form-box.register {
    transition: transform 0.5s ease;
    transform: translateX(0);
  }

  .form-box h2 {
    font-size: 2em;
    color: #ffffff;
    text-align: center;
  }

  .input-box {
    position: relative;
    width: 100%;
    height: 50px;
    border-bottom: 2px solid white;
    margin: 30px 0;
  }

  .input-box label {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    font-size: 1em;
    color: white;
    font-weight: 500;
    pointer-events: none;
    transition: 0.5s;
  }

  .input-box input:focus ~ label,
  .input-box input:valid ~ label {
    top: 5px;
  }
  .input-box input:empty ~ label {
    bottom: 5px !important;
  }

  .input-box input {
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1em;
    color: white;
    font-weight: 600;
    padding: 0 35px 0 5px;
  }

  .input-box .icon {
    position: absolute;
    right: 8px;
    font-size: 1.2em;
    color: white;
    margin-top: 12px;
  }

  .bton {
    width: 100%;
    height: 45px;
    background: var(--main-color);
    border: none;
    outline: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1em;
    color: white;
    font-weight: 500;
  }

  .login-register {
    font-size: 1em;
    color: white;
    text-align: center;
    font-weight: 500;
    margin: 25px 0 10px;
  }

  a {
    color: white;
    text-decoration: none;
    font-weight: 600;
  }

  a:hover {
    text-decoration: underline;
  }
</style>
