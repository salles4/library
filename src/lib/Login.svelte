<script>
  document.querySelector('body').setAttribute("data-bs-theme", "dark")
  import { accType } from "../store";

</script>
<div class="d-flex justify-content-center align-items-center" style="height: 90vh;">
  <button class="m-2 btn btn-primary btn-lg" on:click={() => {accType.set("client"); localStorage.setItem("accType", "client")}}>Client</button>
  <button class="m-2 btn btn-danger btn-lg" on:click={() => {accType.set("staff"); localStorage.setItem("accType", "staff")}}>Staff</button>
</div>