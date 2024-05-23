<script>
  import { pop } from "svelte-spa-router";

  export let text;
</script>

<div class="d-flex border-bottom border-1 my-3 align-items-center">
  <button class="btn" on:click={() => pop()} style="font-size: 1.5em;">
    <i class="bi bi-arrow-left-circle"></i>
  </button>
  <div>
    <h4 class="my-auto">{text}</h4>
  </div>
</div>