<script>
  export let name;
  export let id;
</script>

<div
    class="card col-md-2 col-4 border-1">
    <img class="object-fit-contain rounded my-2" src="./default-profile.jpg" alt="author" />
    <div class="card-body p-1">
      <h6 class="card-title text-center"><a class="stretched-link" href="./#/author/{id}">{name}</a></h6>
    </div>
</div>

<style>
  .card:hover a{
    text-decoration: underline;
  }
  a{
    text-decoration: none;
    color: white;
  }
</style>