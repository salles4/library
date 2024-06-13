<script>
  export let name;
  export let id;
  let placeholder = false
</script>

<div
    class="card col-md-2 col-4 border-1">
    {#if placeholder}
  <img
    src="./default-profile.jpg"
    alt="author cover"
    height="150"
    class="object-fit-contain rounded my-2"
  />
  {:else}
  <img
    src="https://oatzrwezibkcabfwxppo.supabase.co/storage/v1/object/public/publisher/{id}.jpg"
    on:error={()=>placeholder=true}
    alt="author cover"
    height="150"
    class="object-fit-contain rounded my-2"
  />
  {/if}
    <div class="card-body p-1">
      <h6 class="card-title text-center"><a class="stretched-link" href="./#/publisher/{id}">{name}</a></h6>
    </div>
</div>

<style>
  .card:hover a{
    text-decoration: underline;
  }
  a{
    text-decoration: none;
    color: var(--bs-body-color);
  }
</style>