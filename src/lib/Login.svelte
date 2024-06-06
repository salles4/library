<script>
  import { fade } from "svelte/transition";
  document.querySelector("body").setAttribute("data-bs-theme", "dark");
  import { accType } from "../store";
  import { supabase } from "../supabase";
  import {replace} from 'svelte-spa-router';
  replace("/")
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
  async function logIn(){
    const {data, error} = await supabase
    .from("user_level")
    .select("account_type, user_id")
    .eq("username", usernameInput)
    .eq("password", passwordInput)
    .single()

    if(error){
      console.error(error);
      return;
    }
    if(data.account_type == "student"){
      logClient(data.user_id)
    }else if(data.account_type == "staff"){
      logStaff(data.user_id)
    }else{
      console.error(data);
    }

  }
</script>

<main in:fade={{ duration: 500 }}>
  <!-- CONTAINER -->
  <div class="wrapper {activeClass} active-popup">
    <!-- CLOSE BUTTON -->
    <!-- <span class="icon-close">
                <ion-icon name="close"></ion-icon>
            </span> -->

    <!-- LOGIN PANEL -->
    <div class="form-box login">
      <h2>Login</h2>
      <form on:submit|preventDefault={logIn} id="form">
        <div class="input-box">
          <span class="icon"><ion-icon name="person-circle"></ion-icon></span>
          <input type="text" bind:value={usernameInput} id="usernameLogin" required autocomplete="off" />
          <label for="usernameLogin">Username</label>
        </div>
        <div class="input-box">
          <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
          <input
            type="password"
            id="passwordLogin"
            required
            autocomplete="off"
            bind:value={passwordInput}
          />
          <label for="passwordLogin">Password</label>
        </div>

        <!-- <div class="remember-forgot">
          <label>
            <input type="checkbox" />Remember Me
          </label>
          <a href="./#/">Forgot Password?</a>
        </div> -->
        <button type="submit" class="bton" id="loginBton" on:click={logIn}
          >Login</button
        >
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

    <!-- REGISTER PANEL -->
    <div class="form-box register">
      <h2>Registration</h2>
      <form autocomplete="off">
        <div class="input-box">
          <span class="icon"><ion-icon name="person-circle"></ion-icon></span>
          <input
            type="text"
            name="none"
            id="registerUsername"
            required
            autocomplete="off"
          />
          <label for="registerUsername">Username</label>
        </div>
        <div class="input-box">
          <span class="icon"><ion-icon name="call"></ion-icon></span>
          <input type="tel" id="registerNumber" required autocomplete="off" />
          <label for="registerNumber">Mobile Number</label>
        </div>
        <div class="input-box">
          <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
          <input
            type="password"
            id="registerPassword"
            required
            autocomplete="off"
            name="none"
          />
          <label for="registerPassword">Password</label>
        </div>

        <!-- <div class="remember-forgot">
                        <label>
                            <input type="checkbox">Remember Me
                        </label>
                        <a href="#">Forgot Password?</a>
                    </div> -->
        <button type="submit" class="bton" id="registerBtn">Register</button>
        <div class="login-register">
          <p>
            Already have an account? <a
              href="./#/"
              on:click={toggle}
              class="login-link">Log in</a
            >
          </p>
        </div>
      </form>
    </div>
  </div>
  <div>
    <button class="m-2 btn btn-primary btn-lg" on:click={() => logClient("263690")}
      >Client</button
    >
    <button class="m-2 btn btn-danger btn-lg" on:click={() => logStaff("153827")}>Staff</button>
  </div>
</main>

<style>
  :root {
    --main-color: #0d6efd;
  }

  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: url("bgDubu.jpg") no-repeat;
    background-size: cover;
    background-position: center;
    background-position-y: 5%;
  }

  .wrapper {
    position: relative;
    width: 400px;
    height: 440px;
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
      height 0.2s ease;
  }

  .wrapper.active {
    height: 520px;
  }

  .wrapper .form-box {
    width: 100%;
    padding: 40px;
  }

  .wrapper .form-box.login {
    transition: transform 0.18s ease;
    transform: translateX(0);
  }

  .wrapper .form-box.register {
    position: absolute;
    transition: none;
    transform: translateX(400px);
  }

  .wrapper.active .form-box.login {
    transition: none;
    transform: translateX(-400px);
  }

  .wrapper .form-box.register {
    position: absolute;
    transition: none;
    transform: translateX(400px);
  }

  .wrapper.active .form-box.register {
    transition: transform 0.18s ease;
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
    top: -5px;
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
    margin-top: 17px;
  }

  .remember-forgot {
    font-size: 1em;
    color: white;
    font-weight: 500;
    margin: -15px 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .remember-forgot label input {
    accent-color: var(--main-color);
    margin-right: 3px;
  }

  .remember-forgot a {
    color: white;
    text-decoration: none;
  }

  .remember-forgot a:hover {
    text-decoration: underline;
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

  .login-register p a {
    color: white;
    text-decoration: none;
    font-weight: 600;
  }

  .login-register p a:hover {
    text-decoration: underline;
  }
</style>
