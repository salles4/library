<script>
  import { pop } from "svelte-spa-router";

  export let text;
  export let print = false;
</script>

<div class="d-flex border-bottom border-1 my-3 align-items-center d-print-none justify-content-between">
  <div class="d-flex align-items-center">
    <button class="btn" on:click={() => pop()} style="font-size: 1.5em;">
      <i class="bi bi-arrow-left-circle"></i>
    </button>
    <div>
      <h4 class="my-auto">{text}</h4>
    </div>
  </div>
  {#if print}
  <button class="btn btn-outline-primary btn-sm col-1" on:click={()=> window.print()}><i class="bi bi-printer"></i> Print</button>
  {/if}
</div>

<div
  class="justify-content-center align-items-center d-none d-print-flex flex-column mt-3"
>
  <h1 class="m-0">
    <b>
      <i class="bi bi-book"></i>
      Zenodotus
    </b>
  </h1>
  <h6>CTADVDBL Project</h6>
  <h4 class="mb-0">{text}</h4>
  <small>Printed by: {"Staff #"}{localStorage.getItem("user_id")}</small>
</div>